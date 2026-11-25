"use strict";

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();
  inicializarChecklist();
  inicializarCursos(dadosCurriculares);
});

function inicializarMenu() {
  const botao = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");
  const telaAmpla = matchMedia("(min-width: 70rem)");

  function atualizarMenu(aberto) {
    botao.setAttribute("aria-expanded", String(aberto));
    botao.querySelector("use").setAttribute("href", aberto ? "#i-close" : "#i-menu");
    menu.hidden = !telaAmpla.matches && !aberto;
  }

  botao.hidden = false;
  atualizarMenu(false);
  botao.addEventListener("click", () => atualizarMenu(menu.hidden));
  telaAmpla.addEventListener("change", () => {
    const focoNoMenu = menu.contains(document.activeElement);
    atualizarMenu(false);
    if (menu.hidden && focoNoMenu) botao.focus();
  });

  menu.addEventListener("click", (evento) => {
    const link = evento.target.closest('a[href^="#"]');
    if (!link || telaAmpla.matches || evento.defaultPrevented ||
        evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;

    const destino = document.getElementById(link.hash.slice(1));
    atualizarMenu(false);
    destino.setAttribute("tabindex", "-1");
    destino.focus({ preventScroll: true });
  });

  document.querySelector(".nav-shell").addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape" || botao.getAttribute("aria-expanded") !== "true") return;
    atualizarMenu(false);
    botao.focus();
  });
}

function inicializarChecklist() {
  const form = document.querySelector("#checklist");
  const itens = [...form.querySelectorAll('input[type="checkbox"]')];
  const status = document.querySelector("#checklist-status");

  function atualizarContagem() {
    const marcados = itens.filter((item) => item.checked).length;
    status.value = `${marcados} de ${itens.length} itens marcados`;
  }

  form.addEventListener("change", atualizarContagem);
  form.addEventListener("reset", () => requestAnimationFrame(atualizarContagem));
  form.addEventListener("submit", (evento) => evento.preventDefault());
  window.addEventListener("pageshow", atualizarContagem);
  atualizarContagem();
}

function elemento(tag, classe, texto) {
  const no = document.createElement(tag);
  if (classe) no.className = classe;
  if (texto !== undefined) no.textContent = texto;
  return no;
}

function icone(nome) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  const use = document.createElementNS(ns, "use");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  use.setAttribute("href", `#i-${nome}`);
  svg.append(use);
  return svg;
}

function formatarCarga(horas) {
  return new Intl.NumberFormat("pt-BR", { useGrouping: "always" }).format(horas);
}

function inicializarCursos({ cursos, series, categorias }) {
  const tablist = document.querySelector("#course-tabs");
  const paineis = document.querySelector("#course-panels");
  const dialogo = document.querySelector("#matrix-dialog");
  const conteudoMatriz = document.querySelector("#matrix-content");
  const filtrosBase = [
    { id: "todas", titulo: "Todas as bases" },
    { id: "comum", titulo: "Base Comum (BNCC)" },
    { id: "tecnica", titulo: "Base Técnica" },
    { id: "diversificada", titulo: "Parte Diversificada" }
  ];

  function renderizarGrade(destino, curso, serieAtiva = "todas", baseAtiva = "todas") {
    const fragmento = document.createDocumentFragment();
    let totalDisciplinas = 0;
    let totalSeries = 0;

    for (const serie of series) {
      if (serieAtiva !== "todas" && serieAtiva !== serie.id) continue;

      const disciplinas = curso.gradeCurricular[serie.id].filter(({ categoria }) =>
        baseAtiva === "todas" || categoria === baseAtiva ||
        (baseAtiva === "tecnica" && ["projeto", "estagio"].includes(categoria))
      );
      if (!disciplinas.length) continue;
      totalDisciplinas += disciplinas.length;
      totalSeries += 1;

      const tabela = elemento("table", "curriculum-table");
      const cabecalho = tabela.createTHead().insertRow();
      ["Disciplina e categoria", "Carga (T)"].forEach((titulo) => {
        const th = elemento("th", "", titulo);
        th.scope = "col";
        cabecalho.append(th);
      });
      const corpo = tabela.createTBody();
      for (const item of disciplinas) {
        const linha = corpo.insertRow();
        const nome = elemento("th");
        nome.scope = "row";
        nome.append(elemento("span", "subject", item.disciplina),
          elemento("span", `category category-${item.categoria}`, categorias[item.categoria]));
        const carga = elemento("td", "hours", formatarCarga(item.ch));
        linha.append(nome, carga);
      }
      const cargaTotal = disciplinas.reduce((total, item) => total + item.ch, 0);
      const legenda = tabela.createCaption();
      legenda.append(elemento("span", "series-title", serie.titulo),
        elemento("span", "series-hours", formatarCarga(cargaTotal)));
      const card = elemento("div", "series-card");
      card.append(tabela);
      fragmento.append(card);
    }

    if (!totalDisciplinas) fragmento.append(elemento("p", "empty-state", "Nenhuma disciplina para os filtros selecionados."));
    destino.replaceChildren(fragmento);
    return { totalDisciplinas, totalSeries };
  }

  function criarFonte(curso) {
    const { ano, turmas, pagina, url, observacao } = curso.fonte;
    const bloco = elemento("div", "matrix-source");
    const titulo = elemento("h4", "", "Fonte da grade");
    const link = elemento("a", "text-link", `Plano oficial da SEDUC-CE · ${ano} · tabela 1, p. ${pagina} (PDF)`);
    link.href = url;
    const edicao = elemento("p", "", `A tabela identifica turmas iniciadas em ${turmas}. Para confirmar a matriz aplicada à sua turma em Barro, consulte a secretaria da escola.`);
    const unidades = elemento("p", "", "A carga por série soma os dois semestres da coluna T da tabela. A formação técnica inclui os demais componentes profissionais e o estágio aparece à parte.");
    bloco.append(titulo, link, edicao, unidades);
    if (observacao) bloco.append(elemento("p", "matrix-source-observation", observacao));
    return bloco;
  }

  function abrirMatriz(curso) {
    const grade = elemento("div", "curriculum-grid");
    renderizarGrade(grade, curso);
    conteudoMatriz.replaceChildren(
      elemento("p", "eyebrow", "Educação profissional · SEDUC-CE"),
      elemento("h3", "matrix-course", curso.nome),
      criarFonte(curso),
      grade
    );
    dialogo.showModal();
  }

  function criarFiltro(legenda, id, opcoes, destino, atualizar) {
    const grupo = elemento("fieldset", "filter-group");
    grupo.append(elemento("legend", "", legenda));
    const controles = elemento("div", "filter-options");
    for (const opcao of opcoes) {
      const rotulo = elemento("label", "filter-option");
      const input = elemento("input", "visually-hidden");
      input.type = "radio";
      input.name = id;
      input.value = opcao.id;
      input.checked = opcao.id === "todas";
      input.setAttribute("aria-controls", destino);
      rotulo.append(input, elemento("span", "", opcao.titulo));
      controles.append(rotulo);
    }
    grupo.append(controles);
    grupo.addEventListener("change", (evento) => atualizar(evento.target.value));
    return grupo;
  }

  function montarPainel(painel, curso) {
    const perfil = elemento("div", "course-profile");
    const marca = elemento("span", "course-mark");
    marca.append(icone(curso.icone));
    const introducao = elemento("div", "course-intro");
    introducao.append(elemento("p", "eyebrow", curso.eixo),
      elemento("h3", "", curso.nome), elemento("p", "", curso.descricao));

    const dados = elemento("dl", "course-metrics");
    const metricas = [
      ["Duração", `${curso.duracao} anos`],
      ["Formação técnica (T)", formatarCarga(curso.cargaHorariaTecnica)],
      ["Estágio na tabela", `${formatarCarga(curso.cargaHorariaEstagio)} h`]
    ];
    for (const [rotulo, valor] of metricas) {
      const item = elemento("div");
      item.append(elemento("dt", "", rotulo), elemento("dd", "", valor));
      dados.append(item);
    }
    perfil.append(marca, introducao, dados);

    const areas = elemento("div", "course-areas");
    const lista = elemento("ul", "pills");
    lista.append(...curso.areasAtuacao.map((area) => elemento("li", "", area)));
    areas.append(elemento("h4", "", "Áreas de atuação"), lista);

    const filtros = elemento("div", "filters");
    const tituloGrade = elemento("h4", "", "Grade curricular");
    const grade = elemento("div", "curriculum-grid");
    const idGrade = `grade-${curso.id}`;
    grade.id = idGrade;
    const resultado = elemento("p", "results");
    resultado.setAttribute("role", "status");
    let serieAtiva = "todas";
    let baseAtiva = "todas";

    function atualizarGrade() {
      const { totalDisciplinas, totalSeries } = renderizarGrade(grade, curso, serieAtiva, baseAtiva);
      const disciplinas = totalDisciplinas === 1 ? "disciplina" : "disciplinas";
      const seriesVisiveis = totalSeries === 1 ? "série" : "séries";
      resultado.textContent = `${totalDisciplinas} ${disciplinas} em ${totalSeries} ${seriesVisiveis}`;
    }

    const opcoesSerie = [{ id: "todas", titulo: "Todas as Disciplinas" },
      ...series.map(({ id, filtro }) => ({ id, titulo: filtro }))];
    const cabecalhoGrade = elemento("div", "curriculum-heading");
    cabecalhoGrade.append(tituloGrade);
    filtros.append(cabecalhoGrade,
      criarFiltro("Filtrar por série", `serie-${curso.id}`, opcoesSerie, idGrade, (valor) => {
        serieAtiva = valor;
        atualizarGrade();
      }),
      criarFiltro("Filtrar por base curricular", `base-${curso.id}`, filtrosBase, idGrade, (valor) => {
        baseAtiva = valor;
        atualizarGrade();
      }),
      resultado
    );

    const nota = elemento("aside", "curriculum-note");
    const notaIcone = elemento("span", "icon-tile");
    notaIcone.append(icone("book"));
    const verMatriz = elemento("button", "button button-outline");
    verMatriz.type = "button";
    verMatriz.setAttribute("aria-haspopup", "dialog");
    verMatriz.append(icone("file"), "Ver matriz completa (PDF)");
    verMatriz.addEventListener("click", () => abrirMatriz(curso));
    cabecalhoGrade.append(verMatriz);
    nota.append(notaIcone, criarFonte(curso));

    painel.append(perfil, areas, nota, filtros, grade);
    atualizarGrade();
  }

  const abas = cursos.map((curso) => {
    const aba = elemento("button", "course-tab");
    const painel = elemento("section", "course-panel");
    aba.type = "button";
    aba.id = `aba-${curso.id}`;
    painel.id = `curso-${curso.id}`;
    aba.setAttribute("role", "tab");
    aba.setAttribute("aria-controls", painel.id);
    painel.setAttribute("role", "tabpanel");
    painel.setAttribute("aria-labelledby", aba.id);
    painel.tabIndex = 0;
    aba.append(icone(curso.icone), curso.tituloAba);
    tablist.append(aba);
    paineis.append(painel);
    return { aba, painel, curso };
  });

  function ativarAba(indice, moverFoco = false) {
    abas.forEach(({ aba, painel }, posicao) => {
      const ativa = posicao === indice;
      aba.setAttribute("aria-selected", String(ativa));
      aba.tabIndex = ativa ? 0 : -1;
      painel.hidden = !ativa;
    });
    const { aba, painel, curso } = abas[indice];
    if (!painel.childElementCount) montarPainel(painel, curso);
    if (moverFoco) {
      aba.focus({ preventScroll: true });
      aba.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  // Como os dados são locais, navegar pelas setas ativa a aba imediatamente.
  abas.forEach(({ aba }, indice) => {
    aba.addEventListener("click", () => ativarAba(indice));
    aba.addEventListener("keydown", (evento) => {
      const ultimo = abas.length - 1;
      const destinos = {
        ArrowRight: indice === ultimo ? 0 : indice + 1,
        ArrowLeft: indice === 0 ? ultimo : indice - 1,
        Home: 0,
        End: ultimo
      };
      if (!Object.hasOwn(destinos, evento.key)) return;
      evento.preventDefault();
      ativarAba(destinos[evento.key], true);
    });
  });

  if (abas.length) ativarAba(0);
  document.querySelector("#print-matrix").addEventListener("click", () => window.print());
}
