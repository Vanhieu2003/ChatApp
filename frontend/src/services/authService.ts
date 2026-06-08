import api from "@/lib/axios";

export const authService = {
    signUp: async(
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        const response = await api.post("auth/signup", {
            username,
            email,
            password,
            firstName,
            lastName
        },{withCredentials: true});
        return response.data;
    },

    
    signIn: async (
        username: string,
        password: string
    ) => {
        const response = await api.post("auth/signin", {
            username,
            password
        },{withCredentials: true});
        return response.data;
    },


    signOut:async () => {
        await api.post("auth/signout", {}, {withCredentials: true});
    },

    fetchMe: async () => {
        const response = await api.get("user/me", {withCredentials: true});
        return response.data;
    },

    refresh: async () => {
        const res =  await api.post("auth/refresh", {withCredentials:true});
        return res.data.accessToken;

    }
};