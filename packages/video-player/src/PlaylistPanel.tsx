import React from 'react';
import { Shuffle, Repeat, Repeat1, X } from 'lucide-react';
import { Button, ScrollArea } from '@structyl/styled';
import type { PlaylistItem } from './usePlaylist';

interface PlaylistPanelProps {
  items: PlaylistItem[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  onPlayItem: (index: number) => void;
  onRemoveItem: (index: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onClose: () => void;
}

const formatDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  items, currentIndex, shuffle, repeat,
  onPlayItem, onRemoveItem, onToggleShuffle, onToggleRepeat, onClose,
}) => (
  <div className="absolute top-0 right-0 w-full md:w-[280px] h-full bg-popover border-l border-border z-20 flex flex-col">
    <div className="flex items-center justify-between px-3 py-2.5 border-b border-border shrink-0">
      <span className="text-[13px] font-semibold text-fg">Playlist ({items.length})</span>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleShuffle}
          title="Shuffle"
          className={shuffle ? 'text-primary' : ''}
        >
          <Shuffle />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleRepeat}
          title="Repeat"
          className={repeat !== 'none' ? 'text-primary' : ''}
        >
          {repeat === 'one' ? <Repeat1 /> : <Repeat />}
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={onClose} title="Close">
          <X />
        </Button>
      </div>
    </div>

    <ScrollArea.Root className="flex-1 overflow-y-auto p-1.5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors duration-150 relative group hover:bg-accent/[0.07] ${
            index === currentIndex ? 'bg-primary/15' : ''
          }`}
          onClick={() => onPlayItem(index)}
        >
          <div className="shrink-0 w-10 h-10 bg-muted/80 rounded overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
            {item.poster
              ? <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
              : <span>{index + 1}</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-fg overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</div>
            {item.duration != null && (
              <div className="text-[11px] text-muted-foreground mt-0.5">{formatDuration(item.duration)}</div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            onClick={(e) => { e.stopPropagation(); onRemoveItem(index); }}
            title="Remove"
          >
            <X />
          </Button>
        </div>
      ))}
    </ScrollArea.Root>
  </div>
);

PlaylistPanel.displayName = 'PlaylistPanel';
