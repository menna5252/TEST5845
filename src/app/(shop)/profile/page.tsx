"use client";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <p className="mb-6 text-end">
          Welcome!
          <span className="ml-2 text-red-500">{sessionData?.user?.name}</span>
        </p>
        <ProfileTabs  />
        </div>
    </section>
  );
}
