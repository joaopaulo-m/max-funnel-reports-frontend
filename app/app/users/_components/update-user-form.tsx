'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserPen } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { updateUserSchema, type UpdateUserSchemaType } from "@/schemas/forms/update-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { User } from "@/types/user";
import { updateUserAction } from "@/actions/user/update";

interface UpdateUserFormProps {
  user: User
}

const UpdateUserForm = (props: UpdateUserFormProps) => {
  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: props.user.name,
      email: props.user.email,
      permission_type: props.user.permission_type,
    }
  })

  async function onSubmit(data: UpdateUserSchemaType) {
    const response = await updateUserAction({
      ...data,
      user_id: props.user.id,
      current_user: props.user
    })

    if (!response.success) {
      toast.error("Error ao atualizar usuário", {
        description: response.message
      })
    }

    form.reset()
  }

  useEffect(() => {
    form.reset({
      name: props.user.name,
      email: props.user.email,
      permission_type: props.user.permission_type,
    });
  }, [props.user, form]);  
  
  return ( 
    <Dialog>
      <DialogTrigger className="w-fit flex justify-start cursor-pointer" asChild>
        <button className="w-fit flex items-center gap-1 text-zinc-800 cursor-pointer">
          <UserPen width={16} height={16} color="#27272a" />
          <span className="text-xs font-semibold underline">Editar</span>
        </button>
      </DialogTrigger>
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
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Atualizar colaborador</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>  
  );
}

export { UpdateUserForm };