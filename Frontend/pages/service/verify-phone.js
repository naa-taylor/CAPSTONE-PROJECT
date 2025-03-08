"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Card } from "@heroui/react";

export default function VerifyPhone() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);

  useEffect(() => {
    const phoneFromQuery = searchParams.get("phone");
    if (phoneFromQuery) {
      setPhone(phoneFromQuery);
    }
  }, [searchParams]);

  const handleVerification = () => {
    const enteredCode = code.join("");
    console.log("Verifying phone:", phone, "with code:", enteredCode);
    router.push("/dashboard/client");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-lg bg-white">
        <h2 className="text-center text-2xl font-bold">Confirm Your Phone Number</h2>
        <p className="text-center text-gray-500">Enter the 4-digit code sent to {phone}.</p>

        <div className="flex justify-center mt-4 space-x-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center"
              value={digit}
              onChange={(e) => {
                const newCode = [...code];
                newCode[index] = e.target.value;
                setCode(newCode);
              }}
            />
          ))}
        </div>

        <Button color="primary" className="w-full mt-4" onPress={handleVerification}>
          Continue
        </Button>
      </Card>
    </div>
  );
}
