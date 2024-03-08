"use client";

import { siteConfig } from "@/config/site";
import { Save } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  function doReset() {
    if (pathname !== "/") router.push("/");
  }

  return (
    <div
      onClick={doReset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold"
    >
      <Save size={35} />
      <div>{siteConfig.name}</div>
    </div>
  );
}
