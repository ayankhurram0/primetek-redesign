import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | PrimeTek Services",
  description: "Secure login to your PrimeTek pharmacy dashboard.",
};

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your pharmacy performance dashboard and compliance alerts."
      type="login"
    >
      <LoginForm />
    </AuthLayout>
  );
}
