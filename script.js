const nameTarefa = document.getElementById("input-tarefa");
const total = document.querySelector("#Total");
const pen = document.querySelector("#Pendentes");
const con = document.querySelector("#Concluidas");
const button = document.querySelector("#btn-adicionar");
const fTodos = document.querySelector("#btn-todas");
const fPend = document.querySelector("#btn-pendentes");
const fConc = document.querySelector("#btn-concluidas");

const lista = document.getElementById("lista-tarefas");

let contadorTotal = 0;
let contadorPend = 0;
let contadorCon = 0;

button.addEventListener("click", () => {
  if (nameTarefa.value === "") {
    alert("Digite o nome da tarefa");
    return;
  }

  const li = document.createElement("li");
  li.textContent = nameTarefa.value;

  li.classList.add("pendente");
  lista.appendChild(li); // add o li na ul
  nameTarefa.value = "";

  contadorTotal++;
  contadorPend++;

  total.textContent = contadorTotal;
  pen.textContent = contadorPend;

  li.addEventListener("click", () => {
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

    pen.textContent = contadorPend;
    con.textContent = contadorCon;
  });
});

fTodos.addEventListener("click", () => {
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    item.style.display = "block"; //deixa todos visiveis 
  });
});

fPend.addEventListener("click", () => {
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    if (item.classList.contains("pendente")) {//filtra os pendentes
      item.style.display = "block";// mostra
    } else {
      item.style.display = "none"; // esconde
    }
  });
});

fConc.addEventListener("click", () => {
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    if (item.classList.contains("concluida")) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
