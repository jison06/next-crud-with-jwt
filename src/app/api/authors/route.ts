import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const authors = await prisma.author.findMany({ include: { books: true } });
    return NextResponse.json(authors);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const author = await prisma.author.create({
      data: data,
    });
    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create Author" },
      { status: 500 }
    );
  }
}
