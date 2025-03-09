'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components//ui/button';
import { type Pairing } from '@/lib/pairings';

export const columns: ColumnDef<Pairing>[] = [
  {
    accessorKey: 'table',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Table
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'player1',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Player 1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'player1Points',
    header: 'Points',
  },
  {
    accessorKey: 'player2',
    header: 'Player 2',
  },
  {
    accessorKey: 'player2Points',
    header: 'Points',
  },
];
