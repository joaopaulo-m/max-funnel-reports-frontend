import { z } from 'zod';

const updateClientSchema = z.object({
  name: z.string().max(191, "Máximo de caracteres excedido").optional(),
  email: z.string().email("E-mail inválido").optional(),
  phone: z.string().optional(),
  meta_account_id: z.string().optional()
})

export type UpdateClientSchemaType = z.infer<typeof updateClientSchema>

export {
  updateClientSchema,
}