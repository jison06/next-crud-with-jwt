import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const books = await prisma.book.findMany({
      where: { authorId: parseInt(id) },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const book = await prisma.book.create({
      data: {
        authorId: parseInt(id),
        ...data,
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create Book" },
      { status: 500 }
    );
  }
}
