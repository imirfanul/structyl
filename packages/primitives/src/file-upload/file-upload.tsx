'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

interface FileUploadContextValue {
  files: File[];
  addFiles: (files: FileList | File[]) => void;
  removeFile: (file: File) => void;
  clearFiles: () => void;
  isDragging: boolean;
  setIsDragging: (b: boolean) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
}

const [FileUploadProvider, useFileUploadContext] = createContext<FileUploadContextValue>('FileUpload');

export interface FileUploadRootProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onError'> {
  asChild?: boolean;
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  onError?: (errors: { file: File; reason: 'size' | 'type' | 'count' }[]) => void;
}

const Root = React.forwardRef<HTMLDivElement, FileUploadRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue = [],
      onValueChange,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      disabled,
      onError,
      ...rest
    } = props;
    const [files = [], setFiles] = useControllableState<File[]>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const addFiles = (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const errors: { file: File; reason: 'size' | 'type' | 'count' }[] = [];
      const filtered = arr.filter((f) => {
        if (maxSize && f.size > maxSize) {
          errors.push({ file: f, reason: 'size' });
          return false;
        }
        if (accept) {
          const types = accept.split(',').map((s) => s.trim());
          const matches = types.some(
            (t) => t === f.type || (t.endsWith('/*') && f.type.startsWith(t.slice(0, -1))) || f.name.endsWith(t),
          );
          if (!matches) {
            errors.push({ file: f, reason: 'type' });
            return false;
          }
        }
        return true;
      });
      let next = multiple ? [...files, ...filtered] : filtered.slice(0, 1);
      if (maxFiles && next.length > maxFiles) {
        const overflow = next.slice(maxFiles);
        overflow.forEach((f) => errors.push({ file: f, reason: 'count' }));
        next = next.slice(0, maxFiles);
      }
      if (errors.length > 0) onError?.(errors);
      setFiles(next);
    };

    return (
      <FileUploadProvider
        files={files}
        addFiles={addFiles}
        removeFile={(file) => setFiles(files.filter((f) => f !== file))}
        clearFiles={() => setFiles([])}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        accept={accept}
        multiple={multiple}
        maxSize={maxSize}
        maxFiles={maxFiles}
        inputRef={inputRef}
        disabled={disabled}
      >
        <Primitive.div {...rest} ref={forwardedRef} />
      </FileUploadProvider>
    );
  },
);
Root.displayName = 'FileUpload.Root';

const Dropzone = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useFileUploadContext('FileUpload.Dropzone');
    return (
      <Primitive.div
        role="button"
        tabIndex={ctx.disabled ? -1 : 0}
        data-state={ctx.isDragging ? 'dragging' : 'idle'}
        data-disabled={ctx.disabled ? '' : undefined}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => {
          if (!ctx.disabled) ctx.inputRef.current?.click();
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            ctx.inputRef.current?.click();
          }
        })}
        onDragOver={composeEventHandlers(props.onDragOver, (event) => {
          event.preventDefault();
          ctx.setIsDragging(true);
        })}
        onDragLeave={composeEventHandlers(props.onDragLeave, () => ctx.setIsDragging(false))}
        onDrop={composeEventHandlers(props.onDrop, (event) => {
          event.preventDefault();
          ctx.setIsDragging(false);
          if (event.dataTransfer.files.length) ctx.addFiles(event.dataTransfer.files);
        })}
      />
    );
  },
);
Dropzone.displayName = 'FileUpload.Dropzone';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, forwardedRef) => {
    const ctx = useFileUploadContext('FileUpload.Input');
    const composedRef = useComposedRefs(forwardedRef, ctx.inputRef);
    return (
      <Primitive.input
        type="file"
        accept={ctx.accept}
        multiple={ctx.multiple}
        disabled={ctx.disabled}
        style={{ display: 'none' }}
        {...props}
        ref={composedRef}
        onChange={composeEventHandlers(props.onChange, (event) => {
          if (event.currentTarget.files) ctx.addFiles(event.currentTarget.files);
          event.currentTarget.value = '';
        })}
      />
    );
  },
);
Input.displayName = 'FileUpload.Input';

const List = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  (props, forwardedRef) => (
    <Primitive.ul {...props} ref={forwardedRef as React.Ref<HTMLUListElement>} />
  ),
);
List.displayName = 'FileUpload.List';

const Item: React.FC<{ file: File; children?: React.ReactNode }> = ({ file, children }) => {
  const ctx = useFileUploadContext('FileUpload.Item');
  return (
    <Primitive.li data-file-name={file.name}>
      {children ?? (
        <>
          <span>{file.name}</span>{' '}
          <button type="button" onClick={() => ctx.removeFile(file)} aria-label={`Remove ${file.name}`}>
            ×
          </button>
        </>
      )}
    </Primitive.li>
  );
};
Item.displayName = 'FileUpload.Item';

const Trigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, forwardedRef) => {
    const ctx = useFileUploadContext('FileUpload.Trigger');
    return (
      <Primitive.button
        type="button"
        disabled={ctx.disabled}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => ctx.inputRef.current?.click())}
      />
    );
  },
);
Trigger.displayName = 'FileUpload.Trigger';

const Clear = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, forwardedRef) => {
    const ctx = useFileUploadContext('FileUpload.Clear');
    return (
      <Primitive.button
        type="button"
        disabled={ctx.disabled || ctx.files.length === 0}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => ctx.clearFiles())}
      />
    );
  },
);
Clear.displayName = 'FileUpload.Clear';

export { Root, Dropzone, Input, Trigger, Clear, List, Item };
