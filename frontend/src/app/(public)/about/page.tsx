'use client';

import {
  ArrowLeft,
  ArrowUp,
  Code2,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { toEnglishDate } from '@/utils/toPersianDate';
import SkillsSection from './+component/SkillSections';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl space-y-10">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center space-y-4">
        <p className="text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          😎 Daily
        </p>
        <h1 className="text-4xl font-bold">Hello, I’m Sina Ghaffari</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="Sina Ghaffari" src="/images/profile.png" />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <span>Sina Ghaffari</span>
          <Separator className="h-4" orientation="vertical" />
          <span>Updated {toEnglishDate(new Date())}</span>
        </div>
      </div>

      {/* BIO */}
      <Card className="shadow border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-medium">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I’m a{' '}
            <span className="font-medium text-foreground">
              Front-End Developer
            </span>{' '}
            who cares about writing clean, maintainable, and scalable code. I
            focus on building fast and accessible web applications using modern
            tools like React, Next.js, and TypeScript.
          </p>
          <p>
            I enjoy working in well-structured environments that follow
            principles like SOLID, Clean Code, and agile methodologies such as
            Scrum. My goal is to create user-focused products with great
            performance and developer experience.
          </p>
          <p>
            I’m always open to learning, collaborating, and finding smarter ways
            to solve real-world problems through thoughtful design and clean
            engineering.
          </p>
          <p>
            If you’re interested in my work, check out my{' '}
            <Link
              className="text-primary hover:underline font-medium"
              href="/resume"
            >
              resume
            </Link>{' '}
            or get in touch via email.
          </p>
        </CardContent>
      </Card>

      {/* IMAGE SECTION */}
      <div className="flex justify-center">
        <Image
          height={384}
          width={384}
          alt="Sina working"
          className="rounded-xl shadow-md object-cover"
          src="/images/catDeveloper.jpg"
        />
      </div>

      {/* SKILL SECTION */}
      <SkillsSection />

      {/* CONTACT */}
      <Card className="shadow border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-medium">
            <Code2 className="h-5 w-5 text-blue-500" />
            Connect with Me
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/sina-ghaffariii"
              target="_blank"
            >
              <Button size="icon" variant="outline">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com/sinaghaffarii" target="_blank">
              <Button size="icon" variant="outline">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:sinaghafari.dev@gmail.com" target="_blank">
              <Button size="icon" variant="outline">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* FOOTER NAV */}
      <div className="flex justify-between text-sm text-muted-foreground pt-4">
        <Link className="flex items-center gap-1 hover:text-primary" href="/">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <Button
          className="flex items-center gap-1 hover:text-primary"
          variant="ghost"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-4 w-4" /> Top
        </Button>
      </div>
    </main>
  );
}
