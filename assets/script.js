// Array que tem que ser inserido as informações do novo Quizz feito pelo usuário
let quizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
}

let quizzAxios = new Object;
let formulario = document.querySelector(".formulario");
let formulario2 = document.querySelector(".formulario2");
let formulario3 = document.querySelector(".formulario3");

let divPerguntas = document.querySelector(".perguntas");
let divNiveis = document.querySelector(".niveis");

let formularioNiveis1 = document.querySelector(".formularioNiveis1");
let formularioNiveis2 = document.querySelector(".formularioNiveis2");
let formularioNiveis3 = document.querySelector(".formularioNiveis3");

let contadorScroll = 1, contadorAcertos = 0, maxPerguntas, levels, arrRespostas, selectedQuizz, flagURL, flagCampos1NaoVazios, flagCampos2NaoVazios, flagCampos3NaoVazios, flagFormulario2Setado = false, flagFormulario3Setado = false;
let flagNiveisOk = false, flagTituloOK = false, flagURLTitulo = false;
let quantidadePerguntas = 0; quantidadeNiveis = 0;

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

function exibirQuizz() {

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


    maxPerguntas = selectedQuizz.questions.length;
    levels = selectedQuizz.levels;

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
            if (element.isCorrectAnswer)
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

    document.querySelector("header").scrollIntoView(true);
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

function sucessoQuizz(selected) {
    selectedQuizz = selected.data;
    exibirQuizz();
}

// Selecionar um quizz específico ao clicar
function quizzSelecionado(selecionado) {
    const quiz = Number(selecionado.id);
    const promese = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quiz}`);
    promese.then(sucessoQuizz);
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
function renderizarPerguntas() {

    let btnPerguntas = document.querySelector(".divButton");
    btnPerguntas.classList.remove('hide');
    let titulo = document.querySelector(".divTitulo");
    titulo.classList.add('hide');
    let perguntas = document.querySelector(".perguntas");
    perguntas.classList.remove('hide');


}
function renderizarNiveis() {
    let btnPerguntas = document.querySelector(".divButton");
    btnPerguntas.classList.add('hide');
    const perguntas = document.querySelector(".perguntas");
    perguntas.classList.add('hide');
    const niveis = document.querySelector(".niveis");
    niveis.classList.remove('hide');
    let btnNiveis = document.querySelector(".divBotaoFianlizarCriacao");
    btnNiveis.classList.remove('hide');
}

function quizzFinalizado() {
    const niveis = document.querySelector(".niveis");
    niveis.classList.add('hide');
    const botao = document.querySelector(".divBotaoFianlizarCriacao");
    botao.classList.add('hide');
    const finalizado = document.querySelector(".finalizado");
    finalizado.classList.remove('hide');
    postQuizzAxios();

    verificarInputsDoNivel();

    if (flagNiveisOk === true) {

        const niveis = document.querySelector(".niveis");
        niveis.classList.add('hide');
        const botao = document.querySelector(".divBotaoFianlizarCriacao");
        botao.classList.add('hide');
        const finalizado = document.querySelector(".finalizado");
        finalizado.classList.remove('hide');

        for (let i = 1; i <= quantidadeNiveis; i++) {
            cadastrarNiveisNoQuizz(i);
        }

        postQuizzAxios();

    } else {

        alert("desculpe ocorreu um erro, tente novamente");
        voltarHome();
    }
}

function voltarHome() {
    window.location.reload();
}
// fim interação tela 3

function processarResultados() {

    const tela02 = document.querySelector(".tela02");

    const porcentLevel = Math.round((contadorAcertos / maxPerguntas) * 100);

    let tituloLevel, imgLevel, descLevel, indice, maior = 0;

    for (let index = 0; index < levels.length; index++) {
        if (levels[index].minValue <= porcentLevel && levels[index].minValue >= maior)
            indice = index;
    }

    tituloLevel = levels[indice].title;
    imgLevel = levels[indice].image;
    descLevel = levels[indice].text;

    tela02.innerHTML +=
        `<section class="pergunta fimQuizz">
            <div class="color fimColor">
                <h1>${porcentLevel}% de acerto: ${tituloLevel}</h1>
            </div>
            <div class="flexFim">
                <img src="${imgLevel}" alt="imagem">
                <p>${descLevel}</p>
            </div>
        </section>

        <button class="reiniciarQuizz" onclick="reinicar()">
            Reiniciar Quizz
        </button>

        <button class="voltarInicio" onclick="voltarHome()">
            Voltar para Home
        </button>`;

    document.querySelectorAll(".pergunta")[contadorScroll].scrollIntoView(true);
}

function scroll() {
    if (contadorScroll < maxPerguntas) {
        document.querySelectorAll(".pergunta")[contadorScroll].scrollIntoView(true);
        contadorScroll++;
    }
    else {
        processarResultados();
    }
}

function tratarEscolha(resposta) {
    arrRespostas = resposta.parentNode.parentNode.querySelectorAll(".miniContainer");

    arrRespostas.forEach(object => {
        if (object === resposta && resposta.classList.contains("respostaCerta")) {
            resposta.lastElementChild.style.color = "#009C22"
            resposta.classList.add("impedirClique");
            contadorAcertos++;
        }
        else if (object === resposta && resposta.classList.contains("respostaErrada")) {
            resposta.lastElementChild.style.color = "#FF4B4B"
            resposta.classList.add("impedirClique");
        }
        else if (object.classList.contains("respostaCerta")) {
            object.lastElementChild.style.color = "#009C22"
            object.classList.add("impedirClique");
            object.classList.add("efeitoResposta");
        }
        else if (object.classList.contains("respostaErrada")) {
            object.lastElementChild.style.color = "#FF4B4B"
            object.classList.add("impedirClique");
            object.classList.add("efeitoResposta");
        }

    });

    setTimeout(scroll, 2000);
}

function reinicar() {

    const tela02 = document.querySelector(".tela02");

    tela02.innerHTML = "";

    contadorScroll = 1;
    contadorAcertos = 0;

    exibirQuizz();

    document.querySelector("header").scrollIntoView(true);
}

//JS DA TELA 3 

function prosseguirParaPerguntas() {

    camposFormTitulo = document.querySelector(".formularioTitulo").getElementsByTagName("input");
    validarTitulo(camposFormTitulo);

    if (flagTituloOK === true && flagURLTitulo === true) {

        cadastrarTituloQuizz(camposFormTitulo);

        divPerguntas.innerHTML = '';

        for (let i = 1; i <= quantidadePerguntas; i++) {
            criarDivPerguntas(i);
        }

        renderizarPerguntas();

    }
}

function cadastrarTituloQuizz(campos) {
    for (let i = 0; i < campos.length; i++) {
        if (campos[i].className === "tituloQuizz") {
            quizz.title = campos[i].value;
        }
        if (campos[i].className === "urlTituloQuizz") {
            quizz.image = campos[i].value;
        }
        if (campos[i].className === "quantPerguntasQuizz") {
            quantidadePerguntas = campos[i].value;
        }
        if (campos[i].className === "quantNiveisQuizz") {
            quantidadeNiveis = campos[i].value;
        }
    }

}

function validarTitulo(campos) {

    for (let i = 0; i < campos.length; i++) {

        if (campos[i].value === "") {
            flagTituloOK = false;
            alert("existem campos vazios, por favor complete todos os campos");
        } else if (campos[i].className === "tituloQuizz" && !verificaVinteCaracteres(campos[i].value)) {
            flagTituloOK = false;
            alert("O texto do título tem que ter mais de 20 caractéres !");
        }
        else if (campos[i].className === "tituloQuizz") {
            flagTituloOK = true;
        }

        if (campos[i].className === "urlTituloQuizz") {
            if (isValidHttpUrl(campos[i].value) === true) {
                campos[i].style.border = "1px solid #D1D1D1";
                flagURLTitulo = true;
            } else {
                alert("existem URLS inválidas no título");
                campos[i].style.border = "1px red solid";
                flagURLTitulo = false;
            }

        }
    }
}

function criarDivPerguntas(i) {
    if (i === 1) {
        divPerguntas.innerHTML += `
            <h3>Crie suas perguntas</h3>
            `;
    }

    divPerguntas.innerHTML += `
                <div class"barra"></div>
                <div class"barra"></div>
                <div class"formulario" id=Pergunta${i}>
                <div class"barra"></div><div class"barra"></div>
                <span>Pergunta ${i}</span>
                <div class"barra"></div>
                <input type="text" class="input_textoPergunta" id="input_textoPergunta" placeholder="Texto da pergunta" />
                <input type="text" class="input_corDeFundo" placeholder="Cor de fundo da pergunta" />
                
                <span class="span_respostaCorreta">Resposta correta </span>
                <input type="text" class="input_respostaCorreta" placeholder="Resposta correta" />
                <input type="text" class="input_URL1" placeholder="URL da imagem" />

                <span>Respostas incorretas</span>
                <input type="text" class="input_respostaIncorreta1" placeholder="Resposta incorreta ${i}" />
                <input type="text" class="input_URL2" placeholder="URL da imagem ${i}" />

                <div class="barra"></div>

                <input type="text" class="input_respostaIncorreta2" placeholder="Resposta incorreta ${i + 1}" />
                <input type="text" class="input_URL3" placeholder="URL da imagem ${i + 1}" />

                <div class="barra"></div>

                <input type="text" class="input_respostaIncorreta3" placeholder="Resposta incorreta ${i + 2}" />
                <input type="text" class="input_URL4" placeholder="URL da imagem ${i + 2}" />

            </div>
            <div class"barra"></div>
            <div class"barra"></div>
        `;


}

function criarDivNiveis() {

    for (let i = 1; i <= quantidadeNiveis; i++) {
        if (i === 1) {
            divNiveis.innerHTML += `
            <h3>Agora, decida os níveis</h3>
            `;
        }
        divNiveis.innerHTML += `
        
             <div class="Niveis" id="nivel${i}">
                            
                            <span>Nível ${i}</span>
                            <input type="text" class="nivelTitulo" placeholder="Título do nível" />
                            <input type="text" class="percentualAcertoMinimo" placeholder="% de acerto mínima" />
                            <input type="text" class="URL_img_nivel_input" placeholder="URL da imagem do nível" />
                            <input type="text" class="nivel_Descript" placeholder="Descrição do nível" />
    
    
            </div>
            <div class="barra"></div>
        
        
        `;
    }


}

function validar_Perguntas() {
    // debugger;
    divNiveis.innerHTML += "";
    verificarCamposVaziosEURL();

    if (flagCampos1NaoVazios === true && flagURL === true) {


        criarDivNiveis();
        renderizarNiveis();
        for (let i = 1; i <= quantidadePerguntas; i++) {
            cadastrarVariaveisNoQuizz(i);
        }

    } else {

        alert("desculpe ocorreu um erro, tente novamente");
        voltarHome();
    }
}
function cadastrarVariaveisNoQuizz(index) {
    //debugger;
    const blocoPergunta = document.getElementById(`Pergunta${index}`);



    const tituloPergunta = blocoPergunta.querySelector(".input_textoPergunta");
    const color = blocoPergunta.querySelector(".input_corDeFundo");



    const textcorreto = blocoPergunta.querySelector(".input_respostaCorreta");
    const imagecorreta = blocoPergunta.querySelector(".input_URL1");


    const textincorreto1 = blocoPergunta.querySelector(".input_respostaIncorreta1");
    const imageincorreta1 = blocoPergunta.querySelector(".input_URL2");


    const textincorreto2 = blocoPergunta.querySelector(".input_respostaIncorreta2");
    const imageincorreta2 = blocoPergunta.querySelector(".input_URL3");


    const textincorreto3 = blocoPergunta.querySelector(".input_respostaIncorreta3");
    const imageincorreta3 = blocoPergunta.querySelector(".input_URL4");


    const perguntas = {
        title: tituloPergunta.value,
        color: color.value,
        answers: [
            {
                text: textcorreto.value,
                image: imagecorreta.value,
                isCorrectAnswer: true
            },
            {
                text: textincorreto1.value,
                image: imageincorreta1.value,
                isCorrectAnswer: false
            },
            {
                text: textincorreto2.value,
                image: imageincorreta2.value,
                isCorrectAnswer: false
            },
            {
                text: textincorreto3.value,
                image: imageincorreta3.value,
                isCorrectAnswer: false
            },
        ]
    };

    quizz.questions.push(perguntas);


    console.log("Questions " + perguntas);
    console.log("Quizz " + quizz);

}


function limparCampos() {
    campos = document.querySelectorAll("input");
    for (let i = 0; i < campos.length; i++) {
        campos[i].value = "";
        flagCamposNaoVazios = false;
    }
}

function verificarCamposVaziosEURL() {
    //debugger;
    flagURL = false;
    flagCampos1NaoVazios = false;

    let campos = divPerguntas.getElementsByTagName("input");

    for (let i = 0; i < campos.length; i++) {
        if (campos[i].value === "") {
            flagCampos1NaoVazios = false;
            campos[i].style.border = "1px red solid";
            alert("existem campos vazios, por favor complete todos os campos");
        } else {
            flagCampos1NaoVazios = true;
            campos[i].style.border = "none";

            if (campos[i].className === "input_textoPergunta") {

                if (verificaVinteCaracteres(campos[i].value)) {
                    campos[i].style.border = "none";
                }
                else {
                    campos[i].style.border = "1px red solid";
                    alert("o texto da resposta tem que ter mais de 20 caracteres");

                }

            }

            /*     if(campos[i].className==="input_corDeFundo"){
                    if(campos[i].value.startsWith("#")===false || campos[i].value.replace(/[^a-fA-f09#]/g,"")!==campos[i].value || campos[i].value.length!==7){
                        campos[i].style.border="1px red solid";
                        alert("por favor preencha a cor corretamente"); 
                    }else{
                        campos[i].style.border="none";
                    }
                }

             */ if (i >= 3) {
                if (campos[i].className === `input_URL${i - 2}`) {
                    if (isValidHttpUrl(campos[i].value) === true) {
                        campos[i].style.border = "none";
                        flagURL = true;
                    } else {

                        alert("existem URLS INVALIDAS");
                        campos[i].style.border = "1px red solid";
                        flagURL = false;
                    }

                }
            }


        }
    }


}

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function verificarInputsDoNivel() {

    let campos = divNiveis.getElementsByTagName("input");

    for (let i = 0; i < campos.length; i++) {
        if (campos[i].value === "") {
            flagNiveisOk = false;
            alert("não pode haver campos vazios");
        } else {
            flagNiveisOk = true;
        }
    }

}

function verificaVinteCaracteres(string) {
    if (string.length >= 20)
        return true;
    return false;
}

function cadastrarNiveisNoQuizz(index) {
    //debugger;
    const blocoNivel = document.getElementById(`nivel${index}`);
    const tituloNivel = blocoNivel.querySelector(".nivelTitulo");
    const imageNivel = blocoNivel.querySelector(".URL_img_nivel_input");
    const textNivel = blocoNivel.querySelector(".nivel_Descript");
    const percentNivel = blocoNivel.querySelector(".percentualAcertoMinimo");

    const niveis = {

        title: tituloNivel.value,
        image: imageNivel.value,
        text: textNivel.value,
        minValue: percentNivel.value
    };

    quizz.levels.push(niveis);

    console.log("Quizz " + quizz);
};

// Enviar quizzes do usuário para a página home

function colocarQuizzNoHome(dadosDeserializados) {
    const semQuizzes = document.querySelector(".criacao-quizzes");
    semQuizzes.classList.add("hide");
    const quizzesCriados = document.querySelector(".quizzes-criados");
    quizzesCriados.classList.remove("hide");

    const quizzUsuario = document.querySelector('.criados');
    quizzUsuario.innerHTML = '';
    for (let index = 0; index < dadosDeserializados.data.length; index++) {
        const id = dadosDeserializados.data[index].id;
        const title = dadosDeserializados.data[index].title;
        const image = dadosDeserializados.data[index].image;
        const li = `
        <li id = "${id}" onclick="quizzSelecionado(this)">
            <p>${title}</p>
        </li>`;
        quizzUsuario.innerHTML += li;
        document.getElementById(`${id}`).style.background =
            `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${image}')`;
    }
}

function enviarQuizzHome(resposta) {
    console.log("deu bom!");
    console.log(resposta);
    const quizzSerializada = localStorage.getItem(resposta.data[index].id);
    const dadosDeserializados = JSON.parse(quizzSerializada);
    colocarQuizzNoHome(dadosDeserializados);
}

function naoEnviou(erro) {
    console.log("nao deu")
    console.log(erro);
}

function postQuizzAxios() {
    const dadosSerializado = JSON.stringify(quizz);
    localStorage.setItem(quizz);

    const promese = axios.post(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`, dadosSerializado);
    promese.then(enviarQuizzHome);
    promese.catch(naoEnviou);
}