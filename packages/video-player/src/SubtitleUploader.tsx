import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@structyl/styled';

interface SubtitleUploaderProps {
  onSubtitleUpload: (file: File) => void;
}

export const SubtitleUploader: React.FC<SubtitleUploaderProps> = ({ onSubtitleUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.srt') || file.name.endsWith('.vtt'))) {
      onSubtitleUpload(file);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".srt,.vtt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        variant="outline"
        size="sm"
        className="w-full mb-2"
        leftIcon={<Upload />}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Subtitle File
      </Button>
      <p className="text-[11px] text-muted-foreground">Supports .srt and .vtt formats</p>
    </div>
  );
};

SubtitleUploader.displayName = 'SubtitleUploader';
