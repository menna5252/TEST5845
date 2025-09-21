"use server";

import { getToken } from "@/lib/getToken";

export async function getUserWishlist() {
  const token = await getToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, {
      headers: {
        token: token as string,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    console.log("ff",data);
    
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}

export async function removeItemFromWishList(productId: string) {
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );
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
export async function AddProductToWishList(productId: string) {
  const token = await getToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
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