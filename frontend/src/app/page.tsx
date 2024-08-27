"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <p>Loading...</p>;
}
