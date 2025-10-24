'use client';

import type { ColumnDef } from '@tanstack/react-table';

import DataTable from '@/components/DataTable';

export interface Payment {
  id: string;
  amount: number;
  status: 'failed' | 'pending' | 'processing' | 'success';
  email: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <div>${row.getValue('amount')}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => <button type="button">View</button>,
  },
];
const Users = () => {
  const data: Payment[] = [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
  ];
  return <DataTable data={data} columns={columns} />;
};

export default Users;
