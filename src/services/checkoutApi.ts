"use server";
import { ShippingAddress } from "@/interfaces/checkout";
import { getToken } from "@/lib/getToken";

export async function createOrder(body: ShippingAddress, cartId: string) {
  const token = await getToken();
  const paymentMethod = body.paymentMethod;
  console.log("paymentMethod", paymentMethod);

  const URL =
    paymentMethod === "cash"
      ? `${process.env.API_BASE_URL}/api/v1/orders/${cartId}`
      : `${process.env.API_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        shippingAddress: {
          details: body.details,
          phone: body.phone,
          city: body.city,
          paymentMethod: body.paymentMethod,
        },
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to create order");
    }
    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      data,
      message: "Order created successfully",
      url: body.paymentMethod === "card" ? data?.session?.url : "/allorders",
    };
  } catch (error) {
    return {
      ok: false,
      error,
      message: "Failed to create order",
      url: "/cart",
    };
  }
}
