import { Suspense } from "react";
import { EyeClosed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EditReportsForm } from "./_components/edit-reports-form";
import { fetchCompanyAction } from "@/actions/company/fetch";
import { EditMetaFieldsForm } from "./_components/edit-meta-fields-form";

const SettingsPage = async () => {
  const { company, message } = await fetchCompanyAction()

  if (!company) {
    return (
      <span>{message}</span>
    )
  }

  return ( 
    <div className="w-[80%] h-full flex mt-5">
      <div className="w-full h-full flex flex-col justify-center items-start gap-8">
        <div className="w-full h-fit flex justify-between items-center">
          <div className="w-fit h-fit flex flex-col gap-5">
            <h3 className="text-sm font-bold">Configurações de relatórios:</h3>
            <div className="w-fit h-fit flex flex-col gap-2">
              <div className="w-fit h-fit flex items-center gap-1">
                <span className="text-sm">Dia do mês para envio:</span>
                <span className="text-sm font-semibold">{company.report_day_of_month}</span>
              </div>
              <div className="w-fit h-fit flex items-center gap-1">
                <span className="text-sm">Dados de:</span>
                <span className="text-sm font-semibold">{company.report_days_offset} atrás</span>
              </div>
            </div>
          </div>
          <Suspense fallback={<div>Carregando...</div>}>
            <EditReportsForm company={company} />
          </Suspense>
        </div>
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
        <div className="w-full h-fit flex  justify-between items-center">
          <div className="w-fit h-fit flex flex-col gap-5">
            <h3 className="text-sm font-bold">Dados META:</h3>
            <div className="w-fit h-fit flex items-center gap-2">
              <span className="text-sm">Account ID:</span>
              <span className="text-sm font-semibold">{company.meta_account_id}</span>
            </div>
            <div className="w-fit h-fit flex items-center gap-2">
              <span className="text-sm">Token:</span>
              <div className="w-fit h-fit flex items-center gap-3">
                <span className="text-sm font-semibold">******</span>
                <button className="w-fit h-fit flex justify-center items-center cursor-pointer">
                  <EyeClosed width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
          <Suspense fallback={<div>Carregando...</div>}>
            <EditMetaFieldsForm company={company} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export default SettingsPage;