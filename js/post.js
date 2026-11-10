// 1 . Selecionar os elementos do html
// Que vai ser o forms
const form = document.querySelector("#form-atleta");

const resposta = document.querySelector("#resposta");

// 2 . Comunicacao com a API
// Lembrete o codeverse tem APIKey ou seja senha nas req.

const apiKey = "cv_-2uqcdM19-rgxEIMY9XB19S0l-SPwwCWJEdiqBp0O72IguRiUE8Zhp0872lPz4yV";

// Tem que falar o link (endpoint)
const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas";

// 3. Capturar o evento de click do form

form.addEventListener("submit", async function (event) {
  //impede o comportamento padrao do forms, recarregar ou navegar para outra pagina automaticamente.
  event.preventDefault();

  //pegar os dados do form.

  const dados = new FormData(form);

  //organizar esse objeto e montar

  const atleta = {
      title: dados.get("title"),
      esporte: dados.get("esporte"),
      pais: dados.get("país"),
      idade: Number(dados.get("idade")),
      conquistas: dados.get("conquistas"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando  atleta para a API....";

// 5 . Enviando a req para a API.

// trycatch é um bloco do js que executa alguma coisa que pode ter erros.
// caso aconteça um erro, (qq tipo) o bloco catch trata esse erro.

try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },

    // enviar os dados

    body: JSON.stringify(atleta),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = error;
    return;
  }

  if(respostaApi.ok){
    resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})