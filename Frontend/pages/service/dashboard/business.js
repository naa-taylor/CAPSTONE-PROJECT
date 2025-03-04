import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function BusinessDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "business") {
      router.push("/service/login");
    }
  }, [session, status]);

  if (status === "loading") return <p>Loading...</p>;

  return <h1>Welcome, Business User!</h1>;
}
