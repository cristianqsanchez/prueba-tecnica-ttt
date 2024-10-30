import { getAuth } from "../utils/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "../components/auth";

export default function Page() {
  const { userAuth } = getAuth()

  if (userAuth) {
    return redirect('/tasks')
  }
  return (
    <LoginForm />
  );
}
