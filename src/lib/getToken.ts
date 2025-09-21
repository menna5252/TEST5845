"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

async function getDecodedToken() {
    const cookiesStore = await cookies()

  const encodedToken = cookiesStore.get("next-auth.session-token")?.value || cookiesStore.get("__Secure-next-auth.session-token")?.value
  const decodedToken = await decode({
    token: encodedToken!,
    secret: process.env.AUTH_SECRET!,
  });
  return decodedToken;
}
export async function getToken() {
  return (await getDecodedToken())?.token;
}

export async function getUserId() {
  return (await getDecodedToken())?.sub;
}
