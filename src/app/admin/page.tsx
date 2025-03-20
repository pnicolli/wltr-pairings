import H1 from '@/components/H1/H1';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const session = await auth();
  if (!session) return redirect('/login');

  return (
    <main className="px-2">
      <H1>Admin</H1>
    </main>
  );
}
