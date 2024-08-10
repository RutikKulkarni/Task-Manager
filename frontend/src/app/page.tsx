"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Welcome to the  Page</h1>
    </main>
  );
}
