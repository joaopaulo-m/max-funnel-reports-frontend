import { z } from 'zod';

const createClientSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(191, "Máximo de caracteres excedido"),
  email: z.string().min(1, "O nome é obrigatório").max(191, "Máximo de caracteres excedido").email("E-mail inválido"),
  phone: z.string().min(1, "O telefone é obrigatório"),
  meta_account_id: z.string().min(1, "Este campo é obrigatório"),
})

export type CreateClientSchemaType = z.infer<typeof createClientSchema>

export {
  createClientSchema,
}