// Tela 01

const quizz = `
<li>
    <p>Título do quizz</p>
</li>`;

function carregarQuizz(resposta) {
    console.log(resposta.data);
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
    console.log(`teste`);
}

// exibir quiz selecionado
function exibirQuizz(selectedQuizz) {
    selectedQuizz = selectedQuizz.data;
    const main = document.querySelector("main");
    main.innerHTML = `<figure class="tituloQuiz">
                        <h1>${selectedQuizz.title}</h1>
                      </figure>`;

    document.querySelector(".tituloQuiz").style.background = 
    `linear-gradient(0deg, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('${selectedQuizz.image})`;

}


// Selecionar um quizz específico ao clicar
function quizzSelecionado(selecionado) {
    const quiz = Number(selecionado.id);
    console.log(quiz);
    const promese = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quiz}`);
    promese.then(exibirQuizz);
    promese.catch(nãoAbriuQuizz);
}

// Criar Quizz
function criarQuizz() {
}