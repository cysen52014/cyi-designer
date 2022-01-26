import {
    CwEe
} from "@/api/gfilters";
const cer = val => {
    return {
        ei: e
    } [val]
}
const cci = async val => {
    const {
        errorCode,
        data
    } = await CwEe();
    if (errorCode === "0") {
        return data[val]
    };
}
export default {
    cer,
    cci: cci()
}