export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="bg-grid h-full w-full opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-950/50 to-surface-950" />
    </div>
  );
}
