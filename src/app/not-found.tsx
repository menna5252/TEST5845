import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">Your visited page not found. You may go home page.</p>
        <Button className="mt-6" variant="destructive" asChild>
            <Link href="/">Go to Home</Link>
        </Button>
    </div>
  )
}