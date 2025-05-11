import { AuthLayout } from '@/components/auth/auth-layout';
import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInPage() {
  return (
    <AuthLayout title="Sign In to Your Account">
      <SignInForm />
    </AuthLayout>
  );
}
