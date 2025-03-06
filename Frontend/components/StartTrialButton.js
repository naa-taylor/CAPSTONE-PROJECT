import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@heroui/react";

export default function StartTrialButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleStartTrial = () => {
    if (status === "loading") return; // Prevent navigation while checking session

    if (!session) {
      // If not signed in, send to login page first
      signIn();
    } else {
      // If signed in, send to onboarding
      router.push("/service/onboarding");
    }
  };

  return (
    <Button
      color="secondary"
      size="lg"
      className="bg-black text-white px-6 py-3 rounded-lg mt-4"
      onPress={handleStartTrial}
    >
      Start Free Trial
    </Button>
  );
}
