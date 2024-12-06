import type { ReactNode } from "React";
import "axios";

global {
  interface IRoute {
    path: string;
    element: any;
    children?: IRoute[];
  }
}

/**
 * 给axios添加新的类型
 */
declare module "axios" {
  interface AxiosRequestConfig {
    toast?: boolean;
  }
}

export {};
