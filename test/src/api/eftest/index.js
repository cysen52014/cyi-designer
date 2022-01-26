import request from "@/utils/request";
export const AopEwi = params => {
    return request({
        responseType: "json",
        method: "get",
        url: "/aop/ewi",
        params
    });
}
export const EscEe = params => {
    return request({
        responseType: "json",
        method: "get",
        url: "/esc/ee",
        params
    });
}