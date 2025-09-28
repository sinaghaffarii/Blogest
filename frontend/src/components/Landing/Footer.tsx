import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        {/* متن کپی‌رایت */}
        <p className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} ساخته شده با 💜 توسط سینا
        </p>

        {/* لینک‌ها */}
        <div className="flex gap-6 text-sm">
          <Link className="hover:text-white" href="/about">
            درباره من
          </Link>
          <Link className="hover:text-white" href="/contact">
            تماس با من
          </Link>
          <Link className="hover:text-white" href="/privacy">
            حریم خصوصی
          </Link>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="flex gap-4">
          <Link aria-label="گیت‌هاب" href="https://github.com">
            <Github className="w-5 h-5 hover:text-white transition" />
          </Link>
          <Link aria-label="لینکدین" href="https://linkedin.com">
            <Linkedin className="w-5 h-5 hover:text-white transition" />
          </Link>
          <Link aria-label="توییتر" href="https://twitter.com">
            <Twitter className="w-5 h-5 hover:text-white transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
