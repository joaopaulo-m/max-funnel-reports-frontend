import { EyeClosed } from "lucide-react";

import { fetchCompanyAction } from "@/actions/company/fetch";
import { EditMetaFieldsForm } from "./edit-meta-fields-form";

const MetaSettingsCard = async () => {
  const { company } = await fetchCompanyAction()

  return ( 
    <div className="w-full h-fit flex justify-between items-center">
        <div className="w-fit h-fit flex flex-col gap-5">
          <h3 className="text-sm font-bold">Dados META:</h3>
          <div className="w-fit h-fit flex flex-col gap-2">
            <div className="w-fit h-fit flex items-center gap-1">
              <span className="text-sm">Account ID:</span>
              <span className="text-sm font-semibold">{company?.meta_account_id}</span>
            </div>
            <div className="w-fit h-fit flex items-center gap-2">
              <span className="text-sm">Token:</span>
              <div className="w-fit h-fit flex items-center gap-3">
                <span className="text-sm font-semibold">******</span>
                <button className="w-fit h-fit flex justify-center items-center cursor-pointer">
                  <EyeClosed width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <EditMetaFieldsForm company={company} />
      </div>
  );
}

export default MetaSettingsCard;