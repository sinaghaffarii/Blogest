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
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-6 md:gap-8"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-border">
        <Image
          height={160}
          width={160}
          alt="Profile"
          className="object-cover w-full h-full"
          src="/images/mr-robot.jpg"
          priority
        />
      </div>

      <div className="text-left flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Sina Ghaffari
        </h1>
        <p className="mt-1 text-md md:text-lg text-muted-foreground">
          Frontend Developer · React / Next.js
        </p>
        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-foreground">
          I’m a software engineer and product designer with over 5 years of
          professional experience in web development and user experience design.
          I specialize in building high-performance, scalable, and
          detail-oriented user interfaces. Open to remote, freelance, or
          part-time collaboration to create meaningful products together.
        </p>
      </div>
    </motion.div>
  );
}

function SummaryAndInterests() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-5 md:col-span-1 bg-white/10 backdrop-blur-lg border border-white/40 shadow-md transition hover">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge className="py-2 px-3">Gaming</Badge>
            <Badge className="py-2 px-3">Traveling</Badge>
            <Badge className="py-2 px-3">Cycling</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="p-5 md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/40 shadow-md transition hover">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base leading-relaxed text-foreground">
            Over the years, I’ve worked on scalable projects using modern stacks
            like React, Next.js, TypeScript, GraphQL, and Docker. I focus on
            designing seamless user experiences (UX) and interactive interfaces.
            Every project is an opportunity to learn, innovate, and deliver
            value.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <motion.div className="transition-transform" whileHover={{ scale: 1.02 }}>
      <Card className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
        <div className="flex items-start justify-between p-5">
          <div className="text-left">
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
    </motion.div>
  );
}

function ToolsColumn({ title, tools }: { title: string; tools: string[] }) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mt-2">
          {tools.map((t) => (
            <Badge className="py-2 px-3" key={t}>
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
    <section className="my-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-foreground">
        Skills
      </h2>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <motion.div
            className="px-5 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md cursor-default text-sm md:text-base transition"
            key={skill.name}
            whileHover={{ scale: 1.08 }}
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
        dir="ltr"
        className={cn(
          'min-h-screen p-6 md:p-10 transition-colors duration-300 space-y-10 bg-background text-foreground',
        )}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <ProfileHeader />
          <SummaryAndInterests />

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-5">
              {experiences.map((exp) => (
                <ExperienceCard exp={exp} key={exp.id} />
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <ToolsColumn title="Design Tools" tools={toolsDesign} />
              <ToolsColumn title="Collaboration Tools" tools={toolsCollab} />
              <ToolsColumn title="Languages" tools={languages} />
            </div>
          </section>

          <SkillsGrid />
        </div>
      </main>
    </PublicLayoutProvider>
  );
}
