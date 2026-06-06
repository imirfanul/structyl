import { render } from '@testing-library/react';
import { useScrollLock } from './use-scroll-lock';

function Probe({ enabled }: { enabled: boolean }) {
  useScrollLock({ enabled });
  return null;
}

describe('useScrollLock', () => {
  afterEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  it('locks body overflow while enabled and restores on unmount', () => {
    const { unmount } = render(<Probe enabled />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('does nothing when disabled', () => {
    render(<Probe enabled={false} />);
    expect(document.body.style.overflow).toBe('');
  });
});
