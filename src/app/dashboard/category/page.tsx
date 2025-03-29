import { api } from "@/services/api";
import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function CategoryPage() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    if (!name) {
      return alert("Preencha o campo");
    }

    const data = {
      name: name,
    };
    const token = await getCookieServer();
    try {
      const response = await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
    redirect("/dashboard");
  }
  return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form className={styles.form} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da Categoria"
          required
          className={styles.input}
        />
        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
