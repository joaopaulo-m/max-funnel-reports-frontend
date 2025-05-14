'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { loginSchema, type LoginSchemaType } from "@/schemas/forms/login";
import { ForgetPasswordForm } from "./forget-password-form";
import { loginAction } from "@/actions/auth/login";

const LoginForm = () => {
  const { push } = useRouter()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      password_not_defined: false
    }
  })
  const { formState: { isSubmitting } } = form;

  async function onSubmit(data: LoginSchemaType) {
    const response = await loginAction(data)

    if (!response.success) {
      toast.error("Erro ao autenticar", {
        description: response.message
      })

      return;
    }

    if (data.password_not_defined) {
      push('create-password')

      return;
    }

    push('/app/clients')
  }

  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-fit flex flex-col gap-6"
        >
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="password_not_defined"
            render={({ field }) => (
              <FormItem className="flex flex-row">
                <FormControl className="cursor-pointer">
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Ainda não tenho minha senha</FormLabel>
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
                  "Entrar na minha conta"
                )
              }
            </Button>
          </div>
        </form>
      </Form>
      <ForgetPasswordForm />
    </div>
  );
}

export { LoginForm };