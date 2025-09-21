"use server";

import { UpdatePasswordPayload } from "@/interfaces/auth";
import { getToken } from "@/lib/getToken";

export async function updatePassword(body: UpdatePasswordPayload) {
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          currentPassword: body.currentPassword,
          password: body.password,
          rePassword: body.rePassword,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update password");
    }
    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
}
