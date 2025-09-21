"use client";
import { SessionProvider } from "next-auth/react";
import { CartContextProvider } from "./contexts/CartContext";
import { WishListContextProvider } from "./contexts/WishListContext";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishListContextProvider>
          {children}
        </WishListContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
