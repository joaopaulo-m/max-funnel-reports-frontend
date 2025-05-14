'use client'

import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deleteClientAction } from "@/actions/client/delete";

interface DeleteClientBtnProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: string
  clientName: string
}

const DeleteClientAlertDialog = (props: DeleteClientBtnProps) => {
  async function onDeleteClick() {
    const response = await deleteClientAction(props.clientId)

    if (!response.success) {
      toast.error("Error ao deletar cliente", {
        description: response.message
      })
    } else {
      toast.success("Cliente deletado com sucesso")
    }

    props.onOpenChange(false)
  }

  return ( 
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">Tem certeza que deseja excluir {props.clientName}?</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Essa ação é permanente e o acesso do colaborador será removido do sistema.
          </AlertDialogDescription>
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

export { DeleteClientAlertDialog };