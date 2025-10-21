'use client';
import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { useAuthenticateContext } from '@/context/AuthenticateContext';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import VerifyOtpForm from './VerifyOtpForm';

type Step = 'login' | 'register' | 'verifyOtp';

export default function AuthenticateDialog() {
  const { open, setOpen } = useAuthenticateContext();
  const [step, setStep] = React.useState<Step>('login');
  const [email, setEmail] = React.useState<string | null>(null);

  const goToLogin = () => setStep('login');
  const goToRegister = () => setStep('register');
  const goToVerifyOtp = (em: string) => {
    console.log({ emailValue: em });
    setEmail(em);
    setStep('verifyOtp');
  };

  const formHandlerSteps = (stepValue: Step) => {
    switch (stepValue) {
      case 'login':
        return <LoginForm onRegister={goToRegister} />;

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
      default:
        return null;
    }
  };

  console.log({ step });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-md">
        {formHandlerSteps(step)}
      </DialogContent>
    </Dialog>
  );
}
