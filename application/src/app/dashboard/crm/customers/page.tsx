'use client';

// Components
import { Card, Table } from '@/components/ui';

export default function CustomersPage() {
  return (
    <Card className="h-full" classNames={{ body: '!p-0' }}>
      <Table />
    </Card>
  );
}
