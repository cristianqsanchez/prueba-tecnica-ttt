import Link from "next/link";
import { signin } from "./actions";
import { Form } from "./components/form" 

export default function Home() {
  return (
    <Form title="Sign in" action={signin} cta="Sign in">
      <div>
        <Link href='/login'>Go to login page</Link>
      </div>
    </Form>
  );
}
