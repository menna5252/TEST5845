"use client";
import React, { useState } from "react";
import login from "@/assets/images/login.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/validationSchemas";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/types/types";
import { Eye, EyeOffIcon } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginPayload) {
    setIsLogging(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("Logged in successfully", {
          position: "top-center",
        });
        console.log(res?.url);
        
        router.push(res?.url || "/");
      } else {
        toast.error(res?.error || "Something went wrong", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLogging(false);
    }
  }

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
              Log in to Exclusive
            </h1>
            <p className="text-center">Enter your details below</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center">
                  <Button
                    type="submit"
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={isLogging}
                  >
                    {isLogging ? "Logging in..." : "Login"}
                  </Button>
                  <Link
                    href="/forgetPassword"
                    className="text-red-500 underline"
                  >
                    Forget Password
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
