
function MovieCard({ movie, onSelect }) {
  return (
    <article className="overflow-hidden rounded-xl bg-[#202b35] shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-[#17212b]">
        <img
          src={movie.imagem}
          alt={movie.titulo}
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="space-y-2 p-4">
        <h2 className="font-titulo text-xl text-turquesa">
          {movie.titulo}
        </h2>

        <p className="text-sm text-suave">{movie.genero}</p>
        <p className="text-sm text-suave">{movie.duracao}</p>

        <p className="text-sm text-suave">
          Classificação: {movie.classificacao}
        </p>

        <p className="text-sm text-white">{movie.sinopse}</p>

        <button
          onClick={() => onSelect(movie)}
          className="mt-3 w-full rounded-lg bg-turquesa p-3 font-bold text-gray-900 hover:opacity-90"
        >
          Escolher filme
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
