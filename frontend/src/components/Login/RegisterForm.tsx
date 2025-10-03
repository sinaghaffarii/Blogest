'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useRegister } from '@/services/auth';

import { AuthCard } from './AuthCard';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function RegisterForm({
  onLogin,
  onVerify,
}: {
  onLogin: () => void;
  onVerify: (email: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterData>();
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data: RegisterData) => {
    registerUser(data, {
      onSuccess: (res) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            text: 'کد تایید به ایمیل شما ارسال شد.',
          });
          reset();
          onVerify(data.email);
        }
      },
    });
  };

  return (
    <AuthCard
      title="ثبت‌نام"
      description="اطلاعات خود را برای ثبت‌نام وارد کنید."
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="name">نام</Label>
          <Input
            id="name"
            type="text"
            {...register('name', { required: 'نام الزامی است.' })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

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
          <Label htmlFor="password">رمز عبور</Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'رمز عبور الزامی است.',
              minLength: { value: 6, message: 'حداقل ۶ کاراکتر' },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'در حال پردازش...' : 'ثبت‌نام'}
        </Button>

        <div className="text-center text-sm">
          قبلاً حساب دارید؟
          <Button type="button" variant="link" onClick={onLogin}>
            ورود
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
