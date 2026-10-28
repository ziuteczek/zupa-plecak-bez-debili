const STATUSES = ['new', 'doing', 'done'];
const PRIORITIES = ['low', 'normal', 'high'];

function throwTicketError(message) {
    if (typeof globalThis.alert === 'function') {
        globalThis.alert(message);
    }
    throw new Error(message);
}

function assertTickets(tickets) {
    if (!Array.isArray(tickets)) {
        throwTicketError('Zgłoszenia muszą być tablicą.');
    }
}

function addTicket(tickets, ticket) {
    assertTickets(tickets);

    if (tickets.length >= MAX_TICKETS) {
        throwTicketError('Można dodać maksymalnie 1000 zgłoszeń.');
    }
    if (!ticket || typeof ticket !== 'object' || Array.isArray(ticket)) {
        throwTicketError('Zgłoszenie musi być obiektem.');
    }

    const { id, title, priority } = ticket;
    if (typeof id !== 'string' || id.trim().length === 0 || id.length > 100) {
        throwTicketError('ID zgłoszenia musi być niepustym tekstem o długości do 100 znaków.');
    }
    if (tickets.some((existingTicket) => existingTicket.id === id)) {
        throwTicketError('ID zgłoszenia musi być unikatowe.');
    }
    if (typeof title !== 'string') {
        throwTicketError('Tytuł zgłoszenia musi być tekstem.');
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3 || trimmedTitle.length > 80) {
        throwTicketError('Tytuł zgłoszenia musi mieć od 3 do 80 znaków.');
    }
    if (!TICKET_PRIORITIES.has(priority)) {
        throwTicketError('Priorytet zgłoszenia musi mieć wartość: niski, normalny lub wysoki.');
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
        throwTicketError('ID zgłoszenia musi być niepustym tekstem o długości do 100 znaków.');
    }
    if (!TICKET_STATUSES.has(status)) {
        throwTicketError('Status zgłoszenia musi mieć wartość: nowe, w trakcie lub zakończone.');
    }

    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
        throwTicketError('Nie znaleziono zgłoszenia.');
    }

    return tickets.map((ticket) => (
        ticket.id === id ? { ...ticket, status } : ticket
    ));
}
