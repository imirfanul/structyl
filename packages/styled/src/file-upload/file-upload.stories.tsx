import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Typography } from '../typography';
import { Root, Dropzone, Input, Trigger, Clear, List, Item } from './index';

const meta: Meta = {
  title: 'Styled/FileUpload',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root>
        <Dropzone />
        <Input />
      </Root>
    </div>
  ),
};

export const WithFileList: Story = {
  name: 'With file list (controlled)',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <div className="w-[480px]">
        <Root value={files} onValueChange={setFiles}>
          <Dropzone />
          <Input />
          {files.length > 0 && (
            <List>
              {files.map((file) => (
                <Item key={file.name} file={file} />
              ))}
            </List>
          )}
          {files.length > 0 && (
            <Clear className="mt-2 inline-flex h-7 items-center justify-center rounded border border-border px-2 text-xs text-muted-foreground hover:bg-accent">
              Clear all
            </Clear>
          )}
        </Root>
      </div>
    );
  },
};

export const MultipleFiles: Story = {
  name: 'Multiple files',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <div className="flex w-[480px] flex-col gap-1.5">
        <Typography as="label" variant="input-label">Attachments</Typography>
        <Root multiple value={files} onValueChange={setFiles}>
          <Dropzone>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-muted-foreground">
              Drop files here or click to browse
            </span>
            <span className="text-xs text-muted-foreground">
              Multiple files allowed
            </span>
          </Dropzone>
          <Input />
          {files.length > 0 && (
            <>
              <List>
                {files.map((file) => (
                  <Item key={file.name} file={file} />
                ))}
              </List>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {files.length} file{files.length !== 1 ? 's' : ''} selected
                </span>
                <Clear className="inline-flex h-7 items-center justify-center rounded border border-border px-2 text-xs text-muted-foreground hover:bg-accent">
                  Clear all
                </Clear>
              </div>
            </>
          )}
        </Root>
      </div>
    );
  },
};

export const AcceptImages: Story = {
  name: 'Images only',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <div className="flex w-[480px] flex-col gap-1.5">
        <Typography as="label" variant="input-label">Profile picture</Typography>
        <Root accept="image/*" value={files} onValueChange={setFiles}>
          <Dropzone>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-muted-foreground">Upload an image</span>
            <span className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP</span>
          </Dropzone>
          <Input />
          {files.length > 0 && (
            <List>
              {files.map((file) => (
                <Item key={file.name} file={file} />
              ))}
            </List>
          )}
        </Root>
      </div>
    );
  },
};

export const WithTriggerButton: Story = {
  name: 'Trigger button only (no dropzone)',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <div className="flex w-[480px] flex-col gap-2">
        <Root value={files} onValueChange={setFiles}>
          <Input />
          <div className="flex items-center gap-2">
            <Trigger className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm shadow-sm hover:bg-accent">
              Choose file
            </Trigger>
            <Clear className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent disabled:opacity-50">
              Clear
            </Clear>
          </div>
          {files.length > 0 && (
            <List>
              {files.map((file) => (
                <Item key={file.name} file={file} />
              ))}
            </List>
          )}
        </Root>
      </div>
    );
  },
};

export const MaxSize: Story = {
  name: 'With max file size',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [errors, setErrors] = React.useState<string[]>([]);
    return (
      <div className="flex w-[480px] flex-col gap-1.5">
        <Typography as="label" variant="input-label">Document (max 1 MB)</Typography>
        <Root
          accept=".pdf,.doc,.docx"
          maxSize={1024 * 1024}
          value={files}
          onValueChange={setFiles}
          onError={(errs) =>
            setErrors(errs.map((e) => `${e.file.name}: ${e.reason}`))
          }
        >
          <Dropzone>
            <span className="text-muted-foreground">Drop a document here</span>
            <span className="text-xs text-muted-foreground">PDF, DOC, DOCX — max 1 MB</span>
          </Dropzone>
          <Input />
          {errors.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {errors.map((e) => (
                <li key={e} className="text-xs text-destructive">{e}</li>
              ))}
            </ul>
          )}
          {files.length > 0 && (
            <List>
              {files.map((file) => (
                <Item key={file.name} file={file} />
              ))}
            </List>
          )}
        </Root>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root disabled>
        <Dropzone />
        <Input />
      </Root>
    </div>
  ),
};
