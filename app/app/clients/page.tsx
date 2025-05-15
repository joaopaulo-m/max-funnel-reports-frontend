import type { Client } from "@/types/client";
import { fetchClientsAction } from "@/actions/client/fetch";
import { ClientsTable } from "./_components/clients-table";

const ClientsPage = async () => {
  const clients: Client[] = await fetchClientsAction()

  return ( 
    <div className="w-[75%] h-full min-h-full max-h-full flex flex-col gap-8">
      <div className="w-full h-fit flex flex-col items-center gap-8">
        <ClientsTable clients={clients} />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export default ClientsPage;