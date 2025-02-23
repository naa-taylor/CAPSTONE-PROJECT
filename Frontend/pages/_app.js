import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react"; // Import SessionProvider
import "../styles/globals.css"; // Ensure Tailwind works

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </SessionProvider>
  );
}

// Redirect unauthenticated users to login
function AuthGuard({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [status, router]);

  return <>{children}</>; // Only render children if authenticated or on the login page
}
