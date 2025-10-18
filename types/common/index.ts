// Common utility types
export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
