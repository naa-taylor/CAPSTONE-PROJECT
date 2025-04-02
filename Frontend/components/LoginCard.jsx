import React, { useState } from "react";
import { Button, Input, Card } from "@heroui/react";
import { signIn } from "next-auth/react";

const LoginCard = () => {
  const [userType, setUserType] = useState("client");

  return (
    <div className="flex justify-center items-center py-20 bg-gray-100">
      <Card className="p-6 w-96 shadow-lg bg-white">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <p className="text-center text-gray-500">Choose your account type</p>

        <div className="flex justify-between my-4">
          <Button
            variant={userType === "client" ? "solid" : "bordered"}
            onPress={() => setUserType("client")}
          >
            Client
          </Button>
          <Button
            variant={userType === "business" ? "solid" : "bordered"}
            onPress={() => setUserType("business")}
          >
            Business
          </Button>
        </div>

        <Input type="email" placeholder="Enter your email" className="mt-4" />
        <Input type="password" placeholder="Enter your password" className="mt-4" />

        <Button
          color="primary"
          className="w-full mt-4"
          onPress={() => signIn("credentials", { role: userType })}
        >
          Continue as {userType === "client" ? "Client" : "Business"}
        </Button>

        <Button
          color="danger"
          variant="bordered"
          className="w-full mt-4"
          onPress={() => signIn("google")}
        >
          Continue with Google
        </Button>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account? <a href="/signup" className="text-primary">Sign up</a>
        </p>
      </Card>
    </div>
  );
};

export default LoginCard;