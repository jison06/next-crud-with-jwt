"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import Form from "./form";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <Form
      action={action}
      pending={pending}
      submitText="Sign Up"
      formTitle="Create New Account"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
        />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
}
