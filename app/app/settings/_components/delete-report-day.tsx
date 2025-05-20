'use client'

import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { ReportDay } from "@/types/report-day";
import { deleteReportDayAction } from "@/actions/report-day/delete";

interface DeleteReportDayBtnProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportDay: ReportDay
}

const DeleteReportDayAlertDialog = (props: DeleteReportDayBtnProps) => {
  async function onDeleteClick() {
    const response = await deleteReportDayAction(props.reportDay.id)

    if (!response.success) {
      toast.error("Error ao deletar dia de relatório", {
        description: response.message
      })
    } else {
      toast.success("Dia de relatório deletado com sucesso")
    }

    props.onOpenChange(false)
  }

  return ( 
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">Tem certeza que deseja excluir o dia de relatório {props.reportDay.month_day}?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-600 hover:bg-red-500 cursor-pointer"
            onClick={onDeleteClick}
          >
            Desejo excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteReportDayAlertDialog };