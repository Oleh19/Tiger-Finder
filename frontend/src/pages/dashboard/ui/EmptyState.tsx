export function EmptyState() {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed py-20 text-center">
      <div className="space-y-1">
        <p className="font-medium">Your dashboard is empty</p>
        <p className="text-sm text-muted-foreground">
          Use the buttons above to add your first widget.
        </p>
      </div>
    </div>
  );
}
