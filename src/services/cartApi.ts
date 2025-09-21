"use server";

import { getToken } from "@/lib/getToken";

export async function getUserCart() {
  const token = await getToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      headers: {
        "Content-Type": "application/json",
        token: token as string,
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

export async function removeAllCart() {
  const token = await getToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
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

export async function AddProductToCart(productId: string) {
  const token = await getToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
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

export async function removeItemFromCart(productId: string) {
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
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

export async function updateQuantity(productId: string, count: string) {
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
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
