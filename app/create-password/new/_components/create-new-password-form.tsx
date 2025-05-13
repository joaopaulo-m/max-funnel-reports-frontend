'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createNewPasswordAction } from "@/actions/auth/create-new-password";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { createNewPasswordSchema, type CreateNewPasswordSchemaType } from "@/schemas/forms/create-new-password";

const CreateNewPasswordForm = () => {
  const { push } = useRouter()

  const form = useForm<CreateNewPasswordSchemaType>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      token: "",
      password: "",
      confirm_password: ""
    }
  })
  
  async function onSubmit(data: CreateNewPasswordSchemaType) {
    const response = await createNewPasswordAction(data)

    if (!response.success) {
      toast.error("Erro ao criar nova senha", {
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
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código:</FormLabel>
              <FormControl>
              <InputOTP className="h-12" maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
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
          <Button className="h-16" type="submit">
            Criar nova senha
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { CreateNewPasswordForm };