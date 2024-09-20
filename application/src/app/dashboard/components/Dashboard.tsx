"use client";

// Libraries
import { OrganizationList } from "@clerk/nextjs";
import React from "react";

// Components
import { Button } from "@/components/ui";

// Utils
import { tryCatch } from "@/lib";

export default function Dashboard() {
  const onThrowError = tryCatch(async () => {
    setTimeout(() => {
      console.log("Throwing Error");
      const a: any = {};

      console.log(a.b.c.d);
    }, 1000);
  });

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/dashboard/organizations/:slug"
        afterSelectPersonalUrl="/user/:id"
        afterSelectOrganizationUrl="/dashboard/organizations/:slug"
      />

      <Button onClick={onThrowError}>Throw error</Button>
    </div>
  );
}
