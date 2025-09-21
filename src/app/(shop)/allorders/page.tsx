import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderResponse } from "@/interfaces/orders";
import { getUserOrders } from "@/services/orders";
import Image from "next/image";
import Link from "next/link";

export default async function AllOrders() {
  const orderData: OrderResponse[] = await getUserOrders();
  if (orderData) {
    console.log("orderData", orderData);
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your orders</h1>
        {orderData && orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={order?._id}>
              <Accordion
                key={order?._id}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={order?._id}>
                  <AccordionTrigger>
                    <div className="flex items-center  gap-4">
                      <p> Order #{index + 1}</p>
                      {order?.isDelivered ? (
                        <span className="bg-green-500 p-1 rounded">Delivered successfully</span>
                      ) : (
                        <span className="bg-red-300 p-1 rounded">Not Delivered yet</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <section>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">
                              SubTotal
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order?.cartItems?.map((product) => (
                            <TableRow key={product?._id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-4">
                                  <Image
                                    src={product?.product?.imageCover}
                                    alt={product?.product?.title}
                                    width={54}
                                    height={54}
                                  />

                                  <p>{product?.product?.title}</p>
                                </div>
                              </TableCell>
                              <TableCell>EGP {product?.price}</TableCell>
                              <TableCell>{product?.count}</TableCell>
                              <TableCell className="text-right">
                                EGP {product?.price * product?.count}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </section>
                    <div>
                      <p className="font-semibold text-right">
                        Total: EGP {order?.totalOrderPrice}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-center">
              You have no orders yet
            </h2>
            <Button variant="outline" asChild>
              <Link href="/products">Explore our products</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
