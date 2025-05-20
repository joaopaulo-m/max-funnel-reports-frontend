import { EditReportsForm } from "./edit-reports-form";
import { fetchCompanyAction } from "@/actions/company/fetch";
import type { ReportDay } from "@/types/report-day";

const ReportsSettingsCard = async () => {
  const { company } = await fetchCompanyAction()

  return ( 
    <div className="w-full h-fit flex justify-between items-center">
      <div className="w-fit h-fit flex flex-col gap-5">
        <h3 className="text-sm font-bold">Configurações de relatórios:</h3>
        <div className="w-fit h-fit flex flex-col gap-2">
          <div className="w-fit h-fit flex flex-row justify-center gap-1">
            <span className="text-sm whitespace-nowrap w-fit flex items-center">Dias do mês para envio:</span>
            {company.report_days.map((reportDay: ReportDay, index: number) => (
              <span key={reportDay.id} className="text-sm font-semibold">
                {reportDay.month_day}{index < company.report_days.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
          <div className="w-fit h-fit flex items-center gap-1">
            <span className="text-sm">Máximo de dias para coleta de dados:</span>
            <span className="text-sm font-semibold">{company?.report_lookback_limit} atrás</span>
          </div>
        </div>
      </div>
      <EditReportsForm company={company} />
    </div>
  );
}

export default ReportsSettingsCard;