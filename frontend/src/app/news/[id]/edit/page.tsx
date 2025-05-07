"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { NewsItem } from "@/types/news";

export default function NewsEdit() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [newsItemData, setNewsItemData] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const response = await axios.get<{ news: NewsItem }>(
          `http://127.0.0.1:8000/api/news/${id}/`
        );
        setNewsItemData(response.data.news);
        const { name, description, content } = response.data.news;
        setFormData({ name, description, content, image: null });
      } catch (err: any) {
        console.error("Erro ao carregar notícia:", err);
        setApiError("Erro ao carregar notícia. Verifique o ID da notícia.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsItem();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("content", formData.content);

    if (formData.image) {
      submissionData.append("image", formData.image);
    }

    try {
      const response = await axios.put<{ news: NewsItem }>(
        `http://127.0.0.1:8000/api/news/update/${id}/`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push(`/news/${response.data.news.id}`);
    } catch (err: any) {
      console.error("Erro ao atualizar notícia: ", err);
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        let errorMessages: string[] = [];

        if (typeof backendErrors === 'object' && backendErrors !== null) {
          for (const field in backendErrors) {
            if (Object.prototype.hasOwnProperty.call(backendErrors, field)) {
              const messages = Array.isArray(backendErrors[field])
                ? backendErrors[field].join(' ')
                : String(backendErrors[field]);
              let fieldName = field;
              if (field === "name") fieldName = "Título";
              if (field === "description") fieldName = "Descrição";
              if (field === "content") fieldName = "Conteúdo";
              if (field === "image") fieldName = "Imagem";

              errorMessages.push(`${fieldName}: ${messages}`);
            }
          }
        }

        if (errorMessages.length > 0) {
          setApiError(`Por favor, corrija os seguintes erros: ${errorMessages.join('; ')}`);
        } else if (err.response.statusText && err.response.status) {
          setApiError(`Erro ${err.response.status}: ${err.response.statusText}.`);
        } else {
          setApiError("Erro desconhecido.");
        }
      } else if (err.request) {
        setApiError("Erro ao atualizar notícia: Nenhuma resposta do servidor. Verifique sua conexão.");
      } else {
        setApiError(`Erro ao atualizar notícia: ${err.message}`);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Carregando dados da notícia...</div>;
  }

  if (apiError && !newsItemData) { 
    return <div className="text-red-600 text-center p-8">{apiError}</div>;
  }

  if (!newsItemData) {
    return <div className="text-center p-8">Notícia não encontrada.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-6">
        Editar notícia:
      </h1>

      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label htmlFor="name" className="block mb-2 text-gray-700">Título</label>
           <input
             id="name"
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             className="w-full p-2 border rounded text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
             required
           />
         </div>

         <div>
           <label htmlFor="description" className="block mb-2 text-gray-700">Descrição</label>
           <input
            id="description"
             type="text"
             name="description"
             value={formData.description}
             onChange={handleChange}
             className="w-full p-2 border rounded text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
             required
           />
         </div>

         <div>
           <label htmlFor="content" className="block mb-2 text-gray-700">Conteúdo</label>
           <textarea
            id="content"
             name="content"
             value={formData.content}
             onChange={handleChange}
             className="w-full p-2 border rounded h-40 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
             required
           />
         </div>

        <div>
          <label htmlFor="image" className="block mb-2 text-gray-700">Imagem</label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            accept="image/*"
          />
          {!formData.image && newsItemData.image && (
            <div className="mt-2">
              <label className="block mb-1 text-gray-700">Imagem atual:</label>
              <img
                src={`http://127.0.0.1:8000${newsItemData.image}`}
                alt={newsItemData.name}
                className="max-h-40 rounded object-cover"
              />
              <p className="text-sm text-gray-500 mt-1">
                Selecione um novo arquivo para substituir a imagem atual. Se nenhum arquivo for selecionado, a imagem atual será mantida.
              </p>
            </div>
          )}
          {formData.image && (
            <div className="mt-2">
                <label className="block mb-1 text-gray-700">Nova imagem selecionada:</label>
                <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview da nova imagem"
                    className="max-h-40 rounded object-cover"
                    onLoad={() => URL.revokeObjectURL(URL.createObjectURL(formData.image))}
                />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}