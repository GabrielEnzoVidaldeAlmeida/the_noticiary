"use client";

import { getNewsItem, deleteNewsItem } from "@/lib/api";
import { NewsItem } from "@/types/news";
import { BoltIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getNewsItem(id);
        setNewsItem(data);
      } catch (err) {
        console.error("Erro ao carregar notícia:", err);
        setError("Erro ao carregar notícia");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;

    setIsDeleting(true);
    setError("");

    try {
      const success = await deleteNewsItem(id);
      if (success) {
        router.push("/");
        router.refresh();
      } else {
        setError("Falha ao excluir notícia");
      }
    } catch (err) {
      setError("Erro ao excluir notícia");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  if (!newsItem) {
    return <div className="text-center p-8">Notícia não encontrada</div>;
  }

  const imageUrl = `http://127.0.0.1:8000${newsItem.image}`;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center md:text-left">
          {newsItem.name}
        </h1>
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <Image
              src={imageUrl}
              alt={newsItem.name}
              width={1280}
              height={720}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
        <div className="prose prose-lg max-w-none mx-auto text-justify">
          <article className="whitespace-pre-line">{newsItem.content}</article>
        </div>
        <div className="flex justify-end gap-4 mt-12">
          <button>
            <BoltIcon className="text-gray-500 cursor-pointer" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="disabled:opacity-50 flex items-center gap-1"
          >
            <TrashIcon className="text-red-700 cursor-pointer" />
            {isDeleting && <span>Excluindo...</span>}
          </button>
        </div>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}
