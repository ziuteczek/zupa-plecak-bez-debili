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

let tickets = [];
let filter = 'all';
let nextId = 1;

const form = document.querySelector('#form');
const titleInput = document.querySelector('#title');
const filterSelect = document.querySelector('#filter');
const list = document.querySelector('#list');
const counter = document.querySelector('#counter');
const message = document.querySelector('#message');

function createTicketRow(ticket) {
    const li = document.createElement('li');
    li.textContent = ticket.title + ' (' + ticket.priority + ') ';

    const select = document.createElement('select');
    for (const status of STATUSES) {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        select.append(option);
    }
    select.value = ticket.status;
    select.addEventListener('change', () => {
        tickets = changeStatus(tickets, ticket.id, select.value);
        message.textContent = 'Zmieniono status.';
        render();
        filterSelect.focus();
    });

    li.append(select);
    return li;
}

function render() {
    const visible = tickets.filter((t) => filter === 'all' || t.status === filter);
    list.replaceChildren(...visible.map(createTicketRow));
    counter.textContent = visible.length + '/' + tickets.length;
    if (visible.length === 0) {
        message.textContent = 'Brak zgłoszeń.';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    try {
        tickets = addTicket(tickets, String(nextId), String(data.get('title')), String(data.get('priority')));
        nextId++;
        titleInput.value = '';
        message.textContent = 'Dodano zgłoszenie.';
        render();
    } catch (error) {
        message.textContent = error.message;
    }
    titleInput.focus();
});

filterSelect.addEventListener('change', () => {
    filter = filterSelect.value;
    render();
});

render();
