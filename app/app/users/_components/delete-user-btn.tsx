'use client'

import { Trash } from "lucide-react";
import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { User } from "@/types/user";
import { deleteUserAction } from "@/actions/user/delete";

interface DeleteUserBtnProps {
  user: User
}

const DeleteUserBtn = (props: DeleteUserBtnProps) => {
  async function onDeleteClick() {
    const response = await deleteUserAction(props.user.id)

    if (!response.success) {
      toast("Error ao deletar usuário", {
        description: response.message
      })
    }
  }

  return ( 
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-fit flex items-center gap-1 text-red-400 cursor-pointer">
          <Trash width={16} height={16} color="#ff6467" />
          <span className="text-xs font-medium underline">Excluir</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">Tem certeza que deseja excluir {props.user.name}?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
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

export { DeleteUserBtn };