'use client';
import Lottie from 'lottie-react';

import javaScriptCpu from '../../../public/images/JavaScript-cpu.json';
import { Button } from '../ui/Button';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-sky-100 dark:from-gray-900/20 dark:to-sky-900/20 text-gray-800 dark:text-gray-100 text-center rounded-2xl my-20 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center min-h-[400px]">
      <div className="opacity-90 col-span-2 md:col-span-1 mx-auto order-2">
        <Lottie
          style={{ height: '100%', width: '100%' }}
          animationData={javaScriptCpu}
          loop
        />
      </div>

      <div className="relative z-10 max-w-2xl p-8 col-span-2 md:col-span-1 mx-auto order-1">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Want to get the latest articles?
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Subscribe to our newsletter and learn about the latest articles and
          tutorials
        </p>
        <Button
          className="px-8 py-4 font-semibold transition shadow-md"
          variant="outline"
        >
          Sign up in the newsletter
        </Button>
      </div>
    </section>
  );
}
