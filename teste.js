const personagensCriados = [];

function criarPersonagem() {
	const nomeInput = document.querySelector(".codinome");
	const idSecretaInput = document.querySelector(".id-secreta");
	const poderInput = document.querySelector(".poder");
	const nacionalidadeInput = document.querySelector(".nacionalidade");

	const personagem = {
		nome: (nome = nomeInput.value),
		identidadeSecreta: (identidadeSecreta = idSecretaInput.value),
		poder: (poder = poderInput.value),
		nacionalidade: (nacionalidade = nacionalidadeInput.value)
	};
	personagensCriados.push(personagem);

	renderizarPersonagens();
}

function renderizarPersonagens() {
	const container = document.querySelector(".personagens-criados");
	container.innerHTML = "";

	for (let i = 0; i < personagensCriados.length; i++) {
		const personagem = personagensCriados[i];

		const li = `
      <li>
        Nome: ${personagem.nome}<br>
        Identidade secreta: ${personagem.identidadeSecreta}<br>
        Poder: ${personagem.poder}<br>
        Nacionalidade: ${personagem.nacionalidade}<br><br>
      </li>
    `;

		container.innerHTML += li;
	}