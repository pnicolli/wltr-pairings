'use client';

import { ColumnDef } from '@tanstack/react-table';
import { type Standing } from '@/lib/standings';

export const columns: ColumnDef<Standing>[] = [
  {
    accessorKey: 'rank',
    header: 'Rank',
  },
  {
    accessorKey: 'player1',
    header: 'Name',
  },
  {
    accessorKey: 'matchPoints',
    header: 'Points',
  },
  {
    accessorKey: 'opponentMatchWinPercentage',
    header: 'OMW',
  },
  {
    accessorKey: 'gameWinPercentage',
    header: 'Game Win',
  },
  {
    accessorKey: 'opponentGameWinPercentage',
    header: 'OGW',
  },
];
