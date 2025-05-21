'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { withMask } from 'use-mask-input'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { createClientSchema, type CreateClientSchemaType } from "@/schemas/forms/create-client";
import { createClientAction } from "@/actions/client/create";

const CreateClientForm = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      meta_account_id: ""
    }
  })
  const { formState: { isSubmitting } } = form;
  
  async function onSubmit(data: CreateClientSchemaType) {
    const response = await createClientAction(data)

    if (!response.success) {
      toast.error("Error ao criar cliente", {
        description: response.message
      })
    } else {
      toast.success("Cliente criado com sucesso")
      setOpen(false)
    }

    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-fit h-12 !px-6">
          <UserPlus width={16} height={16} color="#fff" />
          <span className="text-sm font-semibold text-white">Adicionar cliente</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="py-4"
          >
            <SheetHeader className="px-0">
              <SheetTitle className="font-bold">Cadastro de novo Cliente</SheetTitle>
              <SheetDescription>
                Preencha as informações e comece a acompanhar os resultados dele em poucos cliques.
              </SheetDescription>
            </SheetHeader>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone:</FormLabel>
                    <FormControl ref={withMask("+55 (99) 9 9999-9999")}>
                      <Input {...field} />
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
                    <FormLabel>Meta account ID:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="px-0">
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
                      "Criar novo cliente"
                    )
                  }
                </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export { CreateClientForm };