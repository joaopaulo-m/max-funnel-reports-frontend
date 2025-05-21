import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { SettingsCardSkeleton } from "./_components/settings-card-skeleton";
import ReportsSettingsCard from "./_components/reports-settings-card";
import MetaSettingsCard from "./_components/meta-settings-card";
import { EvolutionSettingsCard } from "./_components/evolution-settings-card";

const SettingsPage = async () => {
  return ( 
    <div className="w-[80%] h-full flex mt-5">
      <div className="w-full h-full flex flex-col justify-center items-start gap-8">
        <Suspense fallback={<SettingsCardSkeleton />}>
          <ReportsSettingsCard />
        </Suspense>
        <Separator />
        <Suspense fallback={<SettingsCardSkeleton />}>
          <EvolutionSettingsCard />
        </Suspense>
        <Separator />
        <Suspense fallback={<SettingsCardSkeleton />}>
          <MetaSettingsCard />
        </Suspense>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export default SettingsPage;