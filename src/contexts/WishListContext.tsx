
import { WishListResponse } from "@/interfaces/wishlist";
import { getUserWishlist } from "@/services/wishlistApi";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
type WishListContextType = {
  wishlistItems: WishListResponse | null;
  setWishListItems: React.Dispatch<
    React.SetStateAction<WishListResponse | null>
  >;
  fetchWishList: () => Promise<void>;
};
const WishListContext = createContext<WishListContextType | null>(null);

export function WishListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [wishlistItems, setWishListItems] = useState<WishListResponse | null>(
    null
  );
  const { status } = useSession();

  async function fetchWishList() {
    const wishListData = await getUserWishlist();
    setWishListItems(wishListData);
  }
  useEffect(() => {
    if (status === "authenticated") {
      fetchWishList();
    }
    if (status === "unauthenticated") {
      setWishListItems(null);
    }
  }, [status]);
  return (
    <WishListContext.Provider value={{ wishlistItems, setWishListItems,fetchWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

//we could useContext in any component to access the wishlist context
//but to make sure that we are using it inside the provider we will create a custom hook
export function useWishList() {
  const wishListContext = useContext(WishListContext);
  if (!wishListContext) {
    throw new Error(
      "useWishList must be used within a WishListContextProvider"
    );
  }
  return wishListContext;
}
