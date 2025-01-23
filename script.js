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
