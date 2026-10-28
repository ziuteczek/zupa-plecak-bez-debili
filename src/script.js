const TICKET_STATUSES = new Set(['new', 'doing', 'done']);
const TICKET_PRIORITIES = new Set(['low', 'normal', 'high']);
const MAX_TICKETS = 1000;

function assertTickets(tickets) {
    if (!Array.isArray(tickets)) {
        throw new Error('Zgłoszenia muszą być tablicą.');
    }
}

function addTicket(tickets, ticket) {
    assertTickets(tickets);

    if (tickets.length >= MAX_TICKETS) {
        throw new Error('Można dodać maksymalnie 1000 zgłoszeń.');
    }
    if (!ticket || typeof ticket !== 'object' || Array.isArray(ticket)) {
        throw new Error('Zgłoszenie musi być obiektem.');
    }

    const { id, title, priority } = ticket;
    if (typeof id !== 'string' || id.trim().length === 0 || id.length > 100) {
        throw new Error('ID zgłoszenia musi być niepustym tekstem o długości do 100 znaków.');
    }
    if (tickets.some((existingTicket) => existingTicket.id === id)) {
        throw new Error('ID zgłoszenia musi być unikatowe.');
    }
    if (typeof title !== 'string') {
        throw new Error('Tytuł zgłoszenia musi być tekstem.');
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3 || trimmedTitle.length > 80) {
        throw new Error('Tytuł zgłoszenia musi mieć od 3 do 80 znaków.');
    }
    if (!TICKET_PRIORITIES.has(priority)) {
        throw new Error('Priorytet zgłoszenia musi mieć wartość: niski, normalny lub wysoki.');
    }

    return [...tickets, {
        id,
        title: trimmedTitle,
        status: 'new',
        priority
    }];
}

function changeStatus(tickets, id, status) {
    assertTickets(tickets);

    if (typeof id !== 'string' || id.trim().length === 0 || id.length > 100) {
        throw new Error('ID zgłoszenia musi być niepustym tekstem o długości do 100 znaków.');
    }
    if (!TICKET_STATUSES.has(status)) {
        throw new Error('Status zgłoszenia musi mieć wartość: nowe, w trakcie lub zakończone.');
    }

    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
        throw new Error('Nie znaleziono zgłoszenia.');
    }

    return tickets.map((ticket) => (
        ticket.id === id ? { ...ticket, status } : ticket
    ));
}
