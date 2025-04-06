import { Button } from '@/components/ui/button';
import { deliverOrder } from '@/lib/actions/order.actions';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

function MarkAsDeliveredButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await deliverOrder(id);
          if (res.success) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? 'processing...' : 'Mark As Delivered'}
    </Button>
  );
}

export default MarkAsDeliveredButton;
