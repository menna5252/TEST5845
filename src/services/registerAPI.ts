"use server";
import { registerSchema } from "@/schemas/validationSchemas";
import { formState } from "@/types/types";

export async function handleRegister(
  formState: formState,
  formData: FormData
): Promise<formState> {
  console.log("handleRegisterDate", formData);
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };
  //this to send errors from server to client
  const parsedDate = registerSchema.safeParse(formValues);
  // parsedData has error,success,message
  if (!parsedDate.success) {
    return {
      success: false,
      error: parsedDate.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message,
      };
    }
    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    console.log(error);
    return { error: error as object, message: null, success: false };
  }
}
