'use client';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/services/auth';

import { AuthCard } from './AuthCard';

interface LoginData {
  email: string;
  password: string;
}

export function LoginForm({
  onForgot,
  onRegister,
}: {
  onForgot: () => void;
  onRegister: () => void;
}) {
  const [_, setCookie] = useCookies(['isAuth']);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginData) =>
    login(data, {
      onSuccess: ({
        status,
        message,
      }: {
        status: boolean;
        message: string;
      }) => {
        if (status) {
          setCookie('isAuth', 'true', { path: '/' });
          router.push('/dashboard');
          toast.success(message);
        }
      },
    });

  return (
    <AuthCard title="خوش آمدید" description="با حساب خود وارد شوید.">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'ایمیل الزامی است.' })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="grid gap-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">رمز عبور</Label>
            <Button type="button" variant="link" onClick={onForgot}>
              فراموش کرده‌اید؟
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password', { required: 'رمز عبور الزامی است.' })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'در حال پردازش...' : 'ورود'}
        </Button>

        <div className="text-center text-sm">
          حساب کاربری ندارید!
          <Button type="button" variant="link" onClick={onRegister}>
            ثبت‌نام
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
