"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignUpForm from "@/components/Forms/SignUpForm";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <SignUpForm />
    </main>
  );
}
