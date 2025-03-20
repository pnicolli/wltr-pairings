import AdminHeader from '@/components/AdminHeader/AdminHeader';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
