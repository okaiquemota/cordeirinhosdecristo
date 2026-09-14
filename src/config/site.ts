/**
 * Conteúdo editável do site.
 *
 * Tudo que muda com o tempo (nome da igreja, horários, redes, endereço)
 * mora aqui. Nenhum componente tem texto institucional chumbado.
 *
 * Campo vazio some da página — nada quebra e nada fica com buraco. Então
 * pode deixar '' no que ainda não existe e preencher depois.
 *
 * >>> O que ainda falta está marcado com PREENCHER. Para achar todos:
 * >>> grep -rn PREENCHER src/
 */

export const SITE = {
  /** Domínio de produção. Usado em canonical, Open Graph e sitemap. */
  url: 'https://cordeirinhosdecristo.com.br',

  /** Nome do departamento — aparece no hero, no <title> e no rodapé. */
  nome: 'Cordeirinhos de Cristo',

  /** Nome da igreja. */
  igreja: 'IEADERP Casa Grande',

  /** Subtítulo do hero. Uma linha, tom acolhedor. */
  subtitulo: 'O departamento infantil da IEADERP Casa Grande',

  /** Descrição usada em <meta description> e no card do WhatsApp. */
  descricao:
    'Departamento infantil da IEADERP Casa Grande, em Ribeirão Preto. ' +
    'As festividades, os encontros e a rotina das nossas crianças.',
};

/** Bloco "Quem somos" da home. Parágrafo curto, sem jargão. */
export const QUEM_SOMOS = {
  titulo: 'Quem somos',
  texto:
    'Os Cordeirinhos de Cristo são o departamento infantil da IEADERP ' +
    'Casa Grande. Recebemos as crianças com histórias bíblicas, música, ' +
    'brincadeira e muito carinho — cada uma no seu ritmo, cada uma do seu ' +
    'jeito. Nosso cuidado é que elas cresçam sabendo que são amadas por ' +
    'Deus e por essa comunidade.',
};

export type Horario = {
  /** Ex.: 'Domingo' */
  dia: string;
  /** Ex.: '9h' ou '18h às 20h' */
  hora: string;
  /** Opcional. Ex.: 'Crianças de 3 a 6 anos' */
  descricao?: string;
};

/**
 * Horários dos encontros.
 *
 * Está vazio porque hoje o departamento não tem encontro com horário
 * próprio — as crianças participam junto da programação da igreja. Com a
 * lista vazia, a seção de horários simplesmente não aparece na home.
 *
 * No dia em que houver, é só adicionar aqui que a seção volta sozinha:
 *
 *   export const HORARIOS: Horario[] = [
 *     { dia: 'Domingo', hora: '9h', descricao: 'Crianças de 3 a 6 anos' },
 *   ];
 */
export const HORARIOS: Horario[] = [];

export type Endereco = {
  /** Rua/avenida e número. */
  logradouro: string;
  bairro: string;
  cidade: string;
  /** Sigla do estado, ex.: 'SP'. */
  uf: string;
  cep: string;
  /** Link do Google Maps. Vazio esconde o botão "Ver no mapa". */
  mapaUrl: string;
};

export type Contato = {
  /** Handle com @. Vazio esconde o bloco do Instagram. */
  instagram: string;
  instagramUrl: string;
  /** Telefone legível. Vazio esconde. */
  telefone: string;
  /** Só dígitos, com DDI 55 — usado no link do WhatsApp. Vazio esconde. */
  whatsapp: string;
  /** Vazio esconde. */
  email: string;
  endereco: Endereco;
};

export const CONTATO: Contato = {
  instagram: '@cdc.ieaderp',
  instagramUrl: 'https://instagram.com/cdc.ieaderp',

  telefone: '',
  whatsapp: '',
  email: '',

  endereco: {
    // PREENCHER: confirmar se é Rua ou Avenida Guerino Fonzar.
    logradouro: 'Guerino Fonzar, 172',
    bairro: '', // PREENCHER
    cidade: 'Ribeirão Preto',
    uf: 'SP',
    cep: '', // PREENCHER
    mapaUrl: '', // PREENCHER: link do Google Maps
  },
};

/** Endereço em uma linha, pulando o que estiver vazio. */
export const enderecoCompleto = [
  CONTATO.endereco.logradouro,
  CONTATO.endereco.bairro,
  [CONTATO.endereco.cidade, CONTATO.endereco.uf].filter(Boolean).join(' — '),
]
  .filter(Boolean)
  .join(', ');
