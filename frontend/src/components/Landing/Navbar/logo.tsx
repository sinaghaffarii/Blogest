import Image from 'next/image';

export const Logo = () => (
  <div>
    <Image
      height={32}
      width={32}
      alt="Blogify Logo"
      className="rounded-xl"
      src="/images/cat.jpg"
    />
  </div>
);
