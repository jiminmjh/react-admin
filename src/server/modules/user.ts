import request from "@/utils/request";
import { ILoginRes, IUserInfo, IMenuItem } from "@/types/user";

/* 用户登陆 */
export function loginAPI(data: any) {
  return request.post<ILoginRes>("/admin/base/open/login", data);
}

/*刷新token*/
export function refreshTokenAPI(refreshToken: string) {
  return request.get<ILoginRes>("/admin/base/open/refreshToken", {
    refreshToken,
  });
}

/** 获取用户信息 */
export function getPerson() {
  return request.get<IUserInfo>("/admin/base/comm/person");
}

/** 获取用户权限信息 */
export function getPermmenu() {
  return request.get<{ perms: string[]; menus: IMenuItem[] }>(
    "/admin/base/comm/permmenu"
  );
}
