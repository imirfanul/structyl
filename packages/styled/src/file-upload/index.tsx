'use client';

import * as React from 'react';
import { Upload, X } from '@aura-ui/icons';
import { FileUpload as FileUploadPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = FileUploadPrimitive.Root;

const Dropzone = React.forwardRef<
  React.ElementRef<typeof FileUploadPrimitive.Dropzone>,
  React.ComponentPropsWithoutRef<typeof FileUploadPrimitive.Dropzone>
>(({ className, children, ...props }, ref) => (
  <FileUploadPrimitive.Dropzone
    ref={ref}
    className={cn(
      'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-6 text-sm transition-colors',
      'hover:border-primary hover:bg-accent/50',
      'data-[state=dragging]:border-primary data-[state=dragging]:bg-accent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      className,
    )}
    {...props}
  >
    {children ?? (
      <>
        <Upload className="h-8 w-8 text-muted-foreground" />
        <span className="text-muted-foreground">
          Click to upload or drag and drop
        </span>
      </>
    )}
  </FileUploadPrimitive.Dropzone>
));
Dropzone.displayName = 'FileUpload.Dropzone';

const Input = FileUploadPrimitive.Input;
const Trigger = FileUploadPrimitive.Trigger;
const Clear = FileUploadPrimitive.Clear;

const List = React.forwardRef<
  React.ElementRef<typeof FileUploadPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof FileUploadPrimitive.List>
>(({ className, ...props }, ref) => (
  <FileUploadPrimitive.List ref={ref} className={cn('mt-2 space-y-1', className)} {...props} />
));
List.displayName = 'FileUpload.List';

const Item: React.FC<{ file: File }> = ({ file }) => (
  <FileUploadPrimitive.Item file={file}>
    <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-bg px-3 py-2 text-sm">
      <span className="truncate">{file.name}</span>
      <span className="text-muted-foreground">{Math.round(file.size / 1024)} KB</span>
    </div>
  </FileUploadPrimitive.Item>
);
Item.displayName = 'FileUpload.Item';

export { Root, Dropzone, Input, Trigger, Clear, List, Item };
