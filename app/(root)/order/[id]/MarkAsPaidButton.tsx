'use client';

import { Button } from '@/components/ui/button';
import { updateOrderToPaidCOD } from '@/lib/actions/order.actions';
import { useTransition } from 'react';
import { toast } from 'sonner';

function MarkAsPaidButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToPaidCOD(id);
          if (res.success) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? 'processing...' : 'Mark As Paid'}
    </Button>
  );
}

export default MarkAsPaidButton;
