'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createPasswordSchema, type CreatePasswordSchemaType } from "@/schemas/forms/create-password";
import { createPasswordAction } from "@/actions/auth/create-password";

const CreatePasswordForm = () => {
  const { push } = useRouter()

  const form = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: ""
    }
  })
  const { formState: { isSubmitting } } = form;
  
  async function onSubmit(data: CreatePasswordSchemaType) {
    const response = await createPasswordAction(data)

    if (!response.success) {
      toast.error("Erro ao criar senha", {
        description: response.message
      })

      return;
    }

    push("/app/clients")
  }

  return ( 
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-fit flex flex-col gap-6"
      >
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repita sua senha:</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full h-fit flex flex-col gap-4 mt-3">
          <Button 
            className="h-16" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-fit h-fit flex items-center gap-2">
                <LoaderCircle className="animate-spin size-3" />
                <span className="text-sm font-semibold text-white">Enviando</span>
              </div>
              ) : (
                "Criar minha senha"
              )
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { CreatePasswordForm };