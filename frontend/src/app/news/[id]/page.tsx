import { getNewsItem } from "@/lib/api";
import { BoltIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const newsItem = await getNewsItem(id);

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
          <BoltIcon className="text-gray-500" />
          <TrashIcon className="text-red-700" />
        </div>
      </div>
    </div>
  );
}
