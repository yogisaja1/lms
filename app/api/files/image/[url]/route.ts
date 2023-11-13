import { utapi } from "@/lib/server/uploadthing";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { url: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await utapi.deleteFiles(params.url);
    return NextResponse.json({ message: "Image file deleted", status: 200 });
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
