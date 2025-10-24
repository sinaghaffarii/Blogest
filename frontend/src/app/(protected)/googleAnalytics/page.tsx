'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GoogleAnalytics = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <DotLottieReact
        className="object-contain w-96 h-96"
        src="/images/Developer1.json"
        autoplay
        loop
      />
      <p>This page is under construction, it will be activated soon.</p>
    </div>
  );
};

export default GoogleAnalytics;
