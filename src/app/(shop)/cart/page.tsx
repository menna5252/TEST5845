"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";
import {
  removeAllCart,
  removeItemFromCart,
  updateQuantity,
} from "@/services/cartApi";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle, X } from "lucide-react";

export default function CartPage() {
  const [_, startTransition] = useTransition();
  const { cartItems, setCartItems, fetchCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null
  );
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );

  async function handleRemoveAll() {
    try {
      setIsLoading(true);
      const res = await removeAllCart();
      if (res?.message === "success") {
        toast.success("All items removed from cart", {
          position: "top-center",
        });
        fetchCart();
        setCartItems(null);
      } else {
        toast.error("Failed to remove items from cart", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  
  async function handleDeleteItem(productId: string) {
    setDeletingProductId(productId);

    startTransition(async () => {
      const res = await removeItemFromCart(productId);
      if (res?.status === "success") {
        toast.success("Item removed from cart", { position: "top-center" });
        await fetchCart();
      } else {
        toast.error("Failed to remove item from cart", {
          position: "top-center",
        });
      }
      setDeletingProductId(null);
    });
  }

  async function handleUpdateQuantity(productId: string, count: string) {
    setUpdatingProductId(productId);
    startTransition(async () => {
      const res = await updateQuantity(productId, count);
      if (res?.status === "success") {
        toast.success("Quantity updated", { position: "top-center" });
        await fetchCart();
      } else {
        toast.error("Failed to update quantity", {
          position: "top-center",
        });
      }
      setUpdatingProductId(null);
    });
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        {(isLoading || !cartItems) ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          cartItems &&
          (cartItems?.numOfCartItems > 0 ? (
            <>
              {/* table */}
              <section className="mb-20">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">SubTotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems?.data?.products?.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-4 relative">
                            <Image
                              src={product.product.imageCover}
                              alt={product.product.title}
                              width={54}
                              height={54}
                            />
                            <Badge
                              onClick={() =>
                                handleDeleteItem(product.product._id)
                              }
                              variant={"destructive"}
                              className="cursor-pointer absolute -top-0 -end-.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            >
                              {deletingProductId === product.product._id ? (
                                <LoaderCircle className="animate-spin size-3" />
                              ) : (
                                <X className="size-3" />
                              )}
                            </Badge>
                            <p className="line-clamp-1">{product.product.title}</p>
                          </div>
                        </TableCell>
                        <TableCell>EGP {product.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              className="cursor-pointer"
                              variant={"outline"}
                              size={"sm"}
                              onClick={() =>
                                handleUpdateQuantity(
                                  product.product._id,
                                  (product.count - 1).toString()
                                )
                              }
                              disabled={
                                updatingProductId === product.product._id
                              }
                            >
                              -
                            </Button>
                            {updatingProductId === product.product._id ? (
                              <LoaderCircle className="animate-spin size-3" />
                            ) : (
                              product.count
                            )}
                            <Button
                              className="cursor-pointer"
                              variant={"outline"}
                              size={"sm"}
                              onClick={() =>
                                handleUpdateQuantity(
                                  product.product._id,
                                  (product.count + 1).toString()
                                )
                              }
                              disabled={
                                updatingProductId === product.product._id
                              }
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          EGP {product.price * product.count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>

                  <Button
                    variant={"destructive"}
                    className="cursor-pointer"
                    onClick={handleRemoveAll}
                  >
                    Remove All
                  </Button>
                </div>
              </section>
              <section>
                <div className="flex gap-8">
                  <div className="w-5/12">
                    <div className="flex justify-between">
                      <Input placeholder="Coupon Code" className="w-1/2" />
                      <Button variant={"destructive"}>Apply Coupon</Button>
                    </div>
                  </div>
                  <div className="w-5/12 border border-gray-500 px-6 py-8">
                    <h3 className="font-medium">Cart Total</h3>
                    <ul className="mt-4 space-y-2 divide-y">
                      <li className="flex justify-between ">
                        <p>SubTotal:</p>
                        <span>EGP {cartItems?.data?.totalCartPrice}</span>
                      </li>
                      <li className="flex justify-between">
                        <p>Shipping:</p>
                        <span>Free</span>
                      </li>
                      <li className="flex justify-between">
                        <p>Total:</p>
                        <span>EGP {cartItems?.data?.totalCartPrice}</span>
                      </li>
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={"destructive"}
                      asChild
                    >
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Your Cart is Empty
              </h2>
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
