import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserDropDown(userName:{userName:string}) {
    console.log(userName.userName);
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hello,{userName.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
                <DropdownMenuItem>
          <Link href="/allorders">Your Orders</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
