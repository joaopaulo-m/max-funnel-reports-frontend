'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { createUserSchema, type CreateUserSchemaType } from "@/schemas/forms/create-user";
import { createUserAction } from "@/actions/user/create";
import { useState } from "react";

const CreateUserForm = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      permission_type: "manager"
    }
  })
  const { formState: { isSubmitting } } = form;
  
  async function onSubmit(data: CreateUserSchemaType) {
    const response = await createUserAction(data)

    if (!response.success) {
      toast.error("Error ao criar usuário", {
        description: response.message
      })
    } else {
      toast.success("Colaborador criado com sucesso")
      setOpen(false)
    }

    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-fit h-12 !px-6">
          <UserPlus width={16} height={16} color="#fff" />
          <span className="text-sm font-semibold text-white">Adicionar colaborador</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="py-4"
          >
            <SheetHeader className="px-0">
              <SheetTitle className="font-bold">Cadastro de novo Colaborador</SheetTitle>
              <SheetDescription>
                Preencha os dados para dar acesso e integrar a equipe com praticidade.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full h-fit flex flex-col gap-5 mt-4">
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
                name="permission_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissão:</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full !h-12">
                          <SelectValue placeholder="Manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Gerenciador</SelectItem>
                          <SelectItem value="owner">Dono</SelectItem>
                        </SelectContent>
                      </Select>
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
                    "Criar novo Colaborador"
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

export { CreateUserForm };