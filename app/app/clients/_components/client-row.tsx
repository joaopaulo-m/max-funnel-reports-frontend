'use client'

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EllipsisVertical, Trash } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

import { updateClientReportsSettingsAction } from "@/actions/client-reports-settings/update";
import type { Client } from "@/types/client";
import { DeleteClientAlertDialog } from "./delete-client-alert-dialog";
import { UpdateClientForm } from "./update-client-form";

interface ClientRowProps {
  client: Client
}

const ClientRow = (props: ClientRowProps) => {
  const { client } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen]= useState(false)
  
  async function onCampaignsReportsClick() {
    const result = await updateClientReportsSettingsAction({
      client_id: client.id,
      campaigns_enabled: client.reports_settings.campaigns_enabled ? false : true
    })

    if (!result.success) {
      toast.error("Erro ao atualizar", {
        description: result.message
      })
    }
  }

  async function onBalanceReportsClick() {
    const result = await updateClientReportsSettingsAction({
      client_id: client.id,
      balance_enabled: client.reports_settings.balance_enabled ? false : true
    })

    if (!result.success) {
      toast.error("Erro ao atualizar", {
        description: result.message
      })
    } else {
      toast.success("Configurações de relatórios atualizada")
    }
  }

  useEffect(() => {
    console.log(updateDialogOpen)
  }, [updateDialogOpen])

  return ( 
    <TableRow key={client.id}>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell className="w-full flex justify-end items-center gap-8 text-right">
        <div className="flex items-center space-x-2">
          <Switch 
            id={client.reports_settings.id + "-campaigns"} 
            checked={client.reports_settings.campaigns_enabled}
            onClick={onCampaignsReportsClick}
          />
          <Label className="cursor-pointer" htmlFor={client.reports_settings.id + "-campaigns"}>Campanhas</Label>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Switch 
            id={client.reports_settings.id + "-balance"} 
            checked={client.reports_settings.balance_enabled} 
            onClick={onBalanceReportsClick}
          />
          <Label className="cursor-pointer" htmlFor={client.reports_settings.id + "-balance"}>Saldo</Label>
        </div>
      </TableCell>
      <TableCell className="w-12">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full h-full text-right cursor-pointer" asChild>
            <EllipsisVertical className="!w-4 !h-4 color-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <button onClick={() => setUpdateDialogOpen(true)} className="w-full flex items-center cursor-pointer">
                  <span className="text-xs text-foreground font-bold">Editar</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={() => setDeleteDialogOpen(true)} className="w-full flex items-center gap-1 text-red-400 cursor-pointer">
                  <Trash width={12} height={12} color="#ff6467" />
                  <span className="text-xs font-bold">Excluir</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <DeleteClientAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        clientId={client.id}
        clientName={client.name}
      />
      <UpdateClientForm 
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        client={client}
      />
    </TableRow>
  );
}

export { ClientRow };