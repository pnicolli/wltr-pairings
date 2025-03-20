import H1 from '@/components/H1/H1';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';

export default async function AdminSetup() {
  const session = await auth();
  if (!session) return redirect('/login');

  return (
    <main className="px-2">
      <H1>Admin Setup</H1>
      <form
        action={async () => {
          'use server';
          if (!process.env.SUPER_ADMIN_EMAIL) {
            throw new Error('SUPER_ADMIN_EMAIL is not set');
          }
          const superAdmin = await prisma.user.findFirst({
            where: {
              email: process.env.SUPER_ADMIN_EMAIL,
            },
          });
          if (superAdmin) {
            await prisma.userInfo.upsert({
              where: {
                id: superAdmin.id,
              },
              update: {
                isSuperAdmin: true,
              },
              create: {
                isSuperAdmin: true,
                user: {
                  connect: {
                    id: superAdmin.id,
                  },
                },
              },
            });
          }
          redirect('/admin');
        }}
      >
        <Button type="submit">Setup</Button>
      </form>
    </main>
  );
}
