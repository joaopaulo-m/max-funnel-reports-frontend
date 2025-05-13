'use client'

import { toast } from "sonner";

import { updateClientReportsSettingsAction } from "@/actions/client-reports-settings/update";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Client } from "@/types/client";

interface ClientRowProps {
  client: Client
}

const ClientRow = (props: ClientRowProps) => {
  const { client } = props;
  
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
    }
  }

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
    </TableRow>
  );
}

export { ClientRow };