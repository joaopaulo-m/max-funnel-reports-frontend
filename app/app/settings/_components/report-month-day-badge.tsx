'use client'

import { XIcon } from "lucide-react";
import { useState } from "react";

import type { ReportDay } from "@/types/report-day";
import { DeleteReportDayAlertDialog } from "./delete-report-day";

interface ReportMonthDayBadgeProps {
  reportDay: ReportDay;
}

const ReportMonthDayBadge = (props: ReportMonthDayBadgeProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <div className="w-fit h-fit flex items-center gap-2 px-3 py-2 rounded-full bg-foreground/20">
      <span className="text-xs font-medium text-black">{props.reportDay.month_day}</span>
      <button 
        type="button" 
        className="cursor-pointer"
        onClick={() => setDeleteOpen(true)}
      >
        <XIcon className="w-3 h-3 hover:text-red-500" />
      </button>
      <DeleteReportDayAlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        reportDay={props.reportDay}
      />
    </div>
  );
}
 
export { ReportMonthDayBadge };