import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptySpace() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No Subscriber Yet</EmptyTitle>
        <EmptyDescription>
          Get started by adding your first subscriber.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
