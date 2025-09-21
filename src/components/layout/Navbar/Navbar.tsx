"use client";

import { Heart, MenuIcon, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import UserDropDown from "@/components/shared/UserDropDown";
import { useWishList } from "@/contexts/WishListContext";
const links = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/products",
    title: "Products",
  },
  {
    path: "/categories",
    title: "Categories",
  },
  {
    path: "/brands",
    title: "Brands",
  },
];
export default function Navbar() {
  const { cartItems, isCartPending } = useCart();
  console.log(cartItems);
  const { wishlistItems } = useWishList();

  const pathName = usePathname();
  const { data: sessionData, status } = useSession();
  //statuses can be "loading","authenticated","unauthenticated"
  //if(status==="loading") show loader
  // if(status==="unauthenticated") show login button
  // if(status==="authenticated") show user profile and logout button
  return (
    <section className="py-4">
      <div className="container mx-auto px-8">
      
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                Exclusive
              </span>
            </Link>
            {status === "authenticated" && (
              <NavigationMenu className="hidden lg:block">
                <NavigationMenuList>
                  {links.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.path}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          link.path === pathName ? "underline " : ""
                        )}
                      >
                        {link.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
            <div className="hidden items-center gap-4 lg:flex">
              {(status === "loading" || isCartPending) ? (
                <span>Loading...</span>
              ) : status === "unauthenticated" ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Start for free</Link>
                  </Button>
                </>
              ) : (
                status === "authenticated" && (
                  <div className="flex items-center gap-4">
                    <Link href="/wishlist" className="relative">
                      <Badge className="absolute -top-4 -end-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                        {wishlistItems?.count || 0}
                      </Badge>
                      <Heart className="size-4" />
                    </Link>
                    <Link href="/cart" className="relative">
                      <Badge className=" absolute -top-4 -end-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                        {cartItems?.numOfCartItems || 0}
                      </Badge>
                      <ShoppingCart className="size-4" />
                    </Link>
                    <UserDropDown
                      userName={sessionData?.user?.name.split(" ")[0]}
                    />
                  </div>
                )
              )}
            </div>
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="text-lg font-semibold tracking-tighter">
                        Exclusive
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  {status === "authenticated" && (
                    <div className="flex flex-col gap-6">
                      {links.map((link, index) => (
                        <Link
                          key={index}
                          href={link.path}
                          className={cn(
                            "text-lg font-semibold",
                            link.path === pathName ? "underline " : ""
                          )}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 flex flex-col gap-4">
                    {(status === "loading" || isCartPending) ? (
                      <span>Loading...</span>
                    ) : status === "unauthenticated" ? (
                      <>
                        <Button variant="outline" asChild>
                          <Link href="/login">Sign in</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/register">Start for free</Link>
                        </Button>
                      </>
                    ) : (
                      status === "authenticated" && (
                        <div className="flex items-center gap-4">
                          <Link href="/wishlist" className="relative">
                            <Badge className="absolute -top-4 -end-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                              {wishlistItems?.count || 0}
                            </Badge>
                            <Heart className="size-4" />
                          </Link>
                          <Link href="/cart" className="relative">
                            <Badge className=" absolute -top-4 -end-4 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                              {cartItems?.numOfCartItems || 0}
                            </Badge>
                            <ShoppingCart className="size-4" />
                          </Link>
                          <UserDropDown
                            userName={sessionData?.user?.name.split(" ")[0]}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        
      </div>
    </section>
  );
}
