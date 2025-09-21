'use server';
import { AuthResponse } from "@/interfaces/auth";
import { UpdateUserDataPayload } from "@/interfaces/updateUserData";
import { getToken } from "@/lib/getToken";

export async function updateUserData(body: UpdateUserDataPayload): Promise<AuthResponse> {
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/users/updateMe`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          email: body.email,
          phone: body.phone,
          name: body.name,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.errors.msg);
    }
    // return data
    return {
      message: "Data updated successfully",
      statusMsg: "success",
    };
  } catch (error) {
    // return error
    return {
      message: (error as Error).message,
      statusMsg: "error",
    };
  }
}