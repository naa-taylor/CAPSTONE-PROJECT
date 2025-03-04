import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/service"); // Redirects to /service
  }, []);

  return <p>Redirecting...</p>;
}
