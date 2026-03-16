import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs, { writeFile } from "fs/promises";
import { Buffer } from "buffer";


function getFileTypeByExtension(filename:string) {
  const ext = path.extname(filename).toLowerCase();
  return ext; // e.g., ".png", ".jpg", ".pdf"
}

export async function POST(request: NextRequest) {
  try {

    // Get FormData request
    const formData = await request.formData();
    const Image = formData.get("image") as File | null;

    if (!Image) {
      return NextResponse.json({ success: false, error: "No Image uploaded" }, { status: 400 });
    }

    const fileExt = getFileTypeByExtension(Image.name);
    console.log(fileExt);

    if (fileExt != '.jpg' && fileExt != '.png' && fileExt != '.pdf') {
      return NextResponse.json({success: false, error: "Image type not png or jpg"}, {status:400});
    }


    // Create directory
    const uploadDir = path.join(process.cwd(), "public", "userImage");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique Image name
    const fileName = `${Date.now()}-${Image.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Convert Image to buffer and write to disk
    const arrayBuffer = await Image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Return Image URL for frontend
    const fileUrl = `/userImage/${fileName}`;

    // await Upload.create({
    //   filename: name,
    //   url: fileUrl
    // })

    return NextResponse.json({ success: true, url: fileUrl, fileName }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}