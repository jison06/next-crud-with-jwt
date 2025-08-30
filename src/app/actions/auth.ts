"use server";

import { LoginFormSchema, SignupFormSchema } from "../lib/schemas/signup";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: validatedFields.data.email,
    },
  });

  if (!user) {
    return {
      error: "Invalid Login",
    };
  }

  const match = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );

  if (!match) {
    return {
      error: "Invalid Login",
    };
  }

  await createSession(user.id.toString());
  redirect("/authors");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const password = await bcrypt.hash(validatedFields.data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...validatedFields.data,
      password: password,
    },
  });

  if (!user) {
    return {
      error: "An error occurred while creating your account",
    };
  }

  await createSession(user.id.toString());
  redirect("/authors");
}
