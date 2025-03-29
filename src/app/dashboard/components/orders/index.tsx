"use client";
import styles from "./styles.module.scss";
import { RefreshCcw } from "lucide-react";
import { orderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { useContext } from "react";
import { OrderContext } from "@/providers/order";

interface Props {
  orders: orderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = useContext(OrderContext);

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderItem}>
              <span>Mesa {order.table}</span>
            </div>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
