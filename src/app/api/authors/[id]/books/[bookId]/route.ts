import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; bookId: string } }
) {
  try {
    const { id, bookId } = await params;
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
        authorId: parseInt(id),
      },
    });
    if (!book) {
      return NextResponse.json(
        { error: `book not found with bookId ${bookId}` },
        { status: 404 }
      );
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; bookId: string } }
) {
  try {
    const { id, bookId } = await params;
    const data = await req.json();
    const book = await prisma.book.update({
      where: {
        id: parseInt(bookId),
        authorId: parseInt(id),
      },
      data: {
        authorId: parseInt(id),
        ...data,
      },
    });
    if (!book) {
      return NextResponse.json(
        { error: `book not found with bookId ${bookId}` },
        { status: 404 }
      );
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; bookId: string } }
) {
  try {
    const { id, bookId } = await params;
    const book = await prisma.book.delete({
      where: {
        id: parseInt(bookId),
        authorId: parseInt(id),
      },
    });
    if (!book) {
      return NextResponse.json(
        { error: `book not found with bookId ${bookId}` },
        { status: 404 }
      );
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
