import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');

botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);

function mostraPalavrasChave() {
    const texto = document.querySelector('#entrada-de-texto').value;
    const campoResultado = document.querySelector('#resultado-palavrachave');
    const palavrasChave = processaTexto(texto);

    campoResultado.textContent = palavrasChave.join(', ');
}

function processaTexto(texto) {
    // Divide texto em palavras (Unicode), remove vazios
    let palavras = texto.split(/\P{L}+/u).filter(Boolean);

    // Converte para minúsculas
    for (let i in palavras) {
        palavras[i] = palavras[i].toLowerCase();
    }

    // Remove palavras ruins e muito curtas
    palavras = tiraPalavrasRuins(palavras);

    // Conta frequência das palavras
    const frequencias = contaFrequencias(palavras);

    // Ordena pela frequência descrescente
    let ordenadas = Object.keys(frequencias).sort((p1, p2) => frequencias[p2] - frequencias[p1]);

    // Retorna as 10 mais frequentes
    return ordenadas.slice(0, 10);
}

function contaFrequencias(palavras) {
    let frequencias = {};
    for (let palavra of palavras) {
        frequencias[palavra] = (frequencias[palavra] || 0) + 1;
    }
    return frequencias;
}

function tiraPalavrasRuins(palavras) {
    const palavrasBoas = [];
    for (let palavra of palavras) {
        if (!PALAVRAS_RUINS.has(palavra) && palavra.length > 2) {
            palavrasBoas.push(palavra);
        }
    }
    return palavrasBoas;
}
