import {
  FolderGit2Icon,
  GithubIcon,
  HeadsetIcon,
  LaptopIcon,
  LinkedinIcon,
  MessageSquareIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Profile = () => {
  return (
    <div className="w-full col-span-3 mb-auto space-y-8">
      <div className="flex items-center justify-start gap-4">
        <LaptopIcon />
        <p>Profile</p>
      </div>
      <div className="h-96 mt-4 bg-white dark:bg-slate-900 w-full rounded-md p-4 border">
        <Image
          height={200}
          width={150}
          alt="profile image"
          className="object-contain w-full h-8/12"
          src="/images/profile.png"
        />
        <div className="flex items-center justify-center flex-col w-full mx-auto mt-4">
          <p className="text-sm md:text-base font-bold text-gray-950 dark:text-gray-200">
            Sina Ghaffari
          </p>
          <p className="text-sm md:text-base">Front end developer</p>
          <p className="font-medium text-base mt-3">
            I develop everything using Javascript.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-4">
          <StarIcon className="size-5 text-yellow-500" />
          <p>Service</p>
        </div>
        <Link
          className="flex items-center justify-start gap-5 h-14 px-2 rounded-md bg-white dark:bg-slate-900  cursor-pointer border"
          href="#"
        >
          <FolderGit2Icon />
          <p>Blogest</p>
        </Link>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-4 text-gray-600 dark:text-gray-300">
          <HeadsetIcon className="size-5" />
          <p>Service</p>
        </div>

        <ul className="p-4 rounded-md bg-white dark:bg-slate-900 space-y-6 text-gray-600 dark:text-gray-300 border">
          <li>
            <Link
              className="flex items-center justify-start gap-5 cursor-pointer"
              href="#"
            >
              <GithubIcon className="size-5" />
              <p>Github</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center justify-start gap-5 cursor-pointer"
              href="#"
            >
              <MessageSquareIcon className="size-5" />
              <p>Email</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center justify-start gap-5 cursor-pointer"
              href="#"
            >
              <LinkedinIcon className="size-5" />
              <p>Linkedin</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
