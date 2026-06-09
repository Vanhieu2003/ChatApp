import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set,get) => ({
accessToken: null,
user: null,
loading: false,

    clearState: () => {
        set({ accessToken: null, user: null });
    },

    setAccessToken : (accessToken) => {
        set({accessToken});

    },
signIn: async (username: string, password: string) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(username, password);
      get().setAccessToken(accessToken);

      await get().fetchMe();

      toast.success("Chào mừng bạn quay 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công!");
    } finally {
      set({ loading: false });
    }
},

signUp: async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    try{
        set({loading: true});
        // Call API to sign up the user
        await authService.signUp(username, email, password, firstName, lastName);
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");

    }catch(error){
        console.log("Signup error:", error);
        toast.error("Đăng ký thất bại");
    }finally{
        set({loading: false});
    }
},

signOut: async () => {
    try {
        set({loading: true});
        await authService.signOut();
        get().clearState();
        toast.success("Đăng xuất thành công");
    } catch (error) {
        console.log("Signout error:", error);
        toast.error("Đăng xuất thất bại");
    }

},

fetchMe: async () => {
    try{
        set({loading: true});
        const user = await authService.fetchMe();
        set({user});

    }catch(error){
        set({user: null, accessToken: null});
        console.log("Fetch me error:", error);
        toast.error("Lấy thông tin người dùng thất bại");

    }finally{
        set({loading: false});
    }
},

refresh : async () => {
    try{
        set({loading:true})
        const {user,fetchMe, setAccessToken} = get();
        const accessToken = await authService.refresh();

        setAccessToken(accessToken);

        if(!user){
            await fetchMe();
        }
    }catch(error){
        console.error(error);
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        get().clearState();
    }finally{
        set({loading:false})

    }
    
}

}));


