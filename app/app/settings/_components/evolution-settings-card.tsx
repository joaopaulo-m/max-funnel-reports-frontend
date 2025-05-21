import { fetchCompanyAction } from "@/actions/company/fetch";
import { EditEvolutionFieldsForm } from "./edit-evolution-fields-form";

const EvolutionSettingsCard = async () => {
  const { company } = await fetchCompanyAction()

  return ( 
    <div className="w-full h-fit flex justify-between items-center">
        <div className="w-fit h-fit flex flex-col gap-5">
          <h3 className="text-sm font-bold">Dados Evolution API:</h3>
          <div className="w-fit h-fit flex flex-col gap-2">
            <div className="w-fit h-fit flex items-center gap-2">
              <span className="text-sm">Token:</span>
              <div className="w-fit h-fit flex items-center gap-3">
                <span className="text-sm font-semibold">{company?.evolution_instance}</span>
              </div>
            </div>
          </div>
        </div>
        <EditEvolutionFieldsForm company={company} />
      </div>
  );
}

export { EvolutionSettingsCard };