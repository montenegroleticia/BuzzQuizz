// Obter todos os quizzes
function carregarQuizz(resposta){
    console.log(resposta);
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
function naoCarregou(erro){
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
function criarQuizz(){
}