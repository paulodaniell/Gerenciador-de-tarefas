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


function salvarTarefas(){
  const liTarefas = lista.querySelectorAll('li');
  const listaDeTaredas = [];

  for(let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar','').trim();
    listaDeTaredas.push(tarefaTexto);
  }
  const tarefasJSON= JSON.stringify(listaDeTaredas)
  console.log(tarefasJSON);
  localStorage.setItem('lista',tarefasJSON);
}

function adicionaTarefasSalvas(){
  const lista =localStorage.getItem('lista');
  const listaDeTaredas = JSON.parse(lista);
  for(let tarefa of listaDeTaredas){
    criarTarefa(tarefa);
  }
}
function criarBotaoApagar(li){

  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText ='Apagar';
  botaoApagar.setAttribute('class','apagar')
  li.appendChild(botaoApagar);
  
  botaoApagar.addEventListener("click",(e)=>{
    e.stopPropagation();
    li.remove(); 
    salvarTarefas();
    contadorTotal--;
    if (li.classList.contains("concluida")) {
    contadorCon--;
    } else {
    contadorPend--;
}
    atualizarContadores();

    });
}

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function atualizarContadores() {
  total.textContent = contadorTotal;
  pendente.textContent = contadorPend;
  concluida.textContent = contadorCon;
}

function mostrarHora() {
    const data = new Date();
    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');

    const horaMinuto = data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${dia}/${mes} às ${horaMinuto}`;
}
function limpainput(){
  nameTarefa.value = "";
  focus(nameTarefa);
}


function criarTarefa(textoInput){
  
  const li = criaLi();
 if (textoInput.includes("(Criada:")) {
    li.innerText = textoInput;
  } else {
    const hora = mostrarHora();
    li.innerText = `${textoInput} (Criada: ${hora})`;
  }
  
  li.classList.add("pendente");
  lista.appendChild(li);
  criarBotaoApagar(li);
  limpainput();
  salvarTarefas();

  contadorTotal++;
  contadorPend++;
  atualizarContadores();
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
  atualizarContadores();
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

adicionaTarefasSalvas();