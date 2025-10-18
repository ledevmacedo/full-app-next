export type AlertVariant =
  | "default"
  | "success"
  | "warning"
  | "loading"
  | "error";

export interface AlertInfo {
  variant?: AlertVariant;
  title?: string;
  sub?: string;
  label?: string;
  placeholder?: string;
  current?: string;
  timeout?: boolean;
  loaded: boolean;
}
