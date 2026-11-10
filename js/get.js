//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-atletas");
const modelo = document.querySelector("#modelo-atleta");

const apiKey="cv_-2uqcdM19-rgxEIMY9XB19S0l-SPwwCWJEdiqBp0O72IguRiUE8Zhp0872lPz4yV";
const apiUrl="https://api-ds.codeverse.dev.br/api/atletas";

//Funcao que busca todos os atletas da API

async function buscarAtletas() {
  resposta.textContent = "Carregando atletas..."

  try {
    //Fazer uma requisicao GET para buscar os atletas
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os atletas")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os atletas e montar o atleta.

    for (const atleta of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = atleta.nome || atleta.title;
      card.querySelector(".esporte").textContent = atleta.esporte;
      card.querySelector(".pais").textContent = atleta.pais;
      card.querySelector(".idade").textContent = atleta.idade;
      card.querySelector(".conquistas").textContent = atleta.conquistas;
      
      const imagem = card.querySelector("img");

      const urlFoto = atleta.imagem || atleta.imageUrl || atleta.foto;

      if(urlFoto){
        imagem.src = urlFoto;
        imagem.alt = atleta.nome || atleta.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os atletas. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarAtletas();

