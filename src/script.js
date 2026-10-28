const STATUSES = ['new', 'doing', 'done'];
const PRIORITIES = ['low', 'normal', 'high'];

function fail(message) {
    alert(message);
    throw new Error(message);
}

function addTicket(tickets, id, title, priority) {
    title = title.trim();
    if (tickets.length >= 1000) {
        fail('Maksymalnie 1000 zgłoszeń.');
    }
    if (id.trim() === '' || id.length > 100) {
        fail('Złe ID.');
    }
    if (tickets.some((t) => t.id === id)) {
        fail('ID musi być unikatowe.');
    }
    if (title.length < 3 || title.length > 80) {
        fail('Tytuł musi mieć 3–80 znaków.');
    }
    if (!PRIORITIES.includes(priority)) {
        fail('Zły priorytet.');
    }
    return [...tickets, { id, title, status: 'new', priority }];
}

function changeStatus(tickets, id, status) {
    if (!STATUSES.includes(status)) {
        fail('Zły status.');
    }
    if (!tickets.some((t) => t.id === id)) {
        fail('Nie ma takiego zgłoszenia.');
    }
    return tickets.map((t) => {
        if (t.id === id) {
            return { ...t, status };
        }
        return t;
    });
}
