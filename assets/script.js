// Obter todos os quizzes
function carregarQuizz(resposta) {
    const quizz = document.querySelector('ul');
    quizz.innerHTML = '';
    for (let index = 0; index < resposta.data.length; index++) {
        const id = resposta.data[index].id;
        const title = resposta.data[index].title;
        const image = resposta.data[index].image;
        const li = `
        <li id = "${id}" onclick="quizzSelecionado(this)">
            <p>${title}</p>
        </li>`;
        quizz.innerHTML += li;
        document.getElementById(`${id}`).style.background =
            `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${image}')`;
    }
}

function naoCarregou(erro) {
    console.log("ERRO");
    console.log(erro);
}

// Obter todos os quizzes
function carregarQuizzes() {
    const promese = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promese.then(carregarQuizz);
    promese.catch(naoCarregou);
}
carregarQuizzes();

// erro ao abrir quiz
function nãoAbriuQuizz(erro) {
    console.log(erro);
}

// exibir quiz selecionado

function exibirQuizz(selectedQuizz) {

    selectedQuizz = selectedQuizz.data;

    document.querySelector("main").classList.add("larguraTotal");
    document.querySelector(".tela01").classList.add('hide');
    document.querySelector(".tela02").classList.remove('hide');
    document.querySelector(".tela03").classList.add('hide');


    const tela02 = document.querySelector(".tela02");
    tela02.innerHTML = `<figure class="tituloQuiz">
                        <h1>${selectedQuizz.title}</h1>
                      </figure>`;

    document.querySelector(".tituloQuiz").style.background =
        `linear-gradient(0deg, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('${selectedQuizz.image})`;

    for (let index = 0; index < selectedQuizz.questions.length; index++) {
        selectedQuizz.questions[index].answers = embaralharRespotas(selectedQuizz.questions[index].answers);
    }

    selectedQuizz.questions.forEach(perguntas => {

        let res = [];

        let titulo = `<section class="pergunta">
                        <div class="color" style="background-color: ${perguntas.color};">
                            <h1>${perguntas.title}</h1>
                        </div>`;

        function respostaCorreta(element) {
            if(element.isCorrectAnswer)
                    res.push('respostaCerta');
                else
                    res.push('respostaErrada');
        }

        if (perguntas.answers.length === 2) {

            perguntas.answers.forEach(respostaCorreta);

            tela02.innerHTML += titulo +
            `   <div class="flex">
                    <div class="miniContainer ${res[0]}" onclick="tratarEscolha(this)">
                        <img src="${perguntas.answers[0].image}" alt="imagem">
                        <p>${perguntas.answers[0].text}</p>
                    </div>
                    <div class="miniContainer margin ${res[1]}" onclick="tratarEscolha(this)">
                        <img src="${perguntas.answers[1].image}" alt="imagem">
                        <p>${perguntas.answers[1].text}</p>
                    </div>
                </div>
            </section>`

            res = [];
        }
        else if (perguntas.answers.length === 3) {
            
            perguntas.answers.forEach(respostaCorreta);

            tela02.innerHTML += titulo;
            `   <div class="flex">
                    <div>
                        <div class="miniContainer ${res[0]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[0].image}" alt="imagem">
                            <p>${perguntas.answers[0].text}</p>
                        </div>
                        <div class="miniContainer ${res[1]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[1].image}" alt="imagem">
                            <p>${perguntas.answers[1].text}</p>
                        </div>
                    </div>
                    <div>
                        <div class="miniContainer margin ${res[2]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[2].image}" alt="imagem">
                            <p>${perguntas.answers[2].text}</p>
                        </div>
                    </div>
                </div>
            </section>`

            res = [];
        }
        else if (perguntas.answers.length === 4) {

            perguntas.answers.forEach(respostaCorreta);

            tela02.innerHTML += titulo +
            `   <div class="flex">
                    <div>
                        <div class="miniContainer ${res[0]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[0].image}" alt="imagem">
                            <p>${perguntas.answers[0].text}</p>
                        </div>
                        <div class="miniContainer ${res[1]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[1].image}" alt="imagem">
                            <p>${perguntas.answers[1].text}</p>
                        </div>
                    </div>
                    <div>
                        <div class="miniContainer margin ${res[2]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[2].image}" alt="imagem">
                            <p>${perguntas.answers[2].text}</p>
                        </div>
                        <div class="miniContainer margin ${res[3]}" onclick="tratarEscolha(this)">
                            <img src="${perguntas.answers[3].image}" alt="imagem">
                            <p>${perguntas.answers[3].text}</p>
                        </div>
                    </div>
                </div>
            </section>`
            
            res = [];
        }
    });

}

function embaralharRespotas(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

// Selecionar um quizz específico ao clicar
function quizzSelecionado(selecionado) {
    const quiz = Number(selecionado.id);
    const promese = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quiz}`);
    promese.then(exibirQuizz);
    promese.catch(nãoAbriuQuizz);
}

// Criar Quizz
function criarQuizz() {
    const tela01 = document.querySelector(".tela01");
    tela01.classList.add('hide');
    const tela03 = document.querySelector(".tela03");
    tela03.classList.remove('hide');
}
// Intereção tela 03 
function irParaNiveis(){
    const perguntas = document.querySelector(".perguntas");
    perguntas.classList.add('hide');
    const niveis = document.querySelector(".niveis");
    niveis.classList.remove('hide');
}
function quizzFinalizado(){
    const niveis = document.querySelector(".niveis");
    niveis.classList.add('hide');
    const finalizado = document.querySelector(".finalizado");
    finalizado.classList.remove('hide');
}
function voltarHome(){
    window.location.reload();
}