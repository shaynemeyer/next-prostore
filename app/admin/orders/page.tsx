import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/lib/actions/order.actions";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import DeleteDialog from "@/components/shared/delete-dialog/DeleteDialog";
import { deleteOrder } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
  title: "Admin Orders",
};

async function OrdersPage(props: {
  searchParams: Promise<{ page: string; query: string }>;
}) {
  const { page = "1", query: searchText } = await props.searchParams;

  requireAdmin();

  const orders = await getAllOrders({
    page: Number(page),
    query: searchText,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders</h1>
        {searchText && (
          <div>
            Filtered by <i>&quot;{searchText}&quot;</i>{" "}
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        {orders.data.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>BUYER</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>PAID</TableHead>
                  <TableHead>DELIVERED</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{formatId(order.id)}</TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateTime}
                    </TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>
                      {order.isPaid && order.paidAt
                        ? formatDateTime(order.paidAt).dateTime
                        : "Not Paid"}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered && order.deliveredAt
                        ? formatDateTime(order.deliveredAt).dateTime
                        : "Not Delivered"}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/order/${order.id}`}>Details</Link>
                      </Button>
                      <DeleteDialog id={order.id} action={deleteOrder} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {orders.totalPages > 1 && (
              <Pagination
                page={Number(page) || 1}
                totalPages={orders?.totalPages}
              />
            )}
          </>
        ) : (
          <div>There are no orders available at this time.</div>
        )}
      </div>
    </div>
  );
}
export default OrdersPage;
