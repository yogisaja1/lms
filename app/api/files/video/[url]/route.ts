import { utapi } from "@/lib/server/uploadthing";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params} : {params: {url: string}}
    ) {
    try {
    await utapi.deleteFiles(params.url);
    return NextResponse.json({message: "Video file deleted", status: 200})

    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}