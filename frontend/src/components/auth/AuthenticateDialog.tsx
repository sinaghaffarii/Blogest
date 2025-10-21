'use client';
import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { useAuthenticateContext } from '@/context/AuthenticateContext';

import { ForgotPasswordForm } from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import VerifyOtpForm from './VerifyOtpForm';

type Step =
  | 'forgotPassword'
  | 'login'
  | 'register'
  | 'resetPassword'
  | 'verifyOtp';

export default function AuthenticateDialog() {
  const { open, setOpen } = useAuthenticateContext();
  const [step, setStep] = React.useState<Step>('login');
  const [email, setEmail] = React.useState<string | null>(null);

  const goToLogin = () => setStep('login');
  const goToRegister = () => setStep('register');
  const goToVerifyOtp = (em: string) => {
    setEmail(em);
    setStep('verifyOtp');
  };
  const goToForgotPassword = () => setStep('forgotPassword');
  const goToResetPassword = (em: string) => {
    setEmail(em);
    setStep('resetPassword');
  };

  const formHandlerSteps = (stepValue: Step) => {
    switch (stepValue) {
      case 'login':
        return (
          <LoginForm
            onForgotPassword={goToForgotPassword}
            onRegister={goToRegister}
          />
        );

      case 'register':
        return (
          <RegisterForm
            onLogin={goToLogin}
            onSuccess={(em: string) => goToVerifyOtp(em)}
          />
        );
      case 'verifyOtp':
        return (
          <VerifyOtpForm
            email={email!}
            onBack={goToLogin}
            onSuccess={goToLogin}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            onBack={goToLogin}
            onSuccess={goToResetPassword}
          />
        );
      case 'resetPassword':
        return (
          <ResetPasswordForm
            email={email!}
            onBack={goToForgotPassword}
            onSuccess={goToLogin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-md">
        {formHandlerSteps(step)}
      </DialogContent>
    </Dialog>
  );
}
