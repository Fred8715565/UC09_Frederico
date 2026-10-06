const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let cart = 0;

// ==================== TOAST ====================

function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        t.classList.remove('show');
    }, 2600);
}

// ==================== MENU ====================

$('#menuToggle').addEventListener('click', () => {
    $('#navlinks').classList.toggle('open');
});

$$('#navlinks a').forEach(a => {
    a.addEventListener('click', () => {
        $('#navlinks').classList.remove('open');
    });
});

// ==================== CARRINHO ====================

$$('.add-cart').forEach(b => {
    b.addEventListener('click', () => {
        cart++;
        $('#cartCount').textContent = cart;
        toast(`${b.dataset.name} adicionado ao carrinho!`);
    });
});

$('#cartBtn').addEventListener('click', () => {
    if (cart) {
        toast(
            `Seu carrinho tem ${cart} ${cart === 1 ? 'item' : 'itens'}. Para finalizar, fale com a loja pelo WhatsApp.`
        );
    } else {
        toast('Seu carrinho está vazio.');
    }
});

// ==================== CONTA ====================

$('#accountBtn').addEventListener('click', () => {
    toast('Área do cliente: entre em contato pelo WhatsApp para acessar sua conta.');
});

// ==================== FILTRO DE PRODUTOS ====================

function filterProducts(term) {
    let found = 0;

    $$('.product').forEach(p => {
        const show = (
            p.textContent + ' ' + p.dataset.category
        ).toLowerCase().includes(term.toLowerCase());

        p.style.display = show ? 'flex' : 'none';

        if (show) found++;
    });

    if (!found) {
        toast('Nenhum produto encontrado. Tente outra busca.');
    }
}

$('#searchForm').addEventListener('submit', e => {
    e.preventDefault();

    filterProducts($('#searchInput').value.trim());
    $('#produtos').scrollIntoView();
});

$$('.category').forEach(c => {
    c.addEventListener('click', () => {
        filterProducts(c.dataset.filter);
    });
});

$('#clearFilter').addEventListener('click', e => {
    e.preventDefault();

    $$('.product').forEach(p => {
        p.style.display = 'flex';
    });

    $('#searchInput').value = '';
});

// ==================== AGENDAMENTO ====================

const backdrop = $('#modalBackdrop');

$$('.book-service').forEach(b => {
    b.addEventListener('click', () => {
        $('#serviceSelect').value = b.dataset.service;

        $('#modalTitle').textContent =
            b.dataset.service === 'Hotel e Creche'
                ? 'Consulte disponibilidade'
                : 'Agende seu atendimento';

        backdrop.classList.add('open');
        $('#clientName').focus();
    });
});

function closeModal() {
    backdrop.classList.remove('open');
}

$('#modalClose').addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
});

// ==================== WHATSAPP ====================

$('#bookingForm').addEventListener('submit', e => {
    e.preventDefault();

    const n = $('#clientName').value;
    const p = $('#petName').value;
    const s = $('#serviceSelect').value;
    const phone = $('#clientPhone').value;

    const msg =
        `Olá, PetFeliz! Meu nome é ${n}. ` +
        `Gostaria de solicitar ${s} para meu pet ${p}. ` +
        `Meu telefone: ${phone}.`;

    window.open(
        'https://wa.me/5500000000000?text=' + encodeURIComponent(msg),
        '_blank'
    );

    closeModal();
    toast('Solicitação preparada para envio pelo WhatsApp!');
});

// ==================== NEWSLETTER ====================

$('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();

    const input = e.target.querySelector('input[type="email"]');
    const email = input.value.trim().toLowerCase();

    let emails = JSON.parse(localStorage.getItem('petfeliz_emails')) || [];

    if (emails.includes(email)) {
        toast('Este e-mail já está cadastrado.');
        return;
    }

    emails.push(email);

    localStorage.setItem('petfeliz_emails', JSON.stringify(emails));

    toast('Obrigado! Seu e-mail foi cadastrado com sucesso.');

    e.target.reset();
});