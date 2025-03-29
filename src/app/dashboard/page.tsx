import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { orderProps } from "@/lib/order.type";

async function getOrders(): Promise<orderProps[] | []> {
  try {
    const token = await getCookieServer();
    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error("Error ", error);
    return [];
  }
}

export default async function Dashboard() {
  const orders = await getOrders();

  return <Orders orders={orders} />;
}
