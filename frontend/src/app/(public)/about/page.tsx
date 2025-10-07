'use client';

import { motion } from 'framer-motion';
import { Briefcase, Link as LinkIcon, Mail, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';

import {
  experiences,
  languages,
  projects,
  skills,
  toolsCollab,
  toolsDesign,
} from './data';

// کامپوننت‌ها
function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <Button className="w-10 h-10 rounded-md" variant="ghost" onClick={toggle}>
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
}

function ProfileHeader() {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 10 }}
      >
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-lg border border-border">
          <Image
            height={160}
            width={160}
            alt="پروفایل"
            className="object-cover w-full h-full"
            src="/cv.jpg"
          />
        </div>
      </motion.div>
      <div className="text-right">
        <h1 className="text-2xl md:text-3xl font-bold">جان دو</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          طراح محصول & توسعه‌دهنده فرانت‌اند — React / Next.js
        </p>
        <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-foreground">
          من یک توسعه‌دهنده و طراح محصول هستم که روی ساخت تجربه‌های دیجیتال جذاب
          تمرکز دارم. تجربهٔ کار با تیم‌های محصول و مهندسی برای ارائهٔ
          راه‌حل‌های باکیفیت را دارم.
        </p>
      </div>
    </div>
  );
}

function SummaryAndInterests() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 md:col-span-1 h-full bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle className="text-lg">علاقه‌مندی‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="py-2 px-3">بازی</Badge>
            <Badge className="py-2 px-3">سفر</Badge>
            <Badge className="py-2 px-3">دوچرخه‌سواری</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="p-4 md:col-span-2 h-full bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle className="text-lg">خلاصه</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">
            بیش از ۵ سال تجربه در توسعهٔ وب، طراحی تجربهٔ کاربری و همکاری در
            پروژه‌های تیمی. تخصص در ساخت رابط‌هایی که کاربران را درگیر کرده و
            نتیجه‌محور هستند.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: any }) {
  return (
    <Card className="overflow-hidden bg-card border-border text-card-foreground">
      <div className="flex items-start justify-between p-4 md:p-6">
        <div className="text-right">
          <h3 className="text-lg font-semibold">{exp.company}</h3>
          <p className="text-sm text-muted-foreground">{exp.role}</p>
          <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
        </div>
      </div>
      <Separator className="border-border" />
      <CardContent>
        <ul className="list-disc list-inside text-sm space-y-2 text-foreground">
          {exp.bullets.map((b: string, idx: number) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key
            <li key={idx}>{b}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ToolsColumn({ title, tools }: { title: string; tools: string[] }) {
  return (
    <Card className="bg-card border-border text-card-foreground">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {tools.map((t) => (
            <div
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-accent-800 bg-accent-100 rounded-sm dark:bg-accent-900 dark:text-accent-300"
              id="badge-dismiss-default"
              key={t}
            >
              {t}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SkillsGrid() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-foreground">مهارت‌ها</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <Card
            className="bg-card border-border text-card-foreground"
            key={s.name}
          >
            <CardContent className="flex items-center justify-between">
              <div className="text-right">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">
                  سطح: {s.level}%
                </div>
              </div>
              <div className="w-48">
                <div className="h-2 w-full rounded bg-muted overflow-hidden">
                  <div
                    className="h-full rounded bg-accent"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PortfolioContact() {
  return (
    <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle>پورتفولیو</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {projects.map((p) => (
              <Button className="py-2 px-3" key={p.title} variant="outline">
                {p.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle>تحصیلات / دوره‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="text-right">
                <div className="font-medium">کارشناسی علوم کامپیوتر</div>
                <div className="text-xs text-muted-foreground">
                  دانشگاه فناوری • ۱۳۹۴ - ۱۳۹۸
                </div>
              </div>
              <div className="text-xs text-muted-foreground">فارغ‌التحصیل</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle>تماس</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <div className="text-sm">hello@sample.com</div>
            </div>
            <div className="flex items-center gap-3">
              <LinkIcon className="w-4 h-4" />
              <div className="text-sm">www.example.com</div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4" />
              <div className="text-sm">Lagos, Nigeria</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// کامپوننت اصلی
export default function AboutPage() {
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute(
      'data-theme',
      prefersDark ? 'dark' : 'light',
    );
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <main
      dir="rtl"
      className={cn(
        'min-h-screen p-6 md:p-10 transition-colors duration-300',
        theme === 'dark'
          ? 'bg-background text-foreground'
          : 'bg-background text-foreground',
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <ProfileHeader />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>

        <Separator className="border-border" />

        <SummaryAndInterests />

        <Separator className="border-border" />

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key
              <ExperienceCard exp={exp} key={i} />
            ))}
          </div>

          <div className="space-y-4">
            <ToolsColumn title="ابزارهای طراحی" tools={toolsDesign} />
            <ToolsColumn title="ابزارهای همکاری" tools={toolsCollab} />
            <ToolsColumn title="زبان‌ها" tools={languages} />
          </div>
        </section>

        <Separator className="border-border" />

        <SkillsGrid />

        <Separator className="border-border" />

        <PortfolioContact />

        <div className="h-10" />
      </div>
    </main>
  );
}
