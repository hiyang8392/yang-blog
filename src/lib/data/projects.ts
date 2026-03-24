import { prisma } from "@/lib/prisma";

export async function getProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}
