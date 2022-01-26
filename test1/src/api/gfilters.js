import request from "@/utils/request";
export const CwEe = params => {
    return request({
        responseType: "json",
        method: "get",
        url: "/cw/ee",
        params
    });
}