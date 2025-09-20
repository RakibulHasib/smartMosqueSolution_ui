"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loader message="Checking Authentication..." />;
  }

  return <>{children}</>;
}
