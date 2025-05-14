import { TableSkeleton } from "../_components/table-skeleton";

export default function Loading() {
  return (
    <div className="w-[70%] h-full min-h-full max-h-full flex flex-col gap-8">
      <div className="w-full h-fit flex flex-col items-center gap-8">
          <TableSkeleton />
      </div>
    </div>
  )
}