function renderShifts() {
  // Obter valores do formulário
  let peopleQtd = document.getElementById("peopleQtd").value;
  let startTime = document.getElementById("startTime").value;
  let endTime = document.getElementById("endTime").value;

  // Validar se todos os campos foram preenchidos
  if (!peopleQtd || !startTime || !endTime) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let start = new Date("1970-01-01 " + startTime);
  let end = new Date("1970-01-01 " + endTime);

  // Ajustar fim se for antes do início (passa da meia-noite)
  if (end <= start) {
    end.setDate(end.getDate() + 1); // adicionar um dia ao end
  }

  // Calcular a diferença de tempo em minutos
  let minutesDiff = (end - start) / (1000 * 60);

  // Calcular a quantidade de minutos para cada plantonista
  let minutesPerPerson = minutesDiff / peopleQtd;

  // Limpar a lista
  let scheduleList = document.getElementById("scheduleList");
  scheduleList.innerHTML = "";

  // Gerar a escala e adicionar à lista
  let dutyStartTime = new Date(start);

  for (let i = 1; i <= peopleQtd; i++) {
    let dutyEndTime = new Date(
      dutyStartTime.getTime() + minutesPerPerson * 60000
    );

    // Adicionar à lista
    let listItem = document.createElement("li");
    listItem.textContent = i + "° Horário: " + formatTime(dutyStartTime) + " - " + formatTime(dutyEndTime);
    scheduleList.appendChild(listItem);

    // Atualizar o horário de início para o próximo plantonista
    dutyStartTime = dutyEndTime;
  }
}

function formatTime(date) {
  // Formata a data fornecida em horas e minutos no formato HH:mm
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}

function deleteAllListItems() {
  // Obter o elemento da lista e remover todos os seus elementos filho (itens da lista)
  let scheduleList = document.getElementById("scheduleList");

  while (scheduleList.firstChild) {
    scheduleList.removeChild(scheduleList.firstChild);
  }
}

function clearForm() {
  // Limpar todos os campos do formulário e remover todos os items da lista
  document.getElementById("peopleQtd").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
  
  deleteAllListItems(); // Chama a função para limpar os itens da lista
}

document.getElementById("scheduleRenderBtn").addEventListener("click", renderShifts);
document.getElementById("clearBtn").addEventListener("click", clearForm)