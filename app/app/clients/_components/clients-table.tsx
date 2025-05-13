'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateClientForm } from "./create-client-form";
import { ClientRow } from "./client-row";
import type { Client } from "@/types/client";

interface Props {
  clients: Client[];
}

export function ClientsTable({ clients }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get('query')?.toLowerCase() ?? '';

  const filteredClients = useMemo(() => {
    const normalize = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
    const normalizedQuery = normalize(query);
  
    return clients.filter((client) =>
      normalize(client.name).includes(normalizedQuery)
    );  
  }, [clients, query]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full h-fit flex flex-col items-center gap-8">
      <div className="w-full flex items-center gap-5">
        <Input
          placeholder="Pesquise seu cliente pelo nome"
          defaultValue={query}
          onChange={(e) => handleSearch(e.target.value)}
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
