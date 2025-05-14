'use client'

import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateClientForm } from "./create-client-form"
import { ClientRow } from "./client-row"
import type { Client } from "@/types/client"

interface ClientsTableProps {
  clients: Client[]
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const [query, setQuery] = useState("")

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  const filteredClients = useMemo(() => {
    const normalizedQuery = normalize(query)
    return clients.filter((client) =>
      normalize(client.name).includes(normalizedQuery)
    )
  }, [query, clients])

  return (
    <div className="w-full h-full min-h-full max-h-full flex flex-col gap-8">
      <div className="w-full h-fit flex flex-col items-center gap-8">
        <div className="w-full flex items-center gap-5">
          <Input
            placeholder="Pesquise cliente pelo nome"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CreateClientForm />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NOME</TableHead>
              <TableHead>E-MAIL</TableHead>
              <TableHead>TELEFONE</TableHead>
              <TableHead className="text-right">RELATÓRIOS</TableHead>
              <TableHead className="block w-12">{''}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
