"use client";

import { resetCodeSchema } from "@/schemas/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { VerifyResetCodePayload } from "@/interfaces/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ValidationError from "@/components/shared/ValidationError";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { verifyCode } from "@/services/forgetPasswordApis";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyResetCodePayload>({
    mode: "onChange",
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });
  async function onSubmit(payload: VerifyResetCodePayload) {
    startTransition(async () => {
      try {
        const res = await verifyCode(payload);
        console.log(res);

        if (res?.statusMsg === "success") {
          toast.success(res?.message, {
            position: "top-center",
          });
          setValue("resetCode", "");
          router.push("/resetPassword");
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
            Enter reset code sent to your email
          </p>
          <p>It is valid for 10 minutes only</p>
        </div>
        <form
          className="mx-auto max-w-md  flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-3">
            <Label htmlFor="resetCode">Reset code:</Label>
            <Input id="resetCode" {...register("resetCode")} />
            {errors?.resetCode?.message && (
              <ValidationError message={errors?.resetCode?.message} />
            )}
          </div>
          <div className="flex justify-between items-center">
            <Button
              className="cursor-pointer"
              disabled={isPending}
              type="submit"
            >
              Verify code
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
