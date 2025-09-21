import { Eye, EyeOffIcon } from "lucide-react";
import ValidationError from "../shared/ValidationError";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { UpdatePasswordPayload } from "@/interfaces/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassSchema } from "@/schemas/validationSchemas";
import { updatePassword } from "@/services/updatePassword";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UpdatePassword() {
  const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdatePasswordPayload>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(updatePassSchema),
  });
  async function onSubmit(payload: UpdatePasswordPayload) {
    setIsLogging(true);
    try {
      const res = await updatePassword(payload);
      console.log(res);

      if (res?.ok) {
        toast.success("Password updated", {
          position: "top-center",
        });
        setValue("currentPassword", "");
        setValue("password", "");
        setValue("rePassword", "");
        signOut({ callbackUrl: "/login" });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLogging(false);
    }
    console.log("payload", payload);
  }
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3">
        <Label htmlFor="currentPass">Current password</Label>
        <div className="relative">
          <Input
            id="currentPass"
            type={showPassword ? "text" : "password"}
            {...register("currentPassword")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors?.currentPassword?.message && (
          <ValidationError message={errors?.currentPassword?.message} />
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="newPass">New password</Label>

        <div className="relative">
          <Input
            id="newPass"
            type={showNewPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showNewPassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors?.password?.message && (
          <ValidationError message={errors?.password?.message} />
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="confirmPass">Confirm password</Label>
        <div className="relative">
          <Input
            id="confirmPass"
            type={showRePassword ? "text" : "password"}
            {...register("rePassword")}
          />
          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showRePassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors?.rePassword?.message && (
          <ValidationError message={errors?.rePassword?.message} />
        )}
      </div>
      <Button disabled={isLogging} type="submit" className="cursor-pointer">
        Save password
      </Button>
    </form>
  );
}
