'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { Company } from "@/types/company";
import { updateCompanySchema, type UpdateCompanySchemaType } from "@/schemas/forms/update-company";
import { updateCompanyAction } from "@/actions/company/update";

interface EditMetaFieldsFormProps {
  company: Company
}

const EditMetaFieldsForm = (props: EditMetaFieldsFormProps) => {
  const form = useForm<UpdateCompanySchemaType>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      meta_account_id: props.company.meta_account_id,
      meta_token: props.company.meta_token,
      report_day_of_month: String(props.company.report_day_of_month),
      report_days_offset: String(props.company.report_days_offset),
    }
  })

  async function onSubmit(data: UpdateCompanySchemaType) {
    const response = await updateCompanyAction({
      ...data,
      company_id: props.company.id
    })

    if (!response.success) {
      toast.error("Error ao atualizar configurações", {
        description: response.message
      })
    }

    form.reset()
  }

  useEffect(() => {
    form.reset({
      meta_account_id: props.company.meta_account_id,
      meta_token: props.company.meta_token,
      report_day_of_month: String(props.company.report_day_of_month),
      report_days_offset: String(props.company.report_days_offset),
    })
  }, [props.company, form])

  return ( 
    <Dialog>
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
              <DialogClose asChild>
                <Button type="submit">Atualizar dados</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>  
  );
}

export { EditMetaFieldsForm };