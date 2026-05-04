import { AuthLayout } from "../components/AuthLayout";
import { SignupForm } from "../components/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | PrimeTek Services",
  description: "Create a PrimeTek account to protect your pharmacy revenue and compliance.",
};

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Protect Your Pharmacy" 
      subtitle="Join hundreds of independent pharmacies securing their revenue and compliance today."
      type="signup"
    >
      <SignupForm />
    </AuthLayout>
  );
}
