
const STORAGE_KEY = "locuscine_tickets";

export function getTickets() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTicket(ticket) {
  const tickets = getTickets();

  const assentosOcupados = tickets
    .filter(
      (item) =>
        String(item.movieId) === String(ticket.movieId) &&
        item.time === ticket.time
    )
    .flatMap((item) => item.seats);

  const assentoDuplicado = ticket.seats.some(
    (seat) => assentosOcupados.includes(seat)
  );

  if (assentoDuplicado) {
    return false;
  }

  tickets.push(ticket);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tickets)
  );

  return true;
}

export function removeTicket(id) {
  const tickets = getTickets().filter(
    (ticket) => ticket.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tickets)
  );
}

export default {
  getTickets,
  saveTicket,
  removeTicket,
};
