'use server'
import {
  AuthResponse,
  ForgetPasswordPayload,
  ResetPasswordPayload,
  VerifyResetCodePayload,
} from "@/interfaces/auth";

export async function forgetPassword(
  body: ForgetPasswordPayload
): Promise<AuthResponse> {
  try {
    const res = await fetch(
  `${process.env.API_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message);
    }
    return {
      message: data?.message,
      statusMsg: data?.statusMsg,
    };
  } catch (error) {
    console.log(error);
    return {
      message: (error as Error).message,
      statusMsg: "error",
    };
  }
}

export async function verifyCode(
  body: VerifyResetCodePayload
): Promise<AuthResponse> {
  try {
    const res = await fetch(
  `${process.env.API_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetCode: body.resetCode,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message);
    }
    return {
      message: "Code verified successfully",
      statusMsg: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: (error as Error).message,
      statusMsg: "error",
    };
  }
}

export async function resetPassword(
  body: ResetPasswordPayload
): Promise<AuthResponse> {
  try {
    const res = await fetch(
  `${process.env.API_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          newPassword: body.newPassword,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message);
    }
    return {
      message: "Password reset successfully,please login",
      statusMsg: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: (error as Error).message,
      statusMsg: "error",
    };
  }
}