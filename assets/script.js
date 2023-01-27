let listaQuizzes;
// Obter todos os quizzes
function carregarQuizz(resposta){
    console.log(resposta);
    listaQuizzes = resposta.data;
    console.log(listaQuizzes);
    const quizz = document.querySelector('ul');
    quizz.innerHTML = '';
    for (let index = 0; index < resposta.data.length; index++){
        const id = resposta.data[index].id;
        const title = resposta.data[index].title;
        const image = resposta.data[index].image;
        const li = `
        <li id = "${id}" onclick="quizzSelecionado(this)">
            <p>${title}</p>
        </li>`;
        quizz.innerHTML += li;
        document.getElementById(`${id}`).style.backgroundImage = `url('${image}')`;
    }
}
function naoCarregou(erro) {
    console.log("ERRO");
    console.log(erro);
}
function carregarQuizzes(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promese.then(carregarQuizz);
    promese.catch(naoCarregou);
}
carregarQuizzes();

// Selecionar um quizz específico ao clicar
function abrirQuizz(resposta){
    console.log(resposta);
}
function nãoAbriuQuizz(erro){
    console.log(erro);
}
function quizzSelecionado(selecionado){
    const quiz = selecionado.id;
    console.log(quiz);
    const promese = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quiz}`);
    promese.then(abrirQuizz);
    promese.catch(nãoAbriuQuizz);
}

// Criar Quizz
function criarQuizz() {
    const tela01 = document.querySelector(".tela01");
    tela01.classList.add('hide');
    const tela03 = document.querySelector(".tela03");
    tela03.classList.remove('hide');
}

function acharQuiz(id) {
    id = Number(id);
    for (let index = 0; index < listaQuizzes.length; index++) {
        if (listaQuizzes[index].id === id)
            return listaQuizzes[index];
    }
    return null;
}

function exibirQuizzes(liQuizz) {
    const quizzExibido = acharQuiz(liQuizz.id);
    const main = document.querySelector("main");
    main.innerHTML = `<figure class="tituloQuiz">
                        <h1>${quizzExibido.title}</h1>
                      </figure>`;

    document.querySelector(".tituloQuiz").style.backgroundImage = 
    `url('${quizzExibido.image}')`;
}
