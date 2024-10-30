import { redirect } from "next/navigation";
import { getAuth } from "./utils/auth";
import { SignInForm } from "./components/auth";

export default function Home() {
  const { userAuth } = getAuth()

  if (userAuth) {
    return redirect('/tasks')
  }
  return (
    <SignInForm />
  );
}
