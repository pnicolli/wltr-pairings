import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <nav>
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
        </nav>
      </div>
    </header>
  );
}
