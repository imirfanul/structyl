'use client'; // safe to include here — this is a UI component

import React, { useState, useEffect } from 'react';
import { useApiContext } from '../provider';
import type { CacheEntry } from '../cache';

interface CacheSnapshot {
  key: string;
  entry: CacheEntry;
}

export function ApiDevTools(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<CacheSnapshot[]>([]);
  const { queryClient } = useApiContext();

  useEffect(() => {
    const update = () => {
      const snapshot = queryClient.cache.snapshot();
      setEntries(
        Object.entries(snapshot).map(([key, entry]) => ({ key, entry })),
      );
    };
    update();
    return queryClient.cache.subscribeGlobal(update);
  }, [queryClient]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: '#1a1a2e',
          color: '#e94560',
          border: '1px solid #e94560',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
          fontFamily: 'monospace',
        }}
      >
        {open ? '✕ DevTools' : '🔍 API Cache'}
      </button>

      {open && (
        <div
          style={{
            marginTop: 8,
            background: '#16213e',
            border: '1px solid #0f3460',
            borderRadius: 8,
            padding: 12,
            width: 420,
            maxHeight: 500,
            overflowY: 'auto',
            color: '#e0e0e0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <strong style={{ color: '#e94560' }}>
              API Cache ({entries.length} keys)
            </strong>
            <button
              onClick={() => queryClient.cache.clear()}
              style={{
                background: 'transparent',
                border: '1px solid #e94560',
                color: '#e94560',
                borderRadius: 4,
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              Clear
            </button>
          </div>

          {entries.length === 0 && (
            <div style={{ color: '#888', textAlign: 'center', padding: 16 }}>
              Cache is empty
            </div>
          )}

          {entries.map(({ key, entry }) => {
            const age =
              entry.updatedAt
                ? Math.round((Date.now() - entry.updatedAt) / 1000)
                : null;
            const statusColor =
              {
                success: '#4caf50',
                error: '#f44336',
                loading: '#ff9800',
                idle: '#888',
              }[entry.status] ?? '#888';
            return (
              <div
                key={key}
                style={{
                  marginBottom: 8,
                  background: '#0f3460',
                  borderRadius: 6,
                  padding: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <code
                    style={{
                      color: '#e0e0e0',
                      wordBreak: 'break-all',
                      fontSize: 11,
                    }}
                  >
                    {key.length > 60 ? key.slice(0, 57) + '…' : key}
                  </code>
                  <span
                    style={{ color: statusColor, marginLeft: 8, flexShrink: 0 }}
                  >
                    ● {entry.status}
                  </span>
                </div>
                <div style={{ color: '#888', fontSize: 10 }}>
                  {age !== null ? `age: ${age}s` : 'no data'}
                  {' · '}
                  stale: {entry.staleTime > 0 ? `${entry.staleTime / 1000}s` : 'always'}
                  {entry.updatedAt === 0 && ' · ⚠ invalidated'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

ApiDevTools.displayName = 'ApiDevTools';
