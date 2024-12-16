const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const closeButton = document.querySelector(".btn-close");

const savedTheme = localStorage.getItem("theme") || "light";
rootHtml.setAttribute("data-theme", savedTheme);
updateToggleIcon(savedTheme);
updateCloseButtonClass(savedTheme);

function updateToggleIcon(theme) {
  toggleTheme.classList.toggle("bi-moon-stars", theme === "light");
  toggleTheme.classList.toggle("bi-sun", theme === "dark");
  toggleTheme.setAttribute("aria-label", `Mudar para tema ${theme === "dark" ? "claro" : "escuro"}`);
}

function updateCloseButtonClass(theme) {
  if (theme === "light") {
    closeButton.classList.remove("btn-close-white");
  } else {
    closeButton.classList.add("btn-close-white");
  }
}

function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  rootHtml.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateToggleIcon(newTheme);
  updateCloseButtonClass(newTheme); 
}

toggleTheme.addEventListener("click", changeTheme);


function resetSelects() {
  const funcionarioSelect = document.getElementById('funcionario');
  const gruposSelect = document.getElementById('grupos');
  const categoriasSelect = document.getElementById('categorias');

  funcionarioSelect.selectedIndex = 0;
  gruposSelect.selectedIndex = 0;
  categoriasSelect.selectedIndex = 0;

  console.log('Seleções limpas!');
}

$(document).ready(function () {
  let indice = 1; // Contador para identificar cada linha dinamicamente

  // biome-ignore lint/complexity/useArrowFunction: <explanation>
  $('#add-row').on('click', function () {
    // Criar a nova linha
    const linha = $('<tr></tr>');

    // Adicionar células à linha usando append
    linha.append(
      `<td>
        <select id="produto${indice}" class="form-select">
          <option value="" disabled selected hidden>Selecione um produto</option>
        </select>
      </td>`
    );
    linha.append(
      `<td>
        <input type="number" id="entrada${indice}" class="form-control mx-auto">
      </td>`
    );
    linha.append(
      `<td>
        <input type="number" id="saida${indice}" class="form-control mx-auto">
      </td>`
    );
    linha.append(
      `<td>
        <textarea id="motivo${indice}" class="form-control" rows="1" placeholder="Informe o motivo"></textarea>
      </td>`
    );

    // Adicionar a linha ao tbody
    $('#table-body').append(linha);

    // Incrementar o índice para que os IDs sejam únicos
    indice++;
  });
});


// biome-ignore lint/complexity/useArrowFunction: <explanation>
$('#remove-row').on('click', function () {
  const totalLinhas = $('#table-body tr').length;
  if (totalLinhas > 1) {
    // Remove a última linha
    $('#table-body tr:last').remove();
  } else {
    // Exibe o modal quando não é possível remover a última linha
    $('#staticBackdrop').modal('show');
  }
});

  // Função para formatar strings, se necessário (simples exemplo)
  function formatarString(valor) {
    return valor ? valor.toUpperCase() : "";
  }

  // Função para preencher a tabela
  function preencherTabela(dados) {
    const tabela = $("#tabela-listagem");
    tabela.empty(); // Limpa a tabela antes de preencher
    $.each(dados, (indice, item) => {
      const linha = $("<tr></tr>"); // Cria uma linha da tabela
      
      // Adiciona colunas à linha
      linha.append("<td id='numero" + indice + "'>" + (indice + 1) + "</td>"); // Número da linha
      linha.append("<td id='produto" + indice + "' class='tab-left'>" + formatarString(item.produto) + "</td>");
      linha.append("<td id='tipo" + indice + "'>" + formatarString(item.tipo) + "</td>");
      linha.append("<td id='responsavel" + indice + "'>" + item.responsavel + "</td>");
      linha.append("<td id='entrada" + indice + "'><input type='number' class='form-control' value='" + item.entrada + "'></td>");
      linha.append("<td id='saida" + indice + "'><input type='number' class='form-control' value='" + item.saida + "'></td>");
      linha.append("<td id='data" + indice + "'>" + item.data + "</td>");
      linha.append("<td id='motivo" + indice + "'>" + item.motivo + "</td>");
      
      tabela.append(linha); // Adiciona a linha à tabela
    });
  }

  // Chamada ao backend para buscar dados
  $(document).ready(() => {
    $.ajax({
      url: 'URL_DO_BACKEND', // Substitua pela URL da sua API
      method: 'GET',
      dataType: 'json',
      success: (response) => {
        preencherTabela(response); // Preenche a tabela com os dados do backend
      },
      error: (error) => {
        console.error("Erro ao carregar os dados:", error);
      }
    });
  });