import { Skeleton } from "@/components/ui/skeleton";

const SettingsCardSkeleton = () => {
  return ( 
    <div className="w-full h-fit flex justify-between items-center">
      <div className="w-fit h-fit flex flex-col gap-5">
        <Skeleton className="w-[400px] h-5" />
        <div className="w-fit h-fit flex flex-col gap-2">
          <div className="w-fit h-fit flex items-center">
            <Skeleton className="w-[280px] h-4" />
          </div>
          <div className="w-fit h-fit flex items-center">
            <Skeleton className="w-[280px] h-4" />
          </div>
        </div>
      </div>
      <Skeleton className="w-[200px] h-4" />
    </div>
  );
}

export { SettingsCardSkeleton };