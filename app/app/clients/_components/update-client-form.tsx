'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { updateClientSchema, type UpdateClientSchemaType } from "@/schemas/forms/update-client";
import type { Client } from "@/types/client";
import { updateClientAction } from "@/actions/client/update";

interface UpdateClientFormProps {
  client: Client
  open: boolean
  onOpenChange: (open: boolean) => void
}

const UpdateClientForm = (props: UpdateClientFormProps) => {
  const form = useForm<UpdateClientSchemaType>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      name: props.client.name,
      email: props.client.email,
      meta_account_id: props.client.meta_account_id,
    }
  })
  const { formState: { isSubmitting } } = form;

  async function onSubmit(data: UpdateClientSchemaType) {
    const response = await updateClientAction({
      ...data,
      client_id: props.client.id,
      current_client_email: props.client.email
    })

    if (!response.success) {
      toast.error("Error ao atualizar cliente", {
        description: response.message
      })
    } else {
      toast.success("Cliente atualizado com sucesso", {
        description: "Dados atualizados com sucesso no sistema."
      })
      props.onOpenChange(false)
    }

    form.reset()
  }

  useEffect(() => {
    form.reset({
      name: props.client.name,
      email: props.client.email,
      meta_account_id: props.client.meta_account_id,
    });
  }, [props.client, form]);  
  
  return ( 
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle className="font-bold">Atualizar dados do colaborador</DialogTitle>
              <DialogDescription>
                Altere as informações necessárias para manter os dados sempre em dia.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-fit flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input placeholder="Fuluno (a) da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail:</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta_account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Account ID:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    "Atualizar cliente"
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

export { UpdateClientForm };