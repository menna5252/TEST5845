'use server'

import { getUserId } from "@/lib/getToken";

export async function getUserOrders() {
  const userId = await getUserId();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/orders/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}