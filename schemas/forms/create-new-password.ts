import { z } from 'zod';

const createNewPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(1, "A senha é obrigatória").max(191, "Muito grande"),
  confirm_password: z.string().min(1, "A senha é obrigatória").max(191, "Muito grande"),
})
.refine((data) => data.password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
});

export type CreateNewPasswordSchemaType = z.infer<typeof createNewPasswordSchema>

export {
  createNewPasswordSchema,
}