const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let cart = 0;

// NOTIFICAÇÕES
function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        t.classList.remove('show');
    }, 2600);
}

// MENU
$('#menuToggle').addEventListener('click', () => {
    $('#navLinks').classList.toggle('open');
});

$$('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
        $('#navLinks').classList.remove('open');
    });
});

// CARRINHO
$$('.add-cart').forEach(b => {
    b.addEventListener('click', () => {
        cart++;
        $('#cartCount').textContent = cart;
        toast(b.dataset.name + ' adicionado ao carrinho!');
    });
});

$('#cartBtn').addEventListener('click', () => {
    if (cart) {
        toast(
            `Seu carrinho tem ${cart} ${
                cart === 1 ? 'item' : 'itens'
            }. Para finalizar, fale com a loja pelo WhatsApp.`
        );
    } else {
        toast('Seu carrinho está vazio.');
    }
});

// CONTA DO CLIENTE
$('#accountBtn').addEventListener('click', () => {
    toast(
        'Área do cliente: entre em contato pelo WhatsApp para acessar sua conta.'
    );
});

// FILTRO DE PRODUTOS
function filterProducts(term) {
    let found = 0;

    $$('.product').forEach(p => {
        const show = (
            p.textContent + ' ' + p.dataset.category
        ).toLowerCase().includes(term.toLowerCase());

        p.style.display = show ? 'flex' : 'none';

        if (show) {
            found++;
        }
    });

    if (!found) {
        toast('Nenhum produto encontrado. Tente outra busca.');
    }
}

// BUSCA
$('#searchForm').addEventListener('submit', e => {
    e.preventDefault();

    filterProducts($('#searchInput').value.trim());

    $('#produtos').scrollIntoView({
        behavior: 'smooth'
    });
});

// CATEGORIAS
$$('.category').forEach(c => {
    c.addEventListener('click', () => {
        filterProducts(c.dataset.categoria);
    });
});

// LIMPAR FILTRO
$('#clearFilter').addEventListener('click', e => {
    e.preventDefault();

    $$('.product').forEach(p => {
        p.style.display = 'flex';
    });

    $('#searchInput').value = '';
});

// MODAL DE AGENDAMENTO
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

// FECHAR MODAL
function closeModal() {
    backdrop.classList.remove('open');
}

$('#modalClose').addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
    if (e.target === backdrop) {
        closeModal();
    }
});

// FORMULÁRIO DE AGENDAMENTO
$('#bookingForm').addEventListener('submit', e => {
    e.preventDefault();

    const name = $('#clientName').value;
    const pet = $('#petNameInput').value;
    const service = $('#serviceSelect').value;
    const phone = $('#clientPhone').value;

    const msg = `Olá, PetFeliz! Meu nome é ${name}. Gostaria de solicitar ${service} para meu pet ${pet}. Meu telefone: ${phone}.`;

    window.open(
        'https://wa.me/5500000000000?text=' +
        encodeURIComponent(msg),
        '_blank'
    );

    closeModal();

    toast('Solicitação preparada para envio pelo WhatsApp!');
});

// NEWSLETTER
$('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();

    toast('Obrigado! Seu e-mail foi cadastrado para novidades.');

    e.target.reset();
});