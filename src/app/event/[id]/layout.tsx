import Header from '@/components/Header/Header';

export default function EventLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
