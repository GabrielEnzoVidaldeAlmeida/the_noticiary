import PostHeading from "@/components/PostHeading";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

async function api() {
  let url = "http://127.0.0.1:8000/api/news/";
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição: ", error);
    throw error;
  }
}

export default async function Home() {
  const data = await api();
  console.log("DATA: ", data);

  return (
    <div>
      <h2
        className={clsx(
          "text-4xl/normal font-extrabold py-8",
          "sm:text-4xl/normal sm:py-10",
          "md:text-5xl/normal sm:py-11",
          "lg:text-6xl/normal lg:py-12"
        )}
      >
        News
      </h2>

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
