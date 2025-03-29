"use client";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryProps {
  id: string;
  name: string;
}
interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const data = new FormData();

    if (!image) {
      return alert("Selecione uma imagem");
    }
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = await getCookieClient();

    await api.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Produto cadastrado com sucesso!");
    router.push("/dashboard");
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/png" && image.type !== "image/jpeg") {
        return alert("Apenas imagens PNG e JPEG são permitidas");
      }

      setImage(image);
      setPreview(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {preview && (
            <Image
              src={preview}
              alt="Imagem do produto"
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Digite o preço do produto"
          required
          className={styles.input}
        />
        <textarea
          className={styles.input}
          placeholder="Digite a descrição do produto"
          required
          name="Description"
        ></textarea>
        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
