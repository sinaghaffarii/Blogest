'use client';

import React from 'react';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';

export default function SkillsSection() {
  const technicalSkills = [
    'React',
    'TypeScript',
    'JavaScript',
    'React Query',
    'Next.js',
    'Zod',
    'Tailwind CSS',
    'Jest',
    'Vitest',
    'Docker',
    'Node.js',
    'WebSockets',
    'PWA',
    'MongoDB',
    'Express',
  ];

  const softSkills = [
    'Critical Thinking',
    'Problem Solving',
    'Team Collaboration',
    'Open to Feedback',
    'Time Management',
    'Adaptability',
  ];

  return (
    <section className="w-full max-w-4xl mx-auto space-y-10 py-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-medium tracking-tight">
          Skills & Expertise
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          A blend of technical and soft skills that help me build scalable,
          maintainable, and user-friendly web applications.
        </p>
      </div>

      {/* Technical Skills */}
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-medium text-primary tracking-wide">
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            Technologies and tools I use regularly to build fast, modern web
            apps.
          </p>

          <div className="flex flex-wrap gap-3">
            {technicalSkills.map((skill) => (
              <Badge
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-muted/50 hover:bg-muted transition-colors duration-200"
                key={skill}
                variant="secondary"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-medium text-primary tracking-wide">
            Soft Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            Personal qualities that help me contribute effectively in any team
            or project.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {softSkills.map((skill) => (
              <li
                className="p-3 rounded-md border border-muted/30 bg-muted/10 hover:bg-muted/20 transition-colors duration-200"
                key={skill}
              >
                <span className="text-sm md:text-base font-medium">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <div className="text-center text-sm text-muted-foreground">
        Interested in seeing these skills in action?{' '}
        <a
          className="underline text-primary hover:text-primary/80 transition-colors"
          href="/resume"
        >
          Check out my resume
        </a>
        .
      </div>
    </section>
  );
}
