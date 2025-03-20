// import Link from 'next/link';
import { signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function AdminHeader() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        {/* <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="personal">Player</Link>
            </li>
            <li>
              <Link href="pairings">Pairings</Link>
            </li>
            <li>
              <Link href="standings">Standings</Link>
            </li>
          </ul>
        </nav> */}
        <form
          className="ms-auto"
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button variant="link" className="text-background" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
    </header>
  );
}
