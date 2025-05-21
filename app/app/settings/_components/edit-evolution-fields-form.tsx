'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { Company } from "@/types/company";
import { updateCompanySchema, type UpdateCompanySchemaType } from "@/schemas/forms/update-company";
import { updateCompanyAction } from "@/actions/company/update";

interface EditEvolutionFieldsFormProps {
  company?: Company
}

const EditEvolutionFieldsForm = (props: EditEvolutionFieldsFormProps) => {
  const { company } = props;

  const [open, setOpen] = useState(false)
  const form = useForm<UpdateCompanySchemaType>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      meta_account_id: company?.meta_account_id,
      meta_token: company?.meta_token,
      report_lookback_limit: company?.report_lookback_limit ? String(company?.report_lookback_limit) : "",
      evolution_instance: company?.evolution_instance,
    }
  })
  const { formState: { isSubmitting } } = form;

  async function onSubmit(data: UpdateCompanySchemaType) {
    const response = await updateCompanyAction({
      ...data,
      company_id: company?.id || ""
    })

    if (!response.success) {
      toast.error("Error ao atualizar configurações", {
        description: response.message
      })
    } else {
      toast.success("Dados meta atualizados com sucesso")
      setOpen(false)
    }

    form.reset()
  }

  useEffect(() => {
    form.reset({
      meta_account_id: company?.meta_account_id,
      meta_token: company?.meta_token,
      report_lookback_limit: company?.report_lookback_limit ? String(company?.report_lookback_limit) : "",
      evolution_instance: company?.evolution_instance,
    })
  }, [company, form])

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit flex justify-start cursor-pointer" asChild>
        <Button className="bg-foreground/25 hover:bg-foreground/20 text-black font-medium">
          Editar dados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle className="font-bold">Editar dados Evolution API</DialogTitle>
              <DialogDescription>
                Atualize o ID da sua instância para garantir que os relatórios sejam enviados corretamente.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-fit flex flex-col gap-5">
              <FormField
                control={form.control}
                name="evolution_instance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instância:</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button 
                className="h-12 mt-4" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-fit h-fit flex items-center gap-2">
                    <LoaderCircle className="animate-spin size-3" />
                    <span className="text-sm font-semibold text-white">Enviando</span>
                  </div>
                  ) : (
                    "Atualizar dados"
                  )
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>  
  );
}

export { EditEvolutionFieldsForm };