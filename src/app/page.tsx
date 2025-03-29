import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return alert("Preencha todos os campos");
    }

    try {
      const response = await api.post("/session", { email, password });

      console.log(response.data);

      if (!response.data.token) {
        return alert("Usuário não encontrado");
      }

      const cookieStore = await cookies();
      cookieStore.set("session", response.data.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (error) {
      console.error("error");
    }

    redirect("/dashboard");
  }
  return (
    <div className={styles.ContainerCenter}>
      <Image src="/pizza.svg" alt="Logo da Pizza" width={150} height={150} />

      <section className={styles.login}>
        <form action={handleLogin}>
          <input
            type="email"
            required
            name="email"
            placeholder="Digite seu Email..."
            className={styles.input}
          />

          <input
            type="password"
            required
            name="password"
            placeholder="**********"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Acessar
          </button>
        </form>

        <Link href="/signup" className={styles.text}>
          Criar uma conta
        </Link>
      </section>
    </div>
  );
}
