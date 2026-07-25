import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8001",
    withCredentials: true,
});

export const changePassword = (newpasword:string , confirmpassword:string , id:string) => {
    return api.post("/auth/changepassword", {newpasword , confirmpassword , id});
}

export default api;