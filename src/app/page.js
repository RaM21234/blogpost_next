"use client";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  router.push("/pages/login");
  return <div>Loading...</div>;
}
