'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';
import PublicLayoutProvider from '@/providers/PublicLayoutProvider';

import {
  experiences,
  languages,
  skills,
  toolsCollab,
  toolsDesign,
} from './data';

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
            src="/images/mr-robot.jpg"
            priority
          />
        </div>
      </motion.div>
      <div className="text-right">
        <h1 className="text-2xl md:text-3xl font-bold">سینا غفاری</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          توسعه‌دهنده فرانت‌اند · React / Next.js
        </p>
        <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-foreground">
          من یک مهندس نرم‌افزار و طراح محصول با بیش از ۵ سال تجربه حرفه‌ای در
          توسعه وب و طراحی تجربه کاربری هستم. تخصص من ساخت رابط‌های کاربری با
          عملکرد بالا، مقیاس‌پذیر و با تمرکز بر جزئیات است. اگر به دنبال همکاری
          دورکاری، فریلنسری یا نیمه‌وقت هستید، خوشحال می‌شوم پیام شما را دریافت
          کنم و در خلق پروژه‌ای ارزشمند سهیم باشم.
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
            من در طی سال‌ها با استفاده از استک‌های مدرن مانند React، Next.js،
            TypeScript، GraphQL و Docker پروژه‌های مقیاس‌پذیر اجرا کرده‌ام، و
            هم‌چنین در طراحی تجربه کاربری (UX) و تعامل کاربر تمرکز دارم. هر
            پروژه برای من فرصتی است برای آموختن و خلق چیزی تأثیرگذار.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
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
          {exp.bullets.map((b, idx) => (
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
            <Badge className="py-2 px-3" key={t} variant="default">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SkillsGrid() {
  return (
    <section className="my-10">
      <h2 className="text-lg font-semibold mb-4 text-foreground">مهارت‌ها</h2>

      <div
        className="flex flex-wrap gap-3"
        style={{
          backdropFilter: 'blur(10px)',
        }}
      >
        {skills.map((skill) => (
          <motion.div
            className="rounded-sm px-4 py-2 bg-white/10 border border-white/20 text-sm text-foreground backdrop-blur-md shadow-sm transition hover:bg-white/20 hover:shadow-md cursor-default"
            key={skill.name}
            whileHover={{ scale: 1.05 }}
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <PublicLayoutProvider>
      <main
        dir="rtl"
        className={cn(
          'min-h-screen p-6 md:p-10 transition-colors duration-300 space-y-6 bg-background text-foreground',
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <ProfileHeader />
          </div>

          <SummaryAndInterests />

          <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              {experiences.map((exp) => (
                <ExperienceCard exp={exp} key={exp.id} />
              ))}
            </div>

            <div className="space-y-4">
              <ToolsColumn title="ابزارهای طراحی" tools={toolsDesign} />
              <ToolsColumn title="ابزارهای همکاری" tools={toolsCollab} />
              <ToolsColumn title="زبان‌ها" tools={languages} />
            </div>
          </section>

          <SkillsGrid />

          <div className="h-10" />
        </div>
      </main>
    </PublicLayoutProvider>
  );
}
