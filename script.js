const nameTarefa = document.getElementById('input-tarefa')
//const cont = document.querySelector("#contador");
const button = document.querySelector("#btn-adicionar")
const lista = document.getElementById ('lista-tarefas')
//const filt = document.querySelector("filtros")


button.addEventListener("click", () => {
   
   if(nameTarefa.value === ""){
    alert("Ditgite o nome da tarefa")
   }  
 const li =document.createElement("li")
    li.textContent = nameTarefa.value;
    lista.appendChild(li);                   // adiciona à lista
    nameTarefa.value = "";   
    


});
