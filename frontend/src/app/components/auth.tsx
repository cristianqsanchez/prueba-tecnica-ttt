'use client'
import Link from "next/link";
import { useFormState } from "react-dom";
import { signin, login } from "@/app/actions"
import { Form } from "./form";

const initialState = {
  message: ''
}

export function SignInForm() {
  const [state, formAction] = useFormState(signin, initialState)

  return (
    <Form title="Sign in" action={formAction} cta="Sign in">
      <div>
        <p className="text-destructive">{state?.message}</p>
        <Link href='/login'>Go to login page</Link>
      </div>
    </Form>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, initialState)

  return (
    <Form title="Login" action={formAction} cta="Login">
      <div>
        <p>{state?.message}</p>
        <Link href='/signin'>Go to sign in page</Link>
      </div>
    </Form>
  );
}
