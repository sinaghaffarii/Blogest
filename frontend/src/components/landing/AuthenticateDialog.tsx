/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-jsx-props */
'use client';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAuthenticateContext } from '@/context/AuthenticateContext';
import { useLogin } from '@/services/auth';
import { Spinner } from '../ui/Spinner';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { RouteObject } from '@/utils/routeObject';

interface CookieValues {
  isAuth?: string;
}
export default function AuthenticateDialog() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies<'isAuth', CookieValues>(['isAuth']);
  const { setOpen, open } = useAuthenticateContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const { register, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
  }>({ defaultValues: { email: '', password: '' } });
  const { mutate: Login, isPending } = useLogin();

  const loginHandler = handleSubmit((data) => {
    try {
      Login(data, {
        onSuccess: (response) => {
          if (response.status) {
            toast.success(response.message);
            setCookie('isAuth', response.user.email, { path: '/' });
            router.push(RouteObject.DASHBOARD);
            reset();
            setOpen(false);
          }
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  });

  return (
    <div className="w-full p-6 flex justify-center">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={loginHandler}>
            <DialogHeader>
              <DialogTitle className="font-medium text-lg">
                Welcome back!
              </DialogTitle>
              <DialogDescription>
                Log in with your email and password to continue exploring.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  required
                  id="email"
                  {...register('email', { required: true })}
                  name="email"
                  placeholder="youremail@gmail.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    required
                    className="pe-10"
                    id="password"
                    {...register('password', { required: true })}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent focus-visible:ring-0"
                    type="button"
                    variant="ghost"
                    onClick={toggleShowPassword}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : 'Login'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
