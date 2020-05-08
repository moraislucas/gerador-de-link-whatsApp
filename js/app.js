// Botão para gerar link
const btnGerar = document.querySelector('.gerar-link');

// Inputs com dados de NumeroTel e Mensagem
const numero = document.querySelector('.numero');
let mensagem = document.querySelector('.mensagem');

// Dados Modal
const modal = document.querySelector('.modal-resultado');
const saidaLink = document.querySelector('.link-pronto')

// Modal Erro
const modalErro = document.querySelector('.modal-erro');

// Btn copiar e gerar novo link
const btnCopiar = document.querySelector('.copiar');
const btnNovo = document.querySelector('.novo-link');

// btn como funciona
const btnInstrucoes = document.querySelector('.instrucoes');

// btn saber mais
const btnRedirect = document.querySelector('.redirect');

// Função fechar modal
function initFechaModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id == modalId || e.target.className == 'fechar' || e.target.id ==
                'btn-novo')
                modal.classList.remove('ativo');
        });
        window.addEventListener('keyup', (e) => {
            if (e.key == 'Escape')
                modal.classList.remove('ativo')
        });
    }

}

initFechaModal('modal');


function caseError() {
    modalErro.classList.add('ativo');
    numero.classList.add('erro');
    mensagem.classList.add('erro');
}

function noError() {
    // Class 
    modal.classList.add('ativo');
    modalErro.classList.remove('ativo');
    numero.classList.remove('erro');
    mensagem.classList.remove('erro');
}

function limpaNumero(numero) {
    return numero.replace(/[. -]/g, '');
}

function gerarLink(numero, mensagem) {
    mensagem = mensagem.replace(/[ ]/g, '%20');
    return `https://api.whatsapp.com/send?phone=55${numero}&text=${mensagem}`;
}


function handleClick(event) {
    event.preventDefault();
    if (numero.value.length && mensagem.value.length) {
        noError();
        saidaLink.value = gerarLink(numero.value, mensagem.value);
    } else {
        caseError();
    }
}

function handleCopy(event) {
    event.preventDefault();
    saidaLink.select();
    document.execCommand('copy');
    btnCopiar.innerText = 'COPIADO!';
}

function novoLink(event) {
    event.preventDefault();
    numero.value = '';
    numero.focus();
    mensagem.value = '';
    btnCopiar.innerText = 'COPIAR';
}

function instrucoes(event) {
    event.preventDefault();
    document.querySelector('.modal-instrucoes').classList.add('ativo');
    initFechaModal('modal-infos');
}

numero.addEventListener('change', () => numero.value = limpaNumero(numero.value));
btnGerar.addEventListener('click', handleClick);
btnCopiar.addEventListener('click', handleCopy);
btnNovo.addEventListener('click', novoLink);
btnInstrucoes.addEventListener('click', instrucoes);

btnRedirect.addEventListener('click', (e) => {
    e.preventDefault();
    open('https://api.whatsapp.com/send?phone=5511953948814&text=Ol%C3%A1,%20gostaria%20de%20maiores%20detalhes%20sobre%20os%20servi%C3%A7os');
});