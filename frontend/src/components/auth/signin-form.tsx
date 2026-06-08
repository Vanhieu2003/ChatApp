import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import {z} from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"



const signinFormSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

type SigninFormData = z.infer<typeof signinFormSchema>
export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const{signIn} = useAuthStore();
    const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SigninFormData>({
    resolver: zodResolver(signinFormSchema)
  });


  const onSubmit = async (data: SigninFormData) => {
        const { username, password } = data;

        await signIn(username, password);
        navigate("/");
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <a
                href="#"
                className="mx-auto block w-fit text-center"
                >
                  <img
                    src="/logo.svg"
                    alt="Logo"
                  />
                 
                </a>
                 <h1 className="text-2xl font-bold">
                    Đăng nhập vào ChatApp
                  </h1>
                  <p className="text-muted-foreground text-balance">Chào mừng bạn đến với ChatApp hãy đăng nhập để tiếp tục</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                </div>
                

              <div className = "flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  Tên đăng nhập
                </Label>
                <Input type="text" id="username" placeholder="your.username" {...register("username")} />
                {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
              </div>

              <div className = "flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                 Mật khẩu
                </Label>
                <Input type="password" id="password" placeholder="your.password" {...register("password")} />
                {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <div>
                Chưa có tài khoản? {" "}
                <a href="/signup" className = "underline underline-offset-4">
                  Đăng ký
                </a>
              </div>


            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2  object-cover "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balancepx-6 text-center *[a]:hover:text-primary text-sm text-muted-foreground *:[a]:underline *[a]:underline-offset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản Dịch vụ</a>{" "}
        và  <a href="#">Chính sách Bảo mật</a> của chúng tôi.
      </div>
    </div>
  )
}
