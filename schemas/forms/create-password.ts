import { z } from 'zod';

const createPasswordSchema = z.object({
  password: z.string().min(1, "A senha é obrigatória").max(191, "Muito grande"),
  confirm_password: z.string().min(1, "A senha é obrigatória").max(191, "Muito grande"),
})
.refine((data) => data.password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
});

export type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>

export {
  createPasswordSchema,
}