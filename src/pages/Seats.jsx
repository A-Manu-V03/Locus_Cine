
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTickets, saveTicket } from "../data/tickets";

function Seats() {
  const { movieId, time } = useParams();
  const { user } = useAuth();

  const [selecionados, setSelecionados] = useState([]);
  const [ocupados, setOcupados] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const fileiras = ["A", "B", "C", "D", "E"];
  const quantidade = 8;

  const sessao = {
    movieId: Number(movieId),
    time: decodeURIComponent(time),
  };

  function atualizarOcupados() {
    const ingressos = getTickets();

    const ingressosDaSessao = ingressos.filter(
      (ticket) =>
        String(ticket.movieId) === String(sessao.movieId) &&
        ticket.time === sessao.time
    );

    setOcupados(
      ingressosDaSessao.flatMap((ticket) => ticket.seats)
    );
  }

  useEffect(() => {
    atualizarOcupados();
  }, [movieId, time]);

  function selecionarAssento(assento) {
    if (ocupados.includes(assento)) return;

    setMensagem("");

    setSelecionados((atuais) =>
      atuais.includes(assento)
        ? atuais.filter((item) => item !== assento)
        : [...atuais, assento]
    );
  }

  function confirmarCompra() {
    if (selecionados.length === 0) {
      setMensagem("Selecione pelo menos um assento.");
      return;
    }

    if (!user) {
      setMensagem("Faça login para confirmar sua compra.");
      return;
    }

    const ingresso = {
      id: Date.now(),
      email: user.email,
      movieId: sessao.movieId,
      time: sessao.time,
      seats: selecionados,
    };

    const salvo = saveTicket(ingresso);

    if (!salvo) {
      atualizarOcupados();
      setSelecionados([]);
      setMensagem(
        "Um dos assentos já foi vendido. Escolha novamente."
      );
      return;
    }

    atualizarOcupados();
    setSelecionados([]);
    setMensagem("Compra confirmada com sucesso!");
  }

  return (
    <main className="min-h-screen bg-fundo p-6 text-white md:p-10">
      <h1 className="mb-4 text-center font-titulo text-3xl text-turquesa">
        Escolha seus assentos
      </h1>

      <p className="mb-8 text-center text-suave">
        Filme: {movieId} | Sessão: {sessao.time}
      </p>

      <div className="mx-auto mb-10 max-w-2xl">
        <div className="mb-8 rounded-t-full border-t-4 border-turquesa py-3 text-center text-suave">
          TELA DO CINEMA
        </div>

        <div className="space-y-3">
          {fileiras.map((fileira) => (
            <div key={fileira} className="flex justify-center gap-2">
              {Array.from({ length: quantidade }, (_, i) => {
                const assento = `${fileira}${i + 1}`;
                const estaOcupado = ocupados.includes(assento);
                const estaSelecionado = selecionados.includes(assento);

                return (
                  <button
                    key={assento}
                    disabled={estaOcupado}
                    onClick={() => selecionarAssento(assento)}
                    className={`h-9 w-9 rounded-t-lg text-xs font-bold sm:h-11 sm:w-11 ${
                      estaOcupado
                        ? "cursor-not-allowed bg-red-700"
                        : estaSelecionado
                        ? "bg-turquesa text-gray-900"
                        : "bg-gray-500 hover:bg-gray-400"
                    }`}
                  >
                    {assento}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm">
        <span>⬜ Disponível</span>
        <span>🟦 Selecionado</span>
        <span>🟥 Ocupado</span>
      </div>

      <div className="text-center">
        <p className="mb-4 text-lg">
          Assentos selecionados:{" "}
          {selecionados.length > 0
            ? selecionados.join(", ")
            : "Nenhum"}
        </p>

        <p className="mb-6 text-suave">
          Total: R$ {(selecionados.length * 30).toFixed(2)}
        </p>

        <button
          onClick={confirmarCompra}
          className="rounded-lg bg-turquesa px-8 py-3 font-bold text-gray-900 hover:opacity-90"
        >
          Confirmar compra
        </button>

        {mensagem && (
          <p className="mt-4 text-sm text-turquesa">
            {mensagem}
          </p>
        )}
      </div>
    </main>
  );
}

export default Seats;
