document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav ul li a");
  const body = document.body;
  const container = document.querySelector("main"); // O conteúdo principal para aplicar blur

  // Função para abrir o menu
  const openMenu = () => {
      nav.classList.add("active");
      container.classList.add("blur"); // Aplica o efeito de blur ao fundo
      body.classList.add("no-scroll"); // Desativa o scroll
  };

  // Função para fechar o menu
  const closeMenu = () => {
      nav.classList.remove("active");
      container.classList.remove("blur"); // Remove o efeito de blur
      body.classList.remove("no-scroll"); // Ativa o scroll novamente
  };

  // Toggle menu ao clicar no botão
  menuToggle.addEventListener("click", function () {
      if (nav.classList.contains("active")) {
          closeMenu();
      } else {
          openMenu();
      }

      // Alterna entre ícones fa-bars e fa-xmark
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
  });

  // Fecha o menu ao clicar em um link
  navLinks.forEach((link) => {
      link.addEventListener("click", function () {
          closeMenu();

          // Alterna o ícone para o estado inicial (fa-bars)
          const icon = menuToggle.querySelector("i");
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
      });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
          closeMenu();

          // Volta o ícone para o estado inicial (fa-bars)
          const icon = menuToggle.querySelector("i");
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
      }
  });
});



  // Selecionar os elementos do DOM
const gallery = document.querySelector(".portfolio-gallery");
const filtersContainer = document.querySelector(".portfolio-filters");

// Função para carregar o JSON de um ficheiro externo
const fetchProjects = async () => {
  try {
    const response = await fetch("portfolio.json"); // Certifique-se de que o ficheiro "portfolio.json" está na mesma pasta.
    const projects = await response.json();

    // Renderizar os filtros e os projetos
    renderFilters(projects);
    renderGallery(projects);
    enableFiltering();
  } catch (error) {
    console.error("Erro ao carregar os projetos:", error);
  }
};

// Função para renderizar filtros dinamicamente
const renderFilters = (projects) => {
  const classes = ["all"];
  
  // Extração única de classes, permitindo múltiplas classes em cada projeto
  projects.forEach((project) => {
    project.class.split(" ").forEach((cls) => {
      if (!classes.includes(cls)) {
        classes.push(cls);
      }
    });
  });

  // Gerar botões de filtro
  filtersContainer.innerHTML = classes
    .map(
      (filter) =>
        `<button class="filter-btn ${
          filter === "all" ? "active" : ""
        }" data-filter="${filter}">${filter === "all" ? "All" : filter
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/-/g, " ")}</button>`
    )
    .join("");
};

// Função para renderizar os projetos na galeria
const renderGallery = (projects) => {
  gallery.innerHTML = projects
    .map(
      (project) => `
        <div class="portfolio-item ${project.class}">
          <img src="${project.img_path}" alt="${project.title}">
          <h3>${project.title}</h3>
          <div class="portfolio-overlay">
            <p>${project.intro}</p>
            <div class="button-group">
              <a href="https://github.com/romilson-monteiro?tab=repositories" class="portfolio-link">Demo</a>
              <a href="#" class="portfolio-link">More</a>
            </div>
          </div>
        </div>
      `
    )
    .join("");
};

// Função para ativar os filtros dinâmicos
const enableFiltering = () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
};

// Inicializar carregando os projetos
fetchProjects();
