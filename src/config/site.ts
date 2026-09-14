/**
 * Conteúdo editável do site.
 *
 * Tudo que muda com o tempo (nome da igreja, horários, redes, endereço)
 * mora aqui. Nenhum componente tem texto institucional chumbado.
 *
 * >>> Os valores marcados com PREENCHER são placeholders. Busque por
 * >>> "PREENCHER" no projeto para achar todos de uma vez.
 */

export const SITE = {
  /** Domínio de produção. Usado em canonical, Open Graph e sitemap. */
  url: 'https://cordeirinhosdecristo.com.br',

  /** Nome do departamento — aparece no hero, no <title> e no rodapé. */
  nome: 'Cordeirinhos de Cristo',

  /** Subtítulo do hero. Uma linha, tom acolhedor. */
  subtitulo: 'O departamento infantil da PREENCHER: nome da igreja',

  /** Descrição curta usada em <meta description> e no card do WhatsApp. */
  descricao:
    'Departamento infantil da PREENCHER: nome da igreja. Encontros, ' +
    'festividades e a rotina das nossas crianças.',

  /** Nome da igreja, usado no rodapé e nos dados estruturados. */
  igreja: 'PREENCHER: nome da igreja',
} as const;

/** Bloco "Quem somos" da home. Parágrafo curto, sem jargão. */
export const QUEM_SOMOS = {
  titulo: 'Quem somos',
  texto:
    'Os Cordeirinhos de Cristo são o departamento infantil da ' +
    'PREENCHER: nome da igreja. Recebemos as crianças todos os domingos ' +
    'com histórias bíblicas, música, brincadeira e muito carinho — cada ' +
    'uma no seu ritmo, cada uma do seu jeito. Nosso cuidado é que elas ' +
    'cresçam sabendo que são amadas por Deus e por essa comunidade.',
} as const;

/**
 * Horários dos encontros.
 * Adicione, remova ou reordene itens à vontade — a home se ajusta sozinha.
 */
export const HORARIOS = [
  {
    dia: 'PREENCHER: dia da semana',
    hora: 'PREENCHER: horário',
    descricao: 'PREENCHER: para quem é esse encontro (ex.: 3 a 6 anos)',
  },
  {
    dia: 'PREENCHER: dia da semana',
    hora: 'PREENCHER: horário',
    descricao: 'PREENCHER: para quem é esse encontro (ex.: 7 a 11 anos)',
  },
] as const;

/** Contato, redes e endereço. Deixe '' (string vazia) no que não existir. */
export const CONTATO = {
  /** Handle do Instagram, com @. Deixe '' para esconder o bloco. */
  instagram: '@PREENCHER',
  /** URL completa do perfil. */
  instagramUrl: 'https://instagram.com/PREENCHER',

  /** Telefone em formato legível. Deixe '' para esconder. */
  telefone: 'PREENCHER: (00) 00000-0000',
  /** Só dígitos, com DDI 55 — usado no link do WhatsApp. */
  whatsapp: '5500000000000',

  /** E-mail de contato. Deixe '' para esconder. */
  email: '',

  endereco: {
    logradouro: 'PREENCHER: rua e número',
    bairro: 'PREENCHER: bairro',
    cidade: 'PREENCHER: cidade',
    uf: 'PREENCHER',
    cep: 'PREENCHER: 00000-000',
    /** Link do Google Maps. Deixe '' para esconder o botão. */
    mapaUrl: '',
  },
} as const;

/** Endereço em uma linha, para o rodapé e os dados estruturados. */
export const enderecoCompleto = [
  CONTATO.endereco.logradouro,
  CONTATO.endereco.bairro,
  `${CONTATO.endereco.cidade} — ${CONTATO.endereco.uf}`,
].join(', ');
