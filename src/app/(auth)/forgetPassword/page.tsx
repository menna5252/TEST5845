"use client";
import ValidationError from "@/components/shared/ValidationError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ForgetPasswordPayload } from "@/interfaces/auth";
import { forgetPassSchema } from "@/schemas/validationSchemas";
import { forgetPassword } from "@/services/forgetPasswordApis";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgetPasswordPayload>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPassSchema),
  });
  async function onSubmit(payload: ForgetPasswordPayload) {
    startTransition(async () => {
      try {
        const res = await forgetPassword(payload);
        console.log(res);

        if (res?.statusMsg === "success") {
          toast.success(res?.message, {
            position: "top-center",
          });
          setValue("email", "");
          router.push("/verifyCode");
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
        <p className="text-center mb-5 text-2xl font-semibold">
          Enter your email to reset your password
        </p>
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
          <div className="flex justify-between items-center">
            <Button className="cursor-pointer" disabled={isPending} type="submit">
              Send code
            </Button>
            <Link href="/login" className="underline">
              Return to login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
