'use client';
import AOS from 'aos';
import { useEffect, useState } from 'react';
import 'aos/dist/aos.css';

import { ForgotPasswordForm } from './ForgotPasswordForm';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import { VerifyEmailForm } from './VerifyEmailForm';

type Mode =
  | 'forgotPassword'
  | 'login'
  | 'register'
  | 'resetPassword'
  | 'verifyEmail';

export function AuthContainer() {
  const [mode, setMode] = useState<Mode>('login');
  const [savedEmail, setSavedEmail] = useState<string>('');

  useEffect(() => {
    AOS.init({
      duration: 450,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [mode]);

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <div key="login" data-aos="fade-up">
            <LoginForm
              onForgot={() => setMode('forgotPassword')}
              onRegister={() => setMode('register')}
            />
          </div>
        );

      case 'register':
        return (
          <div key="register" data-aos="fade-up">
            <RegisterForm
              onLogin={() => setMode('login')}
              onVerify={(email) => {
                setSavedEmail(email);
                setMode('verifyEmail');
              }}
            />
          </div>
        );

      case 'verifyEmail':
        return (
          <div key="verify" data-aos="zoom-in">
            <VerifyEmailForm
              email={savedEmail}
              onBack={() => setMode('login')}
              onSuccess={() => {
                setSavedEmail('');
                setMode('login');
              }}
            />
          </div>
        );

      case 'forgotPassword':
        return (
          <div key="forgot" data-aos="fade-right">
            <ForgotPasswordForm
              onBack={() => setMode('login')}
              onSuccess={(email) => {
                setSavedEmail(email);
                setMode('resetPassword');
              }}
            />
          </div>
        );

      case 'resetPassword':
        return (
          <div key="reset" data-aos="fade-left">
            <ResetPasswordForm
              email={savedEmail}
              onBack={() => setMode('login')}
              onSuccess={() => {
                setSavedEmail('');
                setMode('login');
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-8 w-[500px] max-w-[90vw] mx-auto">
      <div className="w-full max-w-md">{renderForm()}</div>
    </div>
  );
}
