import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

export default function Login() {
  return (
    <main className="px-2">
      <form
        action={async () => {
          'use server';
          await signIn('discord', { redirectTo: '/admin' });
        }}
      >
        <Button variant="outline" type="submit">
          Signin with Discord
        </Button>
      </form>
    </main>
  );
}
