import { AuthLayout } from '@/components/auth/auth-layout';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <AuthLayout title="Create Your Account">
      <SignUpForm />
    </AuthLayout>
  );
}
