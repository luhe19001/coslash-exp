/* oxlint-disable react/only-export-components -- The plugin boundary intentionally exports components and typed integration values. */
import type { ReactNode } from 'react';
import { LayoutPanelTopIcon, MapIcon, NetworkIcon, PanelsTopLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Session } from '@/pages/coslash/lib/session';
import { AtlasCanvas } from '@/plugins/canvas/atlas';
import type { CanvasDestination, CanvasSessionIdentity } from '@/plugins/canvas/contracts';
import { DaGamaCanvas } from '@/plugins/canvas/dagama';
import { SessionCanvas } from '@/plugins/canvas/session';

export type { CanvasDestination } from '@/plugins/canvas/contracts';
export * from '@/plugins/canvas/contracts';
export { FROZEN_CANVAS_CONTRACT_FIXTURES } from '@/plugins/canvas/fixtures';

export const CANVAS_DESTINATIONS = [
  'canvas',
  'dagama',
  'atlas',
] as const satisfies readonly CanvasDestination[];

export type CanvasDestinationReadiness = Readonly<Record<CanvasDestination, boolean>>;

// All three migrated destinations are available from the coSlash index.
export const CANVAS_DESTINATION_READINESS: CanvasDestinationReadiness = {
  canvas: true,
  dagama: true,
  atlas: true,
};

export type CanvasInspectorCallback = (session: CanvasSessionIdentity) => void;

export type CanvasDestinationNavigationProps = {
  current: CanvasDestination | null;
  readiness: CanvasDestinationReadiness;
  onSelect: (destination: CanvasDestination | null) => void;
};

export type CanvasDestinationRendererProps = {
  destination: CanvasDestination;
  session: CanvasSessionIdentity | null;
  sessions: readonly Session[];
  freshnessVersion: number;
  onInspectSession: CanvasInspectorCallback;
};

export type CanvasSessionCardActionProps = {
  session: CanvasSessionIdentity;
  selection: CanvasSessionIdentity | null;
  onSelect: (session: CanvasSessionIdentity) => void;
  onOpen?: () => void;
};

export type CanvasSettingsDiagnosticsMigrationProps = { onClose?: () => void };

const DESTINATION_LABELS: Record<CanvasDestination, string> = {
  canvas: 'Canvas',
  dagama: 'DaGama',
  atlas: 'Atlas',
};

const DESTINATION_ICONS = {
  canvas: LayoutPanelTopIcon,
  dagama: NetworkIcon,
  atlas: MapIcon,
} as const;

export function CanvasDestinationNavigation({
  current,
  readiness,
  onSelect,
}: CanvasDestinationNavigationProps): ReactNode {
  return (
    <div className="flex shrink-0 items-center gap-1" aria-label="Workspace destination">
      <Button
        variant={current === null ? 'secondary' : 'ghost'}
        size="sm"
        aria-pressed={current === null}
        onClick={() => onSelect(null)}
      >
        <PanelsTopLeftIcon /> Log
      </Button>
      {CANVAS_DESTINATIONS.filter((destination) => readiness[destination]).map((destination) => {
        const Icon = DESTINATION_ICONS[destination];
        return (
          <Button
            key={destination}
            variant={current === destination ? 'secondary' : 'ghost'}
            size="sm"
            aria-pressed={current === destination}
            onClick={() => onSelect(destination)}
          >
            <Icon /> {DESTINATION_LABELS[destination]}
          </Button>
        );
      })}
    </div>
  );
}

export function CanvasDestinationRenderer({
  destination,
  session,
  sessions,
  freshnessVersion,
  onInspectSession,
}: CanvasDestinationRendererProps): ReactNode {
  if (destination === 'canvas') {
    return (
      <SessionCanvas
        session={session}
        freshnessVersion={freshnessVersion}
        onInspectSession={onInspectSession}
      />
    );
  }
  if (destination === 'dagama') return <DaGamaCanvas sessions={sessions} />;
  return <AtlasCanvas sessions={sessions} />;
}

export function CanvasSessionCardAction({
  session,
  selection,
  onSelect,
  onOpen,
}: CanvasSessionCardActionProps): ReactNode {
  const selected = selection?.agent === session.agent && selection.id === session.id;
  return (
    <Button
      variant={selected ? 'secondary' : 'ghost'}
      size="xs"
      aria-label={`Open ${session.agent} session in Canvas`}
      aria-pressed={selected}
      onClick={() => {
        onSelect(session);
        onOpen?.();
      }}
    >
      <LayoutPanelTopIcon /> Canvas
    </Button>
  );
}

export function CanvasSettingsDiagnosticsMigration(_: CanvasSettingsDiagnosticsMigrationProps): ReactNode {
  return null;
}
