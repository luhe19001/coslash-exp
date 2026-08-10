import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import {
  CANVAS_DESTINATION_READINESS,
  CanvasDestinationNavigation,
  CanvasDestinationRenderer,
  CanvasSessionCardAction,
} from '@/plugins/canvas';

describe('Canvas plugin index integration', () => {
  it('shows Log and every migrated canvas destination in index navigation', () => {
    const html = renderToStaticMarkup(
      <CanvasDestinationNavigation
        current={null}
        readiness={CANVAS_DESTINATION_READINESS}
        onSelect={vi.fn()}
      />,
    );

    expect(html).toContain('Log');
    expect(html).toContain('Canvas');
    expect(html).toContain('DaGama');
    expect(html).toContain('Atlas');
  });

  it('opens the selected session in the session canvas', () => {
    const html = renderToStaticMarkup(
      <CanvasDestinationRenderer
        destination="canvas"
        session={{ agent: 'codex', id: 'session-1' }}
        sessions={[]}
        freshnessVersion={0}
        onInspectSession={vi.fn()}
      />,
    );

    expect(html).toContain('Canvas session unavailable');
    expect(html).toContain('Loading the on-demand session projection');
  });

  it('renders a Canvas action for each session card', () => {
    const html = renderToStaticMarkup(
      <CanvasSessionCardAction
        session={{ agent: 'claude', id: 'session-2' }}
        selection={null}
        onSelect={vi.fn()}
      />,
    );

    expect(html).toContain('Canvas');
    expect(html).toContain('Open claude session in Canvas');
  });
});
