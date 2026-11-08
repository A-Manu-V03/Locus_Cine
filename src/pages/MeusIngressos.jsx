
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTickets } from "../data/tickets";
import movies from "../data/movies";

function MeusIngressos() {
  const { user } = useAuth();
  const [ingressos, setIngressos] = useState([]);

  useEffect(() => {
    const todosIngressos = getTickets();

    const meusIngressos = todosIngressos.filter(
      (ticket) => ticket.email === user?.email
    );

    setIngressos(meusIngressos);
  }, [user]);

  return (
    <main className="min-h-screen bg-fundo p-6 text-white md:p-10">
      <h1 className="mb-8 text-center font-titulo text-3xl text-turquesa">
        Meus Ingressos
      </h1>

      {ingressos.length === 0 ? (
        <p className="text-center text-suave">
          Você ainda não possui ingressos comprados.
        </p>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {ingressos.map((ingresso) => {
            const filme = movies.find(
              (movie) => movie.id === Number(ingresso.movieId)
            );

            if (!filme) return null;

            return (
              <article
                key={ingresso.id}
                className="flex gap-4 rounded-xl bg-[#202b35] p-4"
              >
                <img
                  src={filme.imagem}
                  alt={filme.titulo}
                  className="h-40 w-28 rounded-lg object-cover"
                />

                <div>
                  <h2 className="mb-3 text-xl font-bold text-turquesa">
                    {filme.titulo}
                  </h2>

                  <p className="mb-2">
                    Sessão: {ingresso.time}
                  </p>

                  <p className="mb-2">
                    Assentos: {ingresso.seats.join(", ")}
                  </p>

                  <p className="text-sm text-suave">
                    Comprador: {ingresso.email}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default MeusIngressos;
