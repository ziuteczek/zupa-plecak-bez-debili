const STATUSES = ['new', 'doing', 'done'];
const PRIORITIES = ['low', 'normal', 'high'];

function addTicket(tickets, id, title, priority) {
    title = title.trim();
    if (tickets.length >= 1000) {
        throw new Error('Maksymalnie 1000 zgłoszeń.');
    }
    if (id.trim() === '' || id.length > 100) {
        throw new Error('Złe ID.');
    }
    if (tickets.some((t) => t.id === id)) {
        throw new Error('ID musi być unikatowe.');
    }
    if (title.length < 3 || title.length > 80) {
        throw new Error('Tytuł musi mieć 3–80 znaków.');
    }
    if (!PRIORITIES.includes(priority)) {
        throw new Error('Zły priorytet.');
    }
    return [...tickets, { id, title, status: 'new', priority }];
}

function changeStatus(tickets, id, status) {
    if (!STATUSES.includes(status)) {
        throw new Error('Zły status.');
    }
    if (!tickets.some((t) => t.id === id)) {
        throw new Error('Nie ma takiego zgłoszenia.');
    }
    return tickets.map((t) => {
        if (t.id === id) {
            return { ...t, status };
        }
        return t;
    });
}
