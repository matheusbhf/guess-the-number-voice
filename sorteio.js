// Sorteio do número

const menorValor = 1;
const maiorValor = 1000;
let numeroSorteado = sortearNum();

function sortearNum () {
    return Math.ceil(Math.random() * maiorValor +1);
}

console.log(numeroSorteado);

const elementoMenor = document.getElementById("menor_valor");
elementoMenor.innerHTML = menorValor;

const elementoMaior = document.getElementById("maior-valor");
elementoMaior.innerHTML = maiorValor;




// Reconhecimento de Fala

const elementoChute = document.getElementById('guess');
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
recognition.lang = "pt-Br";

// Start

const botaoStart = document.getElementById("btn-start");

botaoStart.addEventListener("click", () =>{
    recognition.start();
    botaoStart.style.display = "none"; 
})



recognition.addEventListener("result", fala);

function fala(e) {
    let number2 = e.results[0][0].transcript;
    mostraNaTela(number2);
    checkIfItsOk(number2);
}


function mostraNaTela(number2){
    elementoChute.innerHTML = `<div>Você disse:</div>
    <span class="box">${number2}</span>
    `
}

recognition.addEventListener("end", () => {
    recognition.start();
});




// Validação de números

function checkIfItsOk(palpite) {

    const numero = parseInt(palpite); 

    if(seInvalido(numero)) {

        elementoChute.innerHTML += `<div>Valor inválido</div>`;

        return
    };

    numberInRange(numero);

    seAcertou(numero);

    
}

function seAcertou(numero) {
    if (numero === numeroSorteado) {
        document.body.innerHTML = `<h2>Parabéns, você acertou!!</h2>
        <h3>O número era: ${numeroSorteado}</h3>
        <button id="jogar-novamente" class="jogar">Jogar Novamente</button>
        `;
    }
    else if (numero > numeroSorteado) {
        elementoChute.innerHTML = `<div>Você disse:</div>
        <span class="box">${numero}</span>
        <div>O número secreto é menor que seu palpite, tente novamente</div>`
    }
    else {
        elementoChute.innerHTML = `<div>Você disse:</div>
        <span class="box">${numero}</span>
        <div>O número secreto é maior que seu palpite, tente novamente</div>`
    }
}

function numberInRange(numero) {
    if (numero > maiorValor || numero < menorValor) {
        elementoChute.innerHTML += `<div>O seu palpite precisa estar entre ${menorValor} e ${maiorValor}</div>`;
        return
    }
}

function seInvalido(numero) {
    return Number.isNaN(numero)
}


// Jogar novamente


document.body.addEventListener("click", (e) =>{
    if (e.target.id == "jogar-novamente") {
        window.location.reload()
    }
})



