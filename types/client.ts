import type { ClientReportsSettings } from "./client-reports-settings"

export type Client = {
  id: string
  user_id: string
  name: string
  email: string
  password: string
  phone: string
  meta_account_id: string
  created_at: number
  reports_settings: ClientReportsSettings
}