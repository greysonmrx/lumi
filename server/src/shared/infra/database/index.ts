import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    file: {
      url: {
        needs: { name: true, path: true },
        compute(file) {
          return `${file.path}/${file.name}`;
        },
      },
    },
  },
});
