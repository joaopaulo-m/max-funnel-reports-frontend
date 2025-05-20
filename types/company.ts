import type { ReportDay } from "./report-day";

export type Company = {
  id: string;
  name: string;
  evolution_instance: string;
  meta_token: string;
  meta_account_id: string;
  report_lookback_limit: number;
  report_days: ReportDay[];
  created_at: number;
}