
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function Home() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [generoSelecionado, setGeneroSelecionado] = useState("Todos");
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  const generos = [
    "Todos",
    ...new Set(movies.map((movie) => movie.genero))
  ];

  const horarios = ["14:00", "16:30", "19:00", "21:30"];

  const filmesFiltrados = movies.filter((movie) => {
    const correspondeBusca = movie.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeGenero =
      generoSelecionado === "Todos" ||
      movie.genero === generoSelecionado;

    return correspondeBusca && correspondeGenero;
  });

  return (
    <main className="min-h-screen bg-fundo p-6 md:p-10">
      <header className="mb-10">
        <h1 className="font-titulo text-4xl text-turquesa">
          Locus Cine
        </h1>

        <p className="mt-2 text-suave">
          Encontre seu próximo filme favorito!
        </p>
      </header>

      {!filmeSelecionado ? (
        <>
          <section className="mb-8 flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Buscar filme..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-[#202b35] p-3 text-white outline-none focus:border-turquesa"
            />

            <select
              value={generoSelecionado}
              onChange={(e) => setGeneroSelecionado(e.target.value)}
              className="rounded-lg border border-gray-600 bg-[#202b35] p-3 text-white"
            >
              {generos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h2 className="mb-6 font-titulo text-2xl text-white">
              Filmes em cartaz
            </h2>

            {filmesFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filmesFiltrados.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={setFilmeSelecionado}
                  />
                ))}
              </div>
            ) : (
              <p className="text-suave">
                Nenhum filme encontrado.
              </p>
            )}
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-xl rounded-xl bg-[#202b35] p-6">
          <h2 className="mb-3 font-titulo text-2xl text-turquesa">
            {filmeSelecionado.titulo}
          </h2>

          <p className="mb-6 text-white">
            Escolha o horário da sessão:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {horarios.map((horario) => (
              <button
                key={horario}
                onClick={() => {
                  navigate(
                    `/comprar/${filmeSelecionado.id}/${encodeURIComponent(horario)}`
                  );
                }}
                className="rounded-lg bg-turquesa p-3 font-bold text-gray-900 hover:opacity-90"
              >
                {horario}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFilmeSelecionado(null)}
            className="mt-6 text-sm text-suave underline"
          >
            Voltar ao catálogo
          </button>
        </section>
      )}
    </main>
  );
}

export default Home;
