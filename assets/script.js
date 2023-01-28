// Obter todos os quizzes


let quizz = new Object;
let formulario1 = document.querySelector(".formulario1");
let formulario2 = document.querySelector(".formulario2");
let formulario3 = document.querySelector(".formulario3");

let formularioNiveis1 = document.querySelector(".formularioNiveis1");
let formularioNiveis2 = document.querySelector(".formularioNiveis2");
let formularioNiveis3 = document.querySelector(".formularioNiveis3");

let contadorScroll = 1, contadorAcertos = 0, maxPerguntas, levels, arrRespostas, selectedQuizz, flagURL, flagCampos1NaoVazios,flagCampos2NaoVazios,flagCampos3NaoVazios,flagFormulario2Setado=false,flagFormulario3Setado=false;

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
function irParaNiveis() {
    const perguntas = document.querySelector(".perguntas");
    perguntas.classList.add('hide');
    const niveis = document.querySelector(".niveis");
    niveis.classList.remove('hide');
}

function quizzFinalizado() {
    const niveis = document.querySelector(".niveis");
    niveis.classList.add('hide');
    const finalizado = document.querySelector(".finalizado");
    finalizado.classList.remove('hide');
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


function criarDivPerguntas(id){
      
    if(id ==='img_pergunta2'){
        formulario2.innerHTML ='';
        
        formulario2.innerHTML += `
                    <span>Pergunta 2</span>
                    <input type="text" class placeholder="Texto da pergunta"/>
                    <input type="text" placeholder="Cor de fundo da pergunta"/>

                    <span class="span_respostaCorreta">Resposta correta </span>
                    <input type="text" placeholder="Resposta correta"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem"/>

                    <span>Respostas incorretas</span>
                    <input type="text" placeholder="Resposta incorreta 1"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem 1"/>

                    <div class="barra"></div>

                    <input type="text" placeholder="Resposta incorreta 2"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem 2"/>

                    <div class="barra"></div>

                    <input type="text" placeholder="Resposta incorreta 3"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem 3"/>
        
        
        `;

    }
    flagFormulario2Setado = true;   
    if(id==='img_pergunta3'){
        formulario3.innerHTML ='';
        
        formulario3.innerHTML += `
                    <span>Pergunta 3</span>
                    <input type="text" class placeholder="Texto da pergunta"/>
                    <input type="text" placeholder="Cor de fundo da pergunta"/>

                    <span class="span_respostaCorreta">Resposta correta </span>
                    <input type="text" placeholder="Resposta correta"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem"/>

                    <span>Respostas incorretas</span>
                    <input type="text" placeholder="Resposta incorreta 1"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem 1"/>

                    <div class="barra"></div>

                    <input type="text" placeholder="Resposta incorreta 2"/>
                    <input type="text" class="input_URL" placeholder="URL da imagem 2"/>

                    <div class="barra"></div>

                    <input type="text" placeholder="Resposta incorreta 3"/>
                    <input type="text"class="input_URL"  placeholder="URL da imagem 3"/>
        
        
        `;

    } 
    flagFormulario3Setado=true;  
}


function validar_Perguntas(){
    verificarCamposVaziosEURL();
    if(flagCampos1NaoVazios === true|| flagCampos2NaoVazios === true||flagCampos3NaoVazios === true && flagURL === true ) {
        //cadastrarVariaveisNoQuizz();
        irParaNiveis();
    }else{
        alert("desculpe ocorreu um erro, tente novamente");
        limparCampos();
    }
}

function limparCampos (){
    let campos=formulario1.getElementsByTagName("input");
    let campos2=formulario2.getElementsByTagName("input");
    let campos3=formulario3.getElementsByTagName("input");
    for(let i=0;i < campos.length ; i++){
            campos[i].value="";
            campos2[i].value="";
            campos3[i].value="";
            flagCamposNaoVazios=false;   
    }

}

function verificarCamposVaziosEURL(){
    let verificarTextoResposta = "";
    
    flagURL = false;
    flagCampos1NaoVazios=false;
    let campos= formulario1.getElementsByTagName("input");
      console.log(campos);
    
        for(let i=0;i < campos.length ; i++){
            if(campos[i].value===""){
                flagCampos1NaoVazios=false;
                alert("existem campos vazios, por favor complete todos os campos");
            }else{
                flagCampos1NaoVazios=true;
                if (verificaVinteCaracteres(campos[i].value("input_textoPergunta").value)=== true);

                else if (verificaVinteCaracteres(campos[i].value("input_textoPergunta").value)=== false){
                    alert("o texto da  resposta tem que ter mais de 20 caractéres");    
            }
        }
        }
        for(let i=0;i < campos.length ; i++){
            if(campos[i].className==="input_URL"){
                if (isValidHttpUrl(campos[i].value)===true){
                    campos[i].style.border="none";
                    flagURL=true;
                }else{
                    console.log ("campos I . value "+campos[i].value);
                    console.log (isValidHttpUrl(campos[i].value));
                    alert ("existem URLS INVALIDAS");
                    campos[i].style.border="1px red solid";
                    flagURL= false;
                }
                
            }
        }
    
    if(flagFormulario2Setado === true){
        flagURL = false;
        flagCampos2NaoVazios=false;
        let campos2 = formulario2.getElementsByTagName("input");
       
        
            for(let i=0;i < campos2.length ; i++){
                if(campos2[i].value===""){
                    flagCampos2NaoVazios=false;
                    alert("existem campos vazios, por favor complete todos os campos");
                }else{
                    flagCampos2NaoVazios=true;
                }
            }
        
            for(let i=0;i < campos2.length ; i++){
                if(campos2[i].className==="input_URL"){
                    if (isValidHttpUrl(campos2[i].value)===true){
                        campos2[i].style.border="none";
                        flagURL=true;
                    }else{
                        console.log ("campos II . value "+campos2[i].value);
                        console.log (isValidHttpUrl(campos2[i].value));
                        alert ("existem URLS INVALIDAS");
                        campos2[i].style.border="1px red solid";
                        flagURL= false;
                    }
                    
                }
            }
    }
    if(flagFormulario3Setado === true){
        flagURL = false;
        flagCampos3NaoVazios=false;
        let campos3= formulario3.getElementsByTagName("input");
        
        
            for(let i=0;i < campos3.length ; i++){
                if(campos3[i].value===""){
                    flagCampos3NaoVazios=false;
                    alert("existem campos vazios, por favor complete todos os campos");
                }else{
                    flagCampos3NaoVazios=true;
                }
            }
        
            for(let i=0;i < campos3.length ; i++){
                if(campos3[i].className==="input_URL"){
                    if (isValidHttpUrl(campos3[i].value)===true){
                        campos3[i].style.border="none";
                        flagURL=true;
                    }else{
                        console.log ("campos III . value "+campos3[i].value);
                        console.log (isValidHttpUrl(campos3[i].value));
                        alert ("existem URLS INVALIDAS");
                        campos3[i].style.border="1px red solid";
                        flagURL= false;
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

function verificarInputsDoNivel(){
    let inputs = formularioNiveis1.getElementsByTagName("input");
     for(let i=0;inputs.length;i++){
        if (inputs[i].value===""){
        alert("nao pode haver campos vazios");
        }

     }

}

function verificaVinteCaracteres(string){
    if(string.length>=20){
        return true;
    }
    return false;
}

/// tratei os valores a resceber , agora é preparar o objeto para em seguida mandar nos  POSTS 