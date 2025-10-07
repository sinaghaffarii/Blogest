import { ThemeProvider } from '@/components/ThemProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <div className="relative min-h-screen w-screen antialiased">
        {children}
      </div>
    </ThemeProvider>
  );
}
