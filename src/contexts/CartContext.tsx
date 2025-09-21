import { CartResponse } from "@/interfaces/cart";
import { getUserCart } from "@/services/cartApi";
import { createContext, useContext, useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
type CartContextType = {
  cartItems: CartResponse | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartResponse | null>>;
  fetchCart: () => Promise<void>;
  isCartPending: boolean;
};
const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartResponse | null>(null);
const [isCartPending, startTransition] = useTransition();
  const { status } = useSession();
  async function fetchCart() {
    const cartData = await getUserCart();
    setCartItems(cartData);
  }
  useEffect(() => {
    if (status === "authenticated") {
      startTransition(() => {
        fetchCart();
      });
    }
    if (status === "unauthenticated") {
      setCartItems(null);
    }
  }, [status]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems,fetchCart,isCartPending }}>
      {children}
    </CartContext.Provider>
  );
}

//we could useContext in any component to access the cart context
//but to make sure that we are using it inside the provider we will create a custom hook
export function useCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return cartContext;
}
