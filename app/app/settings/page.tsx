import { Suspense } from "react";
import { EyeClosed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SettingsCardSkeleton } from "./_components/settings-card-skeleton";
import ReportsSettingsCard from "./_components/reports-settings-card";
import MetaSettingsCard from "./_components/meta-settings-card";

const SettingsPage = async () => {
  return ( 
    <div className="w-[80%] h-full flex mt-5">
      <div className="w-full h-full flex flex-col justify-center items-start gap-8">
        <Suspense fallback={<SettingsCardSkeleton />}>
          <ReportsSettingsCard />
        </Suspense>
        <Separator />
        <div className="w-full h-fit flex  justify-between items-center">
          <div className="w-fit h-fit flex flex-col gap-5">
            <h3 className="text-sm font-bold">Dados Evolution API:</h3>
            <div className="w-fit h-fit flex items-center gap-2">
              <span className="text-sm">Instância:</span>
              <div className="w-fit h-fit flex items-center gap-3">
                <span className="text-sm font-semibold">******</span>
                <button className="w-fit h-fit flex justify-center items-center cursor-pointer">
                  <EyeClosed width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
          <Button className="bg-foreground/25 hover:bg-foreground/20 text-black font-medium">
            Editar dados
          </Button>
        </div>
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