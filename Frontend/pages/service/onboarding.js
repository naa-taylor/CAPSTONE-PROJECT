import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      signIn(); // Redirect to sign-in page if not logged in
    }
  }, [session, status]);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome to the Business Setup</h1>
      <p>Let's get started with setting up your business profile.</p>
    </div>
  );
}
