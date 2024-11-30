import type { ReactNode } from "React";

export type IRoute = {
  path: string;
  element: ReactNode;
  children?: { path: string; element: ReactNode }[];
};
