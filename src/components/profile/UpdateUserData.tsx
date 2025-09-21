"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDataSchema } from "@/schemas/validationSchemas";
import ValidationError from "../shared/ValidationError";
import { UpdateUserDataPayload } from "@/interfaces/updateUserData";
import { updateUserData } from "@/services/updateUserData";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function UpdateUserData() {
  const { data: sessionData } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserDataPayload>({
    mode: "onChange",
    resolver: zodResolver(updateDataSchema),
  });
  useEffect(() => {
    if (sessionData) {
      setValue("name", sessionData?.user?.name);
      setValue("email", sessionData?.user?.email);
    }
  }, [sessionData]);
async function onSubmit(payload: UpdateUserDataPayload) {
  startTransition(async () => {
    try {
      // Remove email if it's the same as the session email
      const finalPayload = { ...payload };
      if (finalPayload.email === sessionData?.user?.email) {
        delete finalPayload.email;
      }

      const res = await updateUserData(finalPayload);
      console.log(res);

      if (res?.statusMsg === "success") {
        toast.success(res?.message, {
          position: "top-center",
        });
        signOut({ callbackUrl: "/login" });
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <div className="grid gap-3">
        <Label htmlFor="name">Name:</Label>
        <Input id="name" placeholder="John Doe" {...register("name")} />
        {errors?.name?.message && (
          <ValidationError message={errors?.name?.message} />
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          placeholder="test@example.com"
          {...register("email")}
        />
        {errors?.email?.message && (
          <ValidationError message={errors?.email?.message} />
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="phone">Phone:</Label>
        <Input id="phone" placeholder="0123456789" {...register("phone")} />
        {errors?.phone?.message && (
          <ValidationError message={errors?.phone?.message} />
        )}
      </div>
      <Button type="submit" disabled={isPending} className="cursor-pointer">
        Save changes
      </Button>
    </form>
  );
}
