"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/Forms/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <LoginForm />
    </main>
  );
}
