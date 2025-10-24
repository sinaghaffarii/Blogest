'use client';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, PenTool, TrendingUp, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const engagementData = [
  { name: 'Jan', engagement: 2400 },
  { name: 'Feb', engagement: 1398 },
  { name: 'Mar', engagement: 9800 },
  { name: 'Apr', engagement: 3908 },
  { name: 'May', engagement: 4800 },
  { name: 'Jun', engagement: 3800 },
];

const wordData = [
  { word: 'React', size: 50 },
  { word: 'NextJS', size: 40 },
  { word: 'Tailwind', size: 30 },
  { word: 'TypeScript', size: 45 },
  { word: 'UI', size: 25 },
  { word: 'API', size: 20 },
  { word: 'Performance', size: 35 },
  { word: 'Security', size: 28 },
];

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
          Blog Insights Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md">
          Monitor and explore your blog’s growth, engagement, and trending
          topics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
        {[
          {
            title: 'Users',
            value: '12,345',
            change: '+5% this month',
            icon: Users,
            color: 'text-blue-500',
          },
          {
            title: 'Authors',
            value: '230',
            change: 'Active contributors',
            icon: PenTool,
            color: 'text-purple-500',
          },
          {
            title: 'Comments',
            value: '8,764',
            change: '+12% this week',
            icon: MessageCircle,
            color: 'text-emerald-500',
          },
          {
            title: 'Likes',
            value: '27,890',
            change: '-3% this month',
            icon: Heart,
            color: 'text-rose-500',
          },
        ].map((stat, i) => (
          <div key={i}>
            <Card className="bg-white/80 dark:bg-neutral-900/80 border border-transparent hover:border-primary/40 transition-all shadow-sm hover:shadow-lg backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} /> {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Card className="border-0 bg-white/80 dark:bg-neutral-900/80 shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="w-5 h-5 text-primary" /> Engagement Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={320} width="100%">
            <BarChart data={engagementData}>
              <CartesianGrid
                stroke="hsl(var(--border))"
                strokeDasharray="3 3"
              />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  color: 'hsl(var(--foreground))',
                }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar
                dataKey="engagement"
                fill="url(#gradient)"
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0.5} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Word Cloud Chart */}
      <Card className="bg-white/80 dark:bg-neutral-900/80 border-0 shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Trending Keywords
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-4 py-6">
          {wordData.map((word, i) => (
            <motion.span
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 cursor-pointer select-none"
              key={i}
              style={{ fontSize: `${word.size / 2}px` }}
              transition={{ type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.2 }}
            >
              {word.word}
            </motion.span>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <Badge variant="secondary">Total Posts: 1,234</Badge>
        <Badge variant="outline">New Signups Today: 57</Badge>
        <Badge variant="default">Server Status: Online</Badge>
      </div>
    </>
  );
}
