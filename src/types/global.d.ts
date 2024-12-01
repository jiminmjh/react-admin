import type { ReactNode } from "React";
import "axios";

declare global {
  export type IRoute = {
    path: string;
    element: ReactNode;
    children?: { path: string; element: ReactNode }[];
  };

  /**
   * 给axios添加新的类型
   */
  declare module "axios" {
    interface AxiosRequestConfig {
      toast?: boolean;
    }
  }
}

export {};
