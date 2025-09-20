'use client';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLogin } from '@/services/auth';

interface LoginFormData {
  email: string;
  password: string;
}
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues: { email: '', password: '' } });
  const { mutate: login, isPending } = useLogin();
  const [, setCookie] = useCookies(['isAuth']);
  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: (response) => {
        setCookie('isAuth', response.status, { path: '/' });
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">خوش آمدید</CardTitle>
          <CardDescription>با حساب گوگل خود وارد شوید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button className="w-full" variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  با Google وارد شوید
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  یا با ادامه
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register('email', {
                      required: 'وارد کردن ایمیل الزامی است.',
                      pattern: {
                        value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm,
                        message: 'آدرس ایمیل نامعتبر است.',
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between w-full">
                    <Label htmlFor="password">رمز عبور</Label>
                    <Button
                      className="ms-auto text-sm underline-offset-4 hover:underline"
                      variant={'ghost'}
                    >
                      رمز ورود خود را فراموش کرده اید؟
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'وارد کردن رمز عبور الزامی است.',
                      minLength: {
                        value: 6,
                        message: 'رمز عبور باید حداقل 6 نویسه باشد',
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button className="w-full" disabled={isPending} type="submit">
                  {isPending ? 'در حال ورود...' : 'ادامه'}
                </Button>
              </div>
              <div className="text-center text-sm">
                آیا حساب کاربری ندارید؟
                <Button
                  variant={'link'}
                  className="underline underline-offset-4 mx-2"
                >
                  ثبت نام کردن
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        <p>
          با کلیک روی «ادامه»، شما با <Link href="#">شرایط خدمات</Link> و
          <Link href="#">سیاست حفظ حریم خصوصی</Link> موافقت می‌کنید.
        </p>
      </div>
    </div>
  );
}
