"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import Form from "./form";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <Form
      formTitle="Sign In"
      submitText="Sign In"
      action={action}
      pending={pending}
    >
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" placeholder="Email" />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
        />
      </div>
    </Form>
  );
}
