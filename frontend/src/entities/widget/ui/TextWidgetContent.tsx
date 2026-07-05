export function TextWidgetContent({ content }: { content: string }) {
  if (content === '') {
    return (
      <p className="text-sm italic text-muted-foreground">No content yet.</p>
    );
  }
  return <p className="whitespace-pre-wrap break-words text-sm">{content}</p>;
}
