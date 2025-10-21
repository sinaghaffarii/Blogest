'use client';
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
import { useRegister } from '@/services/auth';

interface RegisterFormProps {
  onSuccess: (email: string) => void;
  onLogin: () => void;
}

export default function RegisterForm({
  onSuccess,
  onLogin,
}: RegisterFormProps) {
  const { register, handleSubmit } = useForm<{
    name: string;
    email: string;
    password: string;
  }>();
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = handleSubmit((data) => {
    registerUser(data, {
      onSuccess: (res) => {
        if (res.status) {
          toast.success('Registration successful. Check your email for OTP.');
          onSuccess(data.email);
        }
      },
      onError: () => toast.error('Registration failed.'),
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Create an account</DialogTitle>
        <DialogDescription>Sign up to get started.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input
            {...register('name', { required: true })}
            placeholder="Sina Dev"
          />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            {...register('email', { required: true })}
            placeholder="youremail@gmail.com"
          />
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            {...register('password', { required: true })}
            placeholder="••••••••"
          />
        </div>

        <Button
          className="me-auto p-0 text-sm"
          type="button"
          variant="link"
          onClick={onLogin}
        >
          Already have an account? Login
        </Button>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={isPending} type="submit">
          {isPending ? <Spinner /> : 'Register'}
        </Button>
      </DialogFooter>
    </form>
  );
}
