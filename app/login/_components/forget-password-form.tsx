import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { forgetPasswordSchema, type ForgetPasswordSchemaType } from "@/schemas/forms/forget-password";
import { sendPasswordResetEmailAction } from "@/actions/auth/send-password-reset-email";
import { useRouter } from "next/navigation";

const ForgetPasswordForm = () => {
  const router = useRouter()
  const form = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    }
  })
  
  async function onSubmit(data: ForgetPasswordSchemaType) {
    const result = await sendPasswordResetEmailAction(data.email)

    if (!result.success) {
      toast.error("Erro ao enviar email de recuperação", {
        description: result.message,
      })
    } else {
      router.push("/create-password/new")
    }

    form.reset()
  }
  
  return ( 
    <Dialog>
      <DialogTrigger className="w-full flex justify-start cursor-pointer" asChild>
        <button
          className="text-primary text-xs font-medium underline"
        >
          Esqueceu sua senha? Clique aqui.
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>Esqueceu a senha? Tudo bem, acontece!</DialogTitle>
              <DialogDescription>
                Informe seu e-mail e te enviaremos um link para criar uma nova senha rapidinho.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full">
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
            </div>
            <DialogFooter>
              <Button type="submit">Enviar email</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>  
  );
}

export { ForgetPasswordForm };