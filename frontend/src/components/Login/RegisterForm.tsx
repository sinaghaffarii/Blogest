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
            text: 'A verification code has been sent to your email.',
          });
          reset();
          onVerify(data.email);
        }
      },
    });
  };

  return (
    <AuthCard
      title="Register"
      description="Enter your information to create an account."
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required.' })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'Processing...' : 'Register'}
        </Button>

        <div className="text-center text-sm">
          Already have an account?
          <Button type="button" variant="link" onClick={onLogin}>
            Login
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
