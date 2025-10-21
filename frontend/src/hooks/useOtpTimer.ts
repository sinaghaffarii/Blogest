'use client';
import { useEffect, useState } from 'react';

export default function useOtpTimer(minutes: number = 10) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const savedExpire = localStorage.getItem('otp_expire');
    if (savedExpire) {
      const diff = Math.floor((Number(savedExpire) - Date.now()) / 1000);
      if (diff > 0) setTimeLeft(diff);
    } else {
      const expire = Date.now() + minutes * 60 * 1000;
      localStorage.setItem('otp_expire', String(expire));
      setTimeLeft(minutes * 60);
    }
  }, [minutes]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const expired = timeLeft <= 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return { timeLeft, expired, formatTime };
}
