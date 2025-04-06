import { Metadata } from 'next';
import { getOrderById } from '@/lib/actions/order.actions';
import { notFound, redirect } from 'next/navigation';
import OrderDetailsTable from './OrderDetailsTable';
import { ShippingAddress } from '@/types';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Order Details',
};

async function OrderDetailsPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;

  const order = await getOrderById(id);

  if (!order) notFound();

  const session = await auth();

  // Redirect the user if they don't own the order
  if (order.userId !== session?.user.id && session?.user.role !== 'admin') {
    return redirect('/unauthorized');
  }

  return (
    <>
      {order && (
        <OrderDetailsTable
          order={{
            ...order,
            shippingAddress: order.shippingAddress as ShippingAddress,
          }}
          paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
        />
      )}
    </>
  );
}

export default OrderDetailsPage;
