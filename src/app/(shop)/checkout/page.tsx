"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/schemas/validationSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ValidationError from "@/components/shared/ValidationError";
import { Controller, useForm } from "react-hook-form";
import { ShippingAddress } from "@/interfaces/checkout";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useTransition } from "react";
import { createOrder } from "@/services/checkoutApi";

export default function Checkout() {
  const { cartItems, fetchCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ShippingAddress>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cash",
    },
    mode: "onChange",
    resolver: zodResolver(addressSchema),
  });
  async function onSubmit(payload: ShippingAddress) {
    startTransition(async () => {
      try {
        const res = await createOrder(payload, cartItems?.cartId as string);
        console.log(res);

        if (res?.ok) {
          if (res?.url === "/allorders") {
            toast.success(res?.message, {
              position: "top-center",
            });
          }
          setValue("details", "");
          setValue("city", "");
          setValue("phone", "");
          setValue("paymentMethod", "cash");
          fetchCart();
          router.push(res?.url);
        } else {
          toast.error(res?.message, {
            position: "top-center",
          });
          router.push(res?.url);
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
        <h1 className="text-center mb-5 text-2xl font-bold">
          Checkout Details
        </h1>
        <form
          className="mx-auto max-w-md  flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-3">
            <Label htmlFor="details">Deatils:</Label>
            <Input id="details" {...register("details")} />
            {errors?.details?.message && (
              <ValidationError message={errors?.details?.message} />
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="city">City:</Label>

            <Input id="city" {...register("city")} />
            {errors?.city?.message && (
              <ValidationError message={errors?.city?.message} />
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone:</Label>
            <Input id="phone" {...register("phone")} />
            {errors?.phone?.message && (
              <ValidationError message={errors?.phone?.message} />
            )}
          </div>
          <div className="grid gap-3">
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors?.paymentMethod?.message && (
              <ValidationError message={errors?.paymentMethod?.message} />
            )}
          </div>

          <Button disabled={isPending} type="submit" className="cursor-pointer">
            Checkout
          </Button>
        </form>
      </div>
    </section>
  );
}
