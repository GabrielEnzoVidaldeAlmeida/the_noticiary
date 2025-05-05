// lib/api.ts
import axios from "axios";
import { NewsItem } from "@/types/news";

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/news/");
    return response.data.news;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}
