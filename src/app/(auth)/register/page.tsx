"use client";
import login from "@/assets/images/login.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/validationSchemas";

import { RegisterPayload } from "@/types/types";
import { handleRegister } from "@/services/registerAPI";
import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOffIcon } from "lucide-react";
const formState = {
  success: false,
  error: {},
  message: null,
};

export default function Register() {
  //formAction is a function that will trigger handleRegister which has the api call
  const [action, formAction] = useActionState(handleRegister, formState);
  const router = useRouter();
  // const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  console.log("formActions", action);

  // async function onSubmit(formData: RegisterPayload) {
  //   const responseData = handleRegister(formData);
  //   console.log(responseData);
  // }

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
        });
      }
      if (action.success && action.message) {
        router.push("/login");
        toast.success("Registered successfully, Please login", {
          position: "top-center",
        });
      }
    }
  }, [action, router]);
  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Image
              src={login}
              alt="login"
              className="w-full h-[37.50rem]"
              width={919}
              height={706}
            />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4 py-8">
            <h1 className="font-medium text-4xl mb-4 text-center">
              Create new account in Exclusive
            </h1>
            <p className="text-center">Enter your details below</p>
            <Form {...form}>
              <form
                action={formAction}
                // onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="gehad alaa" {...field} />
                      </FormControl>
                      <FormMessage>
                        {action.error?.name && action.error?.name[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@.com" {...field} />
                      </FormControl>
                      <FormMessage>
                        {action.error?.email && action.error?.email[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="********"
                            {...field}
                            type={showPassword ? "text" : "password"}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOffIcon size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage>
                        {action.error?.password && action.error?.password[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* repassword  */}
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="********"
                            {...field}
                            type={showRePassword ? "text" : "password"}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowRePassword(!showRePassword)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        >
                          {showRePassword ? (
                            <EyeOffIcon size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage>
                        {action.error?.rePassword &&
                          action.error?.rePassword[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="0123456789" {...field} type="tel" />
                      </FormControl>
                      <FormMessage>
                        {action.error?.phone && action.error?.phone[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center">
                  <Button
                    type="submit"
                    variant="destructive"
                    className="cursor-pointer"
                    // disabled={isLogging}
                  >
                    {/* {isLogging ? "Logging in..." : "Login"} */}
                    Sign Up
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
