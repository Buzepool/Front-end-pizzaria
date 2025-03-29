"use client";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import path from "path";

export default function Header() {
  const router = useRouter();
  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    router.replace("/");
  }
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            src="/pizza.svg"
            alt="Pizza"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>
        <nav>
          <Link href="/dashboard/category">Categorias</Link>
          <Link href="/dashboard/product">Produtos</Link>
          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
