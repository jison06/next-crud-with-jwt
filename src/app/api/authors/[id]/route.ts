import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const author = await prisma.author.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { books: true },
    });
    if (!author) {
      return NextResponse.json(
        { error: `Author not found with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const data = await req.json();
    const author = await prisma.author.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    if (!author) {
      return NextResponse.json(
        { error: `Author not found with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const author = await prisma.author.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!author) {
      return NextResponse.json(
        { error: `Author not found with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
