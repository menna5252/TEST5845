import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { updateQuantity } from "@/services/cartApi";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function QuantityUpdate({
  productId,
  itemQuantity,
  setItemQuantity,
}: {
  productId: string;
  itemQuantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [_, startTransition] = useTransition();
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null
  );
  const { fetchCart } = useCart();

  async function handelUpdateQuantity(productId: string, count: string) {
    setUpdatingProductId(productId);
    startTransition(async () => {
      const res = await updateQuantity(productId, count);
      if (res?.status === "success") {
        toast.success("Quantity updated", { position: "top-center" });
        await fetchCart();
        setItemQuantity(parseInt(count));
      } else {
        toast.error("Failed to update quantity", {
          position: "top-center",
        });
      }
      setUpdatingProductId(null);
    });
  }
  return (
    <>
      <Button
        className="cursor-pointer"
        variant={"outline"}
        size={"sm"}
        onClick={() =>
          handelUpdateQuantity(productId, (itemQuantity - 1).toString())
        }
        disabled={updatingProductId === productId}
      >
        -
      </Button>
      {updatingProductId === productId ? (
        <LoaderCircle className="animate-spin size-3" />
      ) : (
        itemQuantity
      )}
      <Button
        className="cursor-pointer"
        variant={"outline"}
        size={"sm"}
        onClick={() =>
          handelUpdateQuantity(productId, (itemQuantity + 1).toString())
        }
        disabled={updatingProductId === productId}
      >
        +
      </Button>
    </>
  );
}
