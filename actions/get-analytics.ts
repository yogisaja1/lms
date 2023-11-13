import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & { course: Course };

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const gruped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!gruped[courseTitle]) {
      gruped[courseTitle] = 0;
    }

    gruped[courseTitle] += purchase.course.price!;
  });

  return gruped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );

    // fungsi reduce untuk menjumlahkan total harga semua course
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    // data berisi nama course dan total harga
    // totalRevenue berisi total harga semua course
    // totalSales berisi total hasil penjualan semua course

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
