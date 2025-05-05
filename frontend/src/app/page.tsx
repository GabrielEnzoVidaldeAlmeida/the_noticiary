// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchNews } from "@/lib/api";
import { NewsItem } from "@/types/news";
import PostHeading from "@/components/PostHeading";

export default async function Home() {
  const news = await fetchNews();

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-8">
        {news.map((item: NewsItem) => (
          <div
            key={item.id}
            className="border-b-2 pb-2 w-80 sm:w-full sm:flex sm:gap-4 sm:items-start group"
          >
            <div className="sm:w-1/2 overflow-hidden rounded-xl">
              <Image
                src={`http://127.0.0.1:8000${item.image}`}
                alt={item.name}
                width={320}
                height={180}
                className="object-cover object-center w-full h-full transition group-hover:scale-105"
                priority
              />
            </div>

            <div className="mt-2 sm:mt-0 sm:w-1/2 flex flex-col gap-1">
              <time
                className="text-slate-600 text-sm/tight"
                dateTime={item.created_at}
              >
                {new Date(item.created_at).toLocaleString("pt-BR")}
              </time>
              <Link href={`/news/${item.id}`} className="group">
                <PostHeading as="h2" url="#">
                  {item.name}
                </PostHeading>
              </Link>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/*EXEMPLO DE NOTÍCIA: */}
      <section className="flex flex-col items-center justify-center gap-8">
        <div className="border-b-2 pb-2 w-80 sm:w-full">
          <Link href="/" className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <Image
                src="/images/bryen_9.png"
                alt="Zoom interno"
                width={320}
                height={180}
                className="object-cover object-center rounded-xl"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <time
                className="text-slate-600 text-sm/tight"
                dateTime="2025-04-20"
              >
                20/04/2025 10:00
              </time>
              <PostHeading as="h2" url="/">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.!
              </PostHeading>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt dicta ipsa nihil alias culpa perspiciatis libero hic
                similique eaque ullam dignissimos amet obcaecati.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
