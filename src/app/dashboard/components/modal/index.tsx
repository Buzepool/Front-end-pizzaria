import styles from "./styles.module.scss";
import { X } from "lucide-react";
export function ModalOrder() {
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack}>
          <X size={24} color="#FF3f4b" />
        </button>
        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>Mesa</span>
          <section className={styles.containeItem}>
            <span>cola cola</span>
          </section>

          <button className={styles.buttonOrder}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}
