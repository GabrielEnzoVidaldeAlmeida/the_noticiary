import { PostCoverImage } from "@/components/PostCoverImage";
import PostHeading from "@/components/PostHeading";
import axios from "axios";
import clsx from "clsx";

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

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <PostCoverImage
          linkProps={{
            href: "/post/akjdsa",
          }}
          imageProps={{
            width: 1200,
            height: 720,
            src: "/images/bryen_9.png",
            alt: "Alt da imagem",
            priority: true,
          }}
        />

        <div className="flex flex-col gap-4 sm:justify-center">
          <time className="text-slate-600 text-sm/tight" dateTime="2025-04-20">
            20/04/2025 10:00
          </time>
          <PostHeading as="h1" url="#">
            Doloribus modi provident laboriosam deserunt est
          </PostHeading>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iusto
          vero, perferendis enim recusandae dolores. Doloribus modi provident
          laboriosam deserunt est consequatur consequuntur, amet velit illo
          alias molestias, sunt laborum.
        </div>
      </section>
    </div>
  );
}
