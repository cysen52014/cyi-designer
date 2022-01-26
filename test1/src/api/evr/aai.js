import request from "@/utils/request";
const CcRr = params => {
    return request({
        responseType: "json",
        method: "get",
        url: "/cc/rr",
        params
    });
}