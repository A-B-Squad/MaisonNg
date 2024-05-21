import { Context } from "@/pages/api/graphql";

export const getBestSales = async (
  _: any,
  { limit }: { limit: number },
  { prisma }: Context
) => {
  try {
    const bestSales = await prisma.bestSales.findMany({
      include: {
        Product: {
          include: {
            categories: {
              include: {
                subcategories: {
                  include: {
                    subcategories: true
                  }
                }
              }
            }, productDiscounts: {
              include: {
                Discount: true
              }
            }
          }
        },
        Category: true
      },

    });
    return bestSales;
  } catch (error) {
    console.error("Error fetching best sales:", error);
    throw new Error("Failed to fetch best sales");
  }
};
