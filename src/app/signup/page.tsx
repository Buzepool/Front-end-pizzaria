import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {
  async function handleRegister(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return alert("Preencha todos os campos");
    }

    console.log({ name, email, password });

    try {
      await api.post("/users", { name, email, password });
      console.log("Usuário cadastrado com sucesso");
    } catch (error) {
      console.error("error");
    }
    redirect("/");
  }

  return (
    <div className={styles.ContainerCenter}>
      <Image src="/pizza.svg" alt="Logo da Pizza" width={150} height={150} />

      <section className={styles.login}>
        <form action={handleRegister}>
          <input
            type="text"
            required
            name="name"
            placeholder="Digite seu nome"
            className={styles.input}
          />

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
            Criar Conta
          </button>
        </form>

        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça login.
        </Link>
      </section>
    </div>
  );
}
