// Tela 01
const quizz = `
<li>
    <p>Título do quizz</p>
</li>`;
// Obter quizzes
function carregarQuizz(resposta){
    console.log("foiii");
    console.log(resposta);
}
function naoCarregou(erro){
    console.log("ERRO");
    console.log(erro);
}
function carregarQuizzes() {
    const promese = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promese.then(carregarQuizz);
    promese.catch(naoCarregou);
}
// Criar Quizz
function criarQuizz(){
}