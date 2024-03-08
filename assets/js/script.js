const btn_menu = document.querySelector('.btn');
const fundo_menu = document.querySelector('.fundo_menu');

const abrirFecharMenu = () => {
    Object.values(opcao_menu_header).forEach(opcao_menu => {
        opcao_menu.classList.remove('aberto');
    });

    submenuAberto ? tempo = 300 : tempo = 0;
    let btn_menu_clicado = btn_menu.classList.contains('clicado');
    !btn_menu_clicado ? tempo = 0 : null;
   
    setTimeout(() => {
        btn_menu.classList.toggle('clicado');
        fundo_menu.classList.toggle('visivel');
        submenuAberto = false;
    }, tempo);
}

const fecharMenu = () => { abrirFecharMenu(); }

const opcao_menu_header = document.querySelectorAll('.titulo_opcao_menu');
let submenuAberto, hierarquia, indiceHierarquia;

function abrirSubmenu(elemento) {
    const elementoClicado = elemento.target;
    
    Object.values(opcao_menu_header).forEach(opcao_menu => {
        if(elementoClicado == opcao_menu || elementoClicado == opcao_menu.firstElementChild) {
            opcao_menu.classList.toggle('aberto');
            submenuAberto = verificarSubmenuAberto();
        } else {
            opcao_menu.classList.remove('aberto');
        }
    });
}

document.addEventListener('click', event => {
    opcao_menu_header.forEach(elemento => {
        if(event.target != elemento && event.target != elemento.firstElementChild && event.target != fundo_menu) {
            elemento.classList.remove('aberto');
            submenuAberto = verificarSubmenuAberto();
        }
    })
})

function verificarSubmenuAberto() {
    const classesSubmenu = [];
    opcao_menu_header.forEach(opcao_menu => {
        classesSubmenu.push(opcao_menu);
    })

    const temSubmenuAberto = classesSubmenu.some(opcao_menu => {
        if(opcao_menu.classList.contains('aberto')) {
            return true;
        } else {
            return false;
        }
    })

    return temSubmenuAberto;
}

const cavaleirosDeOuro = {
    'Mú': 'Áries',
    'Aldebaran': 'Touro',
    'Saga': 'Gêmeos',
    'Máscara da morte': 'Câncer',
    'Aioria': 'Leão',
    'Shaka': 'Virgem',
    'Dohko': 'Libra',
    'Miro': 'Escorpião',
    'Aioros': 'Sagitário',
    'Shura': 'Capricórnio',
    'Camus': 'Aquário',
    'Afrodite': 'Peixes'
}

const cavaleirosDePrata = {
    'Algethi': 'Hércules',
    'Algol': 'Perseu',
    'Asterion': 'Cães de caça',
    'Babel': 'Centauro',
    'Capella': 'Auriga',
    'Dante': 'Cérbero',
    'Dio': 'Mosca',
    'Jamian': 'Corvo',
    'Marin': 'Águia',
    'Misty': 'Lagarto',
    'Moses': 'Baleia',
    'Orfeu': 'Lira',
    'Shina': 'Cobra',
    'Sírius': 'Cão Maior',
    'Ptolemy': 'Flecha'
}

const cavaleirosDeBronze = {
    'Seiya': 'Pégaso',
    'Shiryu': 'Dragão',
    'Hyoga': 'Cisne',
    'Shun': 'Andrômeda',
    'Ikki': 'Fênix',
    'Jabu': 'Unicórnio',
    'Geki': 'Urso',
    'Nachi': 'Lobo',
    'Ban': 'Leão menor',
    'Ichi': 'Hidra'
}

const cavaleiros = [cavaleirosDeOuro, cavaleirosDePrata, cavaleirosDeBronze];
const cavaleiros_disponiveis = document.querySelector('.cavaleiros_disponiveis');
const card_cavaleiro_escolhido = document.querySelector('.card_cavaleiro_escolhido');

function mostrarListagemDeCavaleiros(event) {
    btn_menu.classList.remove('clicado');
    fundo_menu.classList.remove('visivel');

    const card = document.querySelector('.card');
    const titulo_hierarquia  = document.getElementById('titulo_hierarquia');
    const voltar_cavaleiros_disponiveis = document.getElementById('voltar_cavaleiros_disponiveis');

    event.target.getAttribute('href') == '#cavaleiros' ?
    hierarquia = hierarquia :
    hierarquia = event.target.getAttribute('href').slice(1);
    
    const lista_de_cavaleiros = document.querySelector('.lista_de_cavaleiros');
    lista_de_cavaleiros.innerHTML = '';
    
    if(hierarquia == 'ouro') {
        indiceHierarquia = 0;
        titulo_hierarquia.innerText = 'Cavaleiros de ouro';
        voltar_cavaleiros_disponiveis.innerText = 'Voltar para cavaleiros de ouro';
        voltar_cavaleiros_disponiveis.setAttribute('href', '#ouro');
    } else if(hierarquia == 'prata') {
        indiceHierarquia = 1;
        titulo_hierarquia.innerText = 'Cavaleiros de prata';
        voltar_cavaleiros_disponiveis.innerText = 'Voltar para cavaleiros de prata';
        voltar_cavaleiros_disponiveis.setAttribute('href', '#prata');
    } else {
        indiceHierarquia = 2;
        titulo_hierarquia.innerText = 'Cavaleiros de bronze';
        voltar_cavaleiros_disponiveis.innerText = 'Voltar para cavaleiros de bronze';
        voltar_cavaleiros_disponiveis.setAttribute('href', '#bronze');
    }

    Object.keys(cavaleiros[indiceHierarquia]).forEach(cavaleiro => {
        lista_de_cavaleiros.innerHTML += 
        `<li>
            <a href="#${cavaleiro}" onclick="mostrarCavaleiroEscolhido(event)">${cavaleiro}</a>
            <img src="assets/images_miniatura/${cavaleiro}.webp" alt="${cavaleiro}">
        </li>`
    })

    card.classList.add('oculto');
    card_cavaleiro_escolhido.classList.remove('apresentado');
    cavaleiros_disponiveis.classList.add('apresentado');
}

function mostrarCavaleiroEscolhido(event) {
    const imagem_cavaleiro = document.getElementById('imagem_cavaleiro');
    const imagem_armadura = document.getElementById('imagem_armadura');

    const titulo_cavaleiro = document.querySelector('.title');
    const titulo_armadura = document.querySelectorAll('.title')[1];
    const cavaleiroEscolhido = event.target.textContent;

    if(hierarquia == 'ouro') {
        indiceHierarquia = 0;
    } else if(hierarquia == 'prata') {
        indiceHierarquia = 1;
    } else {
        indiceHierarquia = 2;
    }

    imagem_cavaleiro.src = `assets/images/${cavaleiroEscolhido}.webp`;
    imagem_cavaleiro.alt = `Imagem do ${cavaleiroEscolhido}`;
    imagem_armadura.src = `assets/images/armadura_do_${cavaleiroEscolhido}.webp`;
    
    Object.entries(cavaleiros[indiceHierarquia]).forEach(dado_cavaleiro => {
        if(dado_cavaleiro[0] == cavaleiroEscolhido) {
            titulo_cavaleiro.innerText = `${cavaleiroEscolhido} de ${dado_cavaleiro[1]}`;
            titulo_armadura.innerText = `Armadura de ${dado_cavaleiro[1]}`;
            imagem_armadura.alt = `Imagem da armadura de ${dado_cavaleiro[1]}`;
        }
    })

    cavaleiros_disponiveis.classList.remove('apresentado');
    card_cavaleiro_escolhido.classList.add('apresentado');
}

window.onscroll = () => scrollFunction();

function scrollFunction() {
    const header = document.querySelector('header');
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
        header.classList.add('cor_fundo_header');
    } else {
        header.classList.remove('cor_fundo_header');
    }
}