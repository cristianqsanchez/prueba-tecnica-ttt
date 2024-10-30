import Link from "next/link";
import { Form } from "../components/form";
import { login } from "../actions";

export default function Page() {
  return (
    <Form title="Login" action={login} cta="Login">
      <div>
        <Link href='/'>Go to sign in page</Link>
      </div>
    </Form>
  );
}
