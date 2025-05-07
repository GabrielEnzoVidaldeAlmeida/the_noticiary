"use client";

import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewsCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/news/create/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push(`/news/${response.data.id}`);
    } catch (error) {
      console.error("Erro ao criar notícias: ", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-extrabold text-2xl mb-6 sm:text-3xl md:text-4xl">
        Adicionar notícia:
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-extrabold">Título</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-extrabold">Descrição</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-extrabold">Conteúdo</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded h-40"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-extrabold">Imagem</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded cursor-pointer"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className={clsx(
            "bg-blue-500 text-white font-extrabold hover:bg-blue-600",
            "px-4 py-2 rounded cursor-pointer"
          )}
        >
          Criar Notícia
        </button>
      </form>
    </div>
  );
}
