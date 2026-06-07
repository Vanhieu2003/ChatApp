import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
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
                    Tạo tài khoản ChatApp
                  </h1>
                  <p className="text-muted-foreground text-balance">Chào mừng bạn đến với ChatApp hãy đăng ký để bắt đầu</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className= "space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Họ
                  </Label>
                  <Input type="text"  id="lastname" placeholder="Nguyễn Văn" />
                </div>

                <div className= "space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    Tên
                  </Label>
                  <Input type="text"  id="firstname" placeholder="A" />
                </div>
                </div>

              <div className = "flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  Tên đăng nhập
                </Label>
                <Input type="text" id="username" placeholder="your.username" />
              </div>

              <div className = "flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input type="email" id="email" placeholder="your.email@example.com" />
              </div>

              <div className = "flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                 Mật khẩu
                </Label>
                <Input type="password" id="password" placeholder="your.password" />
              </div>

              <Button type="submit" className="w-full">
               Tạo tài khoản
              </Button>

              <div>
                Đã có tài khoản? {" "}
                <a href="/signin" className = "underline underline-offset-4">
                  Đăng nhập
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
