'use client';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner';
import { useLogin } from '@/services/auth';
import { RouteObject } from '@/utils/routeObject';

interface LoginFormProps {
  onRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({
  onRegister,
  onForgotPassword,
}: LoginFormProps) {
  const router = useRouter();
  const [, setCookie] = useCookies(['isAuth']);
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const onSubmit = handleSubmit((data) => {
    login(data, {
      onSuccess: (res) => {
        if (res.status) {
          toast.success(res.message);
          setCookie('isAuth', res.user.email, { path: '/' });
          router.push(RouteObject.DASHBOARD);
        }
      },
      onError: () => toast.error('Login failed'),
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Welcome back!</DialogTitle>
        <DialogDescription>
          Log in with your email and password to continue.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            {...register('email', { required: true })}
            placeholder="youremail@gmail.com"
          />
        </div>

        <div className="grid gap-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
              placeholder="••••••••"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
              type="button"
              variant="ghost"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-start flex-col">
          <Button
            className="me-auto p-0 text-sm text-primary hover:text-primary/80"
            type="button"
            variant="link"
            onClick={onForgotPassword}
          >
            Forgot your password?
          </Button>
          <Button
            className="me-auto p-0 text-sm"
            type="button"
            variant="link"
            onClick={onRegister}
          >
            Don't have an account? Register
          </Button>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={isPending} type="submit">
          {isPending ? <Spinner /> : 'Login'}
        </Button>
      </DialogFooter>
    </form>
  );
}
