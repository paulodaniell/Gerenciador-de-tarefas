const nameTarefa = document.getElementById("input-tarefa");
const total = document.querySelector("#Total");
const pendente = document.querySelector("#Pendentes");
const concluida = document.querySelector("#Concluidas");
const button = document.querySelector("#btn-adicionar");
const btnTodos = document.querySelector("#btn-todas");
const btnPendente = document.querySelector("#btn-pendentes");
const btnConcluido = document.querySelector("#btn-concluidas");

const lista = document.getElementById("lista-tarefas");

let contadorTotal = 0;
let contadorPend = 0;
let contadorCon = 0;

function criarBotaoApagar(li){

  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText ='Apagar';
  botaoApagar.setAttribute('class','apagar')
  li.appendChild(botaoApagar);
  
  botaoApagar.addEventListener("click",(e)=>{
    console.log("botao apagar");
    e.stopPropagation();
    li.remove(); 
    contadorTotal--;
    if (li.classList.contains("concluida")) {
    contadorCon--;
    } else {
    contadorPend--;
}
  concluida.textContent = contadorCon;
  pendente.textContent = contadorPend;
  total.textContent = contadorTotal;

    });
}

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function criarTarefa(textoInput){
  const li = criaLi();
  li.innerText = textoInput;
  li.classList.add("pendente");
  lista.appendChild(li);
  criarBotaoApagar(li);
  nameTarefa.value = "";
  contadorTotal++;
  contadorPend++;
  total.textContent = contadorTotal;
  pendente.textContent = contadorPend;
  li.addEventListener("click",()=>{
  marcarTarefa(li);
  
  });
}

function marcarTarefa(li){
  if (!li.classList.contains("concluida")) {
  const resposta = confirm("Deseja marcar como concluída?");
  if (!resposta) return;

  li.classList.remove("pendente");
  li.classList.add("concluida");

  contadorPend--;
  contadorCon++;
  } else {
  li.classList.remove("concluida");
  li.classList.add("pendente");
  contadorPend++;
  contadorCon--;
}
  pendente.textContent = contadorPend;
  concluida.textContent = contadorCon;
}

button.addEventListener("click", () => {
  if (nameTarefa.value === "") {
    alert("Digite o nome da tarefa");
    return;
  }
  criarTarefa(nameTarefa.value);
  
});


btnTodos.addEventListener("click", () => {
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    item.style.display = "block";  
  });
});

btnPendente.addEventListener("click", () => {
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    if (item.classList.contains("pendente")) {
      item.style.display = "block";
    } else {
      item.style.display = "none"; 
    }
  });
});

btnConcluido.addEventListener("click", () => {
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    if (item.classList.contains("concluida")) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
