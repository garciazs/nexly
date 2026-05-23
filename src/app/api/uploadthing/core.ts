import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Não autorizado");
      return { userId: session.user.id! };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completo", metadata.userId, file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
