import { Card, Button } from "@heroui/react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-96 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Get started</h2>
        <p className="text-center text-gray-500">
          Create an account or log in to book and manage your appointments.
        </p>

        <Input type="email" placeholder="Email" className="mt-4" />

        <Button color="primary" className="w-full mt-4">
          Continue
        </Button>

        <div className="flex items-center my-4">
          <Divider className="flex-1" />
          <span className="mx-2 text-gray-500">OR</span>
          <Divider className="flex-1" />
        </div>

        <Button
          color="danger"
          variant="bordered"
          className="w-full"
          onClick={() => signIn("google")}
        >
          Continue with Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
