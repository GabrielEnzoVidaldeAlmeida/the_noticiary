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
          <div key={item.id} className="border-b-2 pb-8 w-80 sm:w-full">
            <Link
              href={`/news/${item.id}`}
              className="flex flex-col sm:flex-row gap-4 hover:scale-101 transition items-center"
            >
              <div className="flex-shrink-0">
                <Image
                  src={`http://127.0.0.1:8000${item.image}`}
                  alt={item.name}
                  width={320}
                  height={180}
                  className="object-cover object-center w-[320px] h-[180px] rounded-xl"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center">
                <time
                  className="text-slate-600 text-sm/tight"
                  dateTime={item.created_at}
                >
                  {new Date(item.created_at).toLocaleString("pt-BR")}
                </time>
                <PostHeading as="h2">{item.name}</PostHeading>
                <p>{item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
