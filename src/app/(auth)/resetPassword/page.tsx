"use client";

import ValidationError from "@/components/shared/ValidationError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordPayload } from "@/interfaces/auth";
import { resetPassSchema } from "@/schemas/validationSchemas";
import { resetPassword } from "@/services/forgetPasswordApis";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    mode: "onChange",
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPassSchema),
  });
  async function onSubmit(payload: ResetPasswordPayload) {
    startTransition(async () => {
      try {
        const res = await resetPassword(payload);
        console.log(res);

        if (res?.statusMsg === "success") {
          toast.success(res?.message, {
            position: "top-center",
          });
          setValue("email", "");
          setValue("newPassword", "");
          router.push("/login");
        } else {
          toast.error(res?.message, {
            position: "top-center",
          });
        }
      } catch (err) {
        console.log(err);
      }
      console.log("payload", payload);
    });
  }
  return (
    <section className="py-10">
      <div className="container  mx-auto px-8">
        <div className="flex flex-col items-center mb-4">
          <p className="text-2xl font-semibold">
            Add a new password to your account
          </p>
        </div>
        <form
          className="mx-auto max-w-md  flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-3">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" {...register("email")} />
            {errors?.email?.message && (
              <ValidationError message={errors?.email?.message} />
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="newPassword">New Password:</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors?.newPassword?.message && (
              <ValidationError message={errors?.newPassword?.message} />
            )}
          </div>
          <div className="flex justify-between items-center">
            <Button
              className="cursor-pointer"
              disabled={isPending}
              type="submit"
            >
              Update Password
            </Button>
            <Link href="/forgetPassword" className="underline">
              Enter your email again
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
