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