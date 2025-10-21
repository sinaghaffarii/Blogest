import AuthenticateDialog from '@/components/auth/AuthenticateDialog';
import Navbar from '@/components/landing/Navbar';
import { AuthenticateProvider } from '@/context/AuthenticateContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticateProvider>
      <Navbar />
      <AuthenticateDialog />
      <main className="min-h-screen w-full">{children}</main>
    </AuthenticateProvider>
  );
}
