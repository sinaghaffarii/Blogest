'use client';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
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
    <AuthCard title="Welcome" description="Sign in with your account.">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required.' })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="grid gap-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Button type="button" variant="link" onClick={onForgot}>
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required.' })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'Processing...' : 'Login'}
        </Button>

        <div className="text-center text-sm">
          Don’t have an account?
          <Button type="button" variant="link" onClick={onRegister}>
            Register
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
