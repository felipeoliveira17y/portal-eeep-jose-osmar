"use strict";

const dadosCurriculares = (() => {
  const categorias = {
    comum: "Formação Geral (BNCC)",
    diversificada: "Parte Diversificada",
    tecnica: "Formação Profissional",
    projeto: "Projeto Integrador",
    estagio: "Estágio Curricular"
  };

  const series = [
    { id: "1_ano", titulo: "1ª Série", filtro: "1º Ano" },
    { id: "2_ano", titulo: "2ª Série", filtro: "2º Ano" },
    { id: "3_ano", titulo: "3ª Série", filtro: "3º Ano" }
  ];

  const portal = "https://educacaoprofissional.seduc.ce.gov.br";

  // Cada linha traz a carga da coluna T, somada por série, da tabela 1
  // do plano indicado em fonte. Zero indica ausência naquela série.
  const catalogo = [
    {
      id: "administracao",
      tituloAba: "Administração",
      nome: "Técnico em Administração",
      icone: "briefcase",
      eixo: "Gestão e Negócios",
      descricao: "Desenvolve competências para organizar rotinas administrativas, acompanhar indicadores e dar suporte à gestão de pessoas, materiais e recursos financeiros.",
      areasAtuacao: ["Rotinas administrativas", "Recursos humanos", "Compras e estoques", "Apoio financeiro"],
      fonte: {
        ano: 2024,
        turmas: "2024",
        pagina: 11,
        caminho: "plano-de-curso_-tecnico-em-administracao_2024"
      },
      comum: [
        ["Língua Portuguesa", 80, 80, 80],
        ["Arte", 40, 0, 0],
        ["Língua Estrangeira: Inglês", 40, 40, 40],
        ["Educação Física", 40, 40, 40],
        ["História", 40, 60, 80],
        ["Geografia", 40, 60, 40],
        ["Filosofia", 40, 40, 40],
        ["Sociologia", 40, 40, 40],
        ["Matemática", 120, 120, 120],
        ["Biologia", 80, 80, 80],
        ["Física", 80, 80, 80],
        ["Química", 80, 80, 80]
      ],
      profissional: [
        ["Informática Básica", 100, 0, 0],
        ["Teoria Geral da Administração", 60, 0, 0],
        ["Marketing", 40, 0, 0],
        ["Práticas e Rotinas Administrativas", 40, 0, 0],
        ["Legislação Empresarial", 60, 0, 0],
        ["Gestão de Startups I", 0, 40, 0],
        ["Gestão de Pessoas e Liderança", 0, 40, 0],
        ["Fundamentos da Contabilidade", 0, 60, 0],
        ["Marketing Digital", 0, 40, 0],
        ["Administração da Produção, Qualidade e Processos", 0, 60, 0],
        ["Economia", 0, 40, 0],
        ["Gestão de Startups II", 0, 40, 0],
        ["Contabilidade de Custos", 0, 40, 0],
        ["Gestão de Departamento Pessoal", 0, 60, 0],
        ["Logística", 0, 40, 0],
        ["Gestão de Vendas", 0, 40, 0],
        ["Gestão de Startups III", 0, 0, 40],
        ["Gestão Financeira", 0, 0, 40],
        ["Gestão de Compras e Estoques", 0, 0, 40],
        ["Responsabilidade Socioambiental", 0, 0, 40],
        ["Administração Pública e do Terceiro Setor", 0, 0, 40],
        ["Estágio Curricular", 0, 0, 300, "estagio"]
      ],
      diversificada: [
        ["Língua Estrangeira: Espanhol", 40, 40, 40],
        ["Horário de Estudo I", 60, 80, 100],
        ["Horário de Estudo II", 40, 60, 60],
        ["Projeto de Vida", 120, 40, 20],
        ["Oficina de Redação", 0, 40, 20],
        ["Empreendedorismo", 80, 0, 0],
        ["Formação para a Cidadania", 40, 40, 40],
        ["Projetos Interdisciplinares I", 60, 80, 80],
        ["Projetos Interdisciplinares II", 40, 60, 80],
        ["Mundo do Trabalho", 60, 40, 0],
        ["Aprofundamento em Língua Portuguesa", 80, 40, 0],
        ["Aprofundamento em Matemática", 80, 20, 0],
        ["Aprofundamento em História", 40, 20, 0],
        ["Aprofundamento em Geografia", 40, 20, 40],
        ["Preparação e Avaliação da Prática de Estágio", 0, 0, 100]
      ]
    },
    {
      id: "agropecuaria",
      tituloAba: "Agropecuária",
      nome: "Técnico em Agropecuária",
      icone: "sprout",
      eixo: "Recursos Naturais",
      descricao: "Prepara o estudante para planejar e acompanhar atividades agrícolas e pecuárias, com atenção ao manejo sustentável do solo, da água e dos sistemas produtivos.",
      areasAtuacao: ["Propriedades rurais", "Cooperativas", "Produção animal e vegetal", "Assistência técnica rural"],
      fonte: {
        ano: 2026,
        turmas: "2026",
        pagina: 14,
        caminho: "agropecuaria_plano-de-curso_2026"
      },
      comum: [
        ["Língua Portuguesa", 160, 160, 160],
        ["Redação", 40, 40, 40],
        ["Arte", 40, 40, 40],
        ["Língua Estrangeira: Inglês", 40, 40, 40],
        ["Língua Estrangeira", 40, 40, 40],
        ["Educação Física", 40, 40, 40],
        ["História", 80, 80, 80],
        ["Geografia", 80, 80, 80],
        ["Filosofia", 40, 40, 40],
        ["Sociologia", 40, 40, 40],
        ["Matemática", 160, 160, 160],
        ["Biologia", 60, 60, 80],
        ["Física", 60, 80, 60],
        ["Química", 80, 60, 60]
      ],
      profissional: [
        ["Informática Básica", 100, 0, 0],
        ["Introdução à Agropecuária e Ética Profissional", 20, 0, 0],
        ["Pequenas Criações", 40, 0, 0],
        ["Zootecnia Geral", 40, 0, 0],
        ["Agricultura Geral e Agroecologia", 40, 0, 0],
        ["Manejo de Solo e Água", 40, 0, 0],
        ["Práticas de Convivência com o Semiárido", 40, 0, 0],
        ["Forragicultura e Pastagem", 0, 40, 0],
        ["Mecanização Agrícola", 0, 40, 0],
        ["Olericultura", 0, 60, 0],
        ["Grandes Culturas", 0, 60, 0],
        ["Fertilidade do Solo", 0, 40, 0],
        ["Empreendedorismo e Inovação no Campo", 0, 40, 0],
        ["Produção de Monogástricos", 0, 80, 0],
        ["Produção de Ruminantes", 0, 100, 0],
        ["Irrigação e Drenagem", 0, 60, 0],
        ["Fruticultura", 0, 60, 0],
        ["Entomologia", 0, 40, 0],
        ["Fitossanidade", 0, 40, 0],
        ["Topografia e Desenho Técnico", 0, 0, 40],
        ["Gestão da Empresa Rural", 0, 0, 60],
        ["Extensão Rural e Associativismo", 0, 0, 40],
        ["Silvicultura e Paisagismo", 0, 0, 40],
        ["Sistemas Agroindustriais", 0, 0, 40],
        ["Mercado, Comercialização e Logística Agrícola", 0, 0, 40],
        ["Estágio Curricular", 0, 0, 300, "estagio"]
      ],
      diversificada: [
        ["Horário de Estudo I", 80, 20, 40],
        ["Horário de Estudo II", 40, 20, 40],
        ["Projeto de Vida", 120, 40, 20],
        ["Empreendedorismo", 80, 0, 0],
        ["Formação para a Cidadania", 40, 40, 40],
        ["Projetos Interdisciplinares I", 40, 20, 20],
        ["Projetos Interdisciplinares II", 40, 0, 20],
        ["Mundo do Trabalho", 60, 40, 0],
        ["Aprofundamento em Biologia", 20, 0, 0],
        ["Preparação e Avaliação da Prática de Estágio", 0, 0, 100]
      ]
    },
    {
      id: "informatica",
      tituloAba: "Informática",
      nome: "Técnico em Informática",
      icone: "laptop",
      eixo: "Informação e Comunicação",
      descricao: "Ensina a desenvolver aplicações, organizar bancos de dados, configurar redes e prestar suporte a equipamentos e sistemas.",
      areasAtuacao: ["Desenvolvimento de software", "Suporte técnico", "Infraestrutura e redes", "Serviços digitais"],
      fonte: {
        ano: 2022,
        turmas: "2022–2023",
        pagina: 11,
        caminho: "informatica-plano-de-curso-2022"
      },
      comum: [
        ["Língua Portuguesa", 80, 80, 80],
        ["Arte", 40, 0, 0],
        ["Língua Estrangeira: Inglês", 40, 40, 40],
        ["Educação Física", 40, 40, 40],
        ["História", 40, 80, 80],
        ["Geografia", 80, 80, 80],
        ["Filosofia", 40, 40, 40],
        ["Sociologia", 40, 40, 40],
        ["Matemática", 120, 120, 80],
        ["Biologia", 80, 80, 80],
        ["Física", 40, 40, 80],
        ["Química", 80, 80, 80]
      ],
      profissional: [
        ["Informática Básica", 100, 0, 0],
        ["Lógica de Programação", 100, 0, 0],
        ["Arquitetura e Manutenção de Computadores", 80, 0, 0],
        ["HTML / CSS", 60, 0, 0],
        ["Planejamento de Carreira", 40, 0, 0],
        ["Sistemas Operacionais", 0, 60, 0],
        ["Programação Orientada a Objetos", 0, 80, 0],
        ["Programação Web", 0, 80, 0],
        ["Noções de Robótica", 0, 40, 0],
        ["Gestão de Startups I", 0, 40, 0],
        ["Redes de Computadores", 0, 60, 0],
        ["Design Gráfico", 0, 40, 0],
        ["Gerenciador de Conteúdo", 0, 60, 0],
        ["Banco de Dados", 0, 80, 0],
        ["Gestão de Startups II", 0, 40, 0],
        ["Laboratório Software", 0, 0, 60],
        ["Laboratório Hardware", 0, 0, 60],
        ["Projeto Integrador", 0, 0, 120, "projeto"],
        ["Gestão de Startups III", 0, 0, 40],
        ["Estágio Curricular", 0, 0, 300, "estagio"]
      ],
      diversificada: [
        ["Língua Estrangeira: Espanhol", 40, 40, 40],
        ["Horário de Estudo I", 40, 80, 80],
        ["Horário de Estudo II", 40, 20, 60],
        ["Projeto de Vida", 120, 40, 20],
        ["Oficina de Redação", 0, 40, 20],
        ["Empreendedorismo", 80, 0, 0],
        ["Formação para a Cidadania", 40, 40, 40],
        ["Inglês Técnico", 0, 60, 0],
        ["Projetos Interdisciplinares I", 40, 40, 60],
        ["Projetos Interdisciplinares II", 20, 20, 40],
        ["Mundo do Trabalho", 60, 40, 0],
        ["Aprofundamento em Língua Portuguesa", 80, 40, 0],
        ["Aprofundamento em Matemática", 60, 0, 40],
        ["Aprofundamento em Física", 40, 40, 0],
        ["Aprofundamento em História", 40, 0, 0],
        ["Preparação e Avaliação da Prática de Estágio", 0, 0, 100]
      ]
    },
    {
      id: "multimidia",
      tituloAba: "Multimídia",
      nome: "Técnico em Multimídia",
      icone: "media",
      eixo: "Produção Cultural e Design",
      descricao: "Desenvolve habilidades para planejar, produzir e editar conteúdos visuais, sonoros e interativos para diferentes mídias digitais.",
      areasAtuacao: ["Design gráfico", "Produção audiovisual", "Conteúdo digital", "Comunicação institucional"],
      fonte: {
        ano: 2024,
        turmas: "2022–2023",
        pagina: 11,
        caminho: "plano-de-curso_tecnico-em-multimidia_-2024-2",
        observacao: "A tabela da p. 11 registra 300 horas de estágio. O texto da p. 10 menciona 200. A grade abaixo segue a tabela."
      },
      comum: [
        ["Língua Portuguesa", 80, 80, 80],
        ["Arte", 40, 0, 0],
        ["Língua Estrangeira: Inglês", 40, 40, 40],
        ["Educação Física", 40, 40, 40],
        ["História", 40, 80, 80],
        ["Geografia", 80, 80, 80],
        ["Filosofia", 40, 40, 40],
        ["Sociologia", 40, 40, 40],
        ["Matemática", 120, 80, 80],
        ["Biologia", 80, 80, 80],
        ["Física", 40, 80, 80],
        ["Química", 80, 80, 80]
      ],
      profissional: [
        ["Informática Básica", 100, 0, 0],
        ["Introdução ao Curso e Ética Profissional", 40, 0, 0],
        ["Laboratório de Criatividade", 20, 0, 0],
        ["Introdução à Fotografia", 40, 0, 0],
        ["Design Gráfico e Editorial", 80, 0, 0],
        ["Produção Gráfica", 0, 40, 0],
        ["UX/UI Design", 0, 40, 0],
        ["Produção de Conteúdo e Copywriting", 0, 40, 0],
        ["Comunicação em Novas Mídias", 0, 40, 0],
        ["Gestão de Startup I", 0, 40, 0],
        ["Marketing Digital I", 0, 60, 0],
        ["Redação e Narrativas Midiáticas", 0, 40, 0],
        ["Gestão de Startup II", 0, 40, 0],
        ["Planejamento Visual", 0, 60, 0],
        ["Projetos Multimídia", 0, 0, 40],
        ["Produção e Edição de Áudio e Vídeo", 0, 0, 60],
        ["Marketing Digital II", 0, 0, 60],
        ["Gestão de Startup III", 0, 0, 40],
        ["Estágio Curricular", 0, 0, 300, "estagio"]
      ],
      diversificada: [
        ["Língua Estrangeira: Espanhol", 40, 40, 40],
        ["Horário de Estudo I", 100, 80, 100],
        ["Horário de Estudo II", 40, 80, 80],
        ["Projeto de Vida", 120, 40, 20],
        ["Oficina de Redação", 0, 40, 20],
        ["Empreendedorismo", 0, 80, 0],
        ["Formação para a Cidadania", 40, 40, 40],
        ["Projetos Interdisciplinares I", 100, 80, 120],
        ["Projetos Interdisciplinares II", 40, 80, 60],
        ["Mundo do Trabalho", 60, 40, 0],
        ["Aprofundamento em Língua Portuguesa", 120, 40, 0],
        ["Aprofundamento em Matemática", 60, 40, 0],
        ["Aprofundamento em Física", 40, 0, 0],
        ["Aprofundamento em História", 40, 0, 0],
        ["Preparação e Avaliação da Prática de Estágio", 0, 0, 100]
      ]
    }
  ];

  function componentesPorSerie(linhas, indice, categoriaPadrao) {
    return linhas.map(([disciplina, primeira, segunda, terceira, categoria = categoriaPadrao]) => ({
      disciplina,
      ch: [primeira, segunda, terceira][indice],
      categoria
    })).filter(({ ch }) => ch > 0);
  }

  const cursos = catalogo.map(({ comum, profissional, diversificada, fonte, ...curso }) => {
    const gradeCurricular = Object.fromEntries(series.map(({ id }, indice) => [id, [
      ...componentesPorSerie(profissional, indice, "tecnica"),
      ...componentesPorSerie(comum, indice, "comum"),
      ...componentesPorSerie(diversificada, indice, "diversificada")
    ]]));
    const itens = Object.values(gradeCurricular).flat();
    const somar = (categorias) => itens.filter(({ categoria }) => categorias.includes(categoria))
      .reduce((total, { ch }) => total + ch, 0);

    return {
      ...curso,
      duracao: series.length,
      fonte: { ...fonte, url: `${portal}/${fonte.caminho}/#page=${fonte.pagina}` },
      cargaHorariaTecnica: somar(["tecnica", "projeto"]),
      cargaHorariaEstagio: somar(["estagio"]),
      gradeCurricular
    };
  });

  return { cursos, series, categorias };
})();
