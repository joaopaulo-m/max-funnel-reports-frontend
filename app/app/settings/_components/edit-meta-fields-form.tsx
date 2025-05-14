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

interface EditMetaFieldsFormProps {
  company?: Company
}

const EditMetaFieldsForm = (props: EditMetaFieldsFormProps) => {
  const { company } = props;

  const [open, setOpen] = useState(false)
  const form = useForm<UpdateCompanySchemaType>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      meta_account_id: company?.meta_account_id,
      meta_token: company?.meta_token,
      report_day_of_month: company?.report_day_of_month ? String(company?.report_day_of_month) : "",
      report_days_offset: company?.report_days_offset ? String(company?.report_days_offset) : "",
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
      report_day_of_month: company?.report_day_of_month ? String(company?.report_day_of_month) : "",
      report_days_offset: company?.report_days_offset ? String(company?.report_days_offset) : "",
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
              <DialogTitle className="font-bold">Editar dados de integração com o Meta</DialogTitle>
              <DialogDescription>
                Atualize o Account ID e o Token para garantir que os relatórios continuem funcionando corretamente.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-fit flex flex-col gap-5">
              <FormField
                control={form.control}
                name="meta_account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account ID:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta_token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token:</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
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

export { EditMetaFieldsForm };