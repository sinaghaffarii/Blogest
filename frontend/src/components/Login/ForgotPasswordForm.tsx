'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useForgotPassword } from '@/services/auth';

import { AuthCard } from './AuthCard';

interface ForgotData {
  email: string;
}

export function ForgotPasswordForm({
  onSuccess,
  onBack,
}: {
  onSuccess: (email: string) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotData>();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotData) => {
    forgotPassword(
      { email: data.email },
      {
        onSuccess: (res) => {
          if (res.status) {
            Swal.fire({ icon: 'success', text: 'Recovery email was sent.' });
            reset();
            onSuccess(data.email);
          }
        },
      },
    );
  };

  return (
    <AuthCard title="Password Recovery" description="Enter your email.">
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
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

        <Button disabled={isPending} type="submit">
          {isPending ? 'In processing ...' : 'Send recovery link'}
        </Button>

        <Button type="button" variant="link" onClick={onBack}>
          Return
        </Button>
      </form>
    </AuthCard>
  );
}
