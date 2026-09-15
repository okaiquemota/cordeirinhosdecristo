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

  /** Subtítulo da capa. Uma linha, tom acolhedor. */
  subtitulo: 'O departamento infantil da IEADERP Casa Grande. Toda criança é bem-vinda aqui.',

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

/**
 * Versículo da faixa azul da home. Troque quando quiser — o layout se
 * ajusta ao tamanho do texto.
 */
export const VERSICULO = {
  texto:
    'Deixai vir a mim os pequeninos, e não os embaraceis, porque dos ' +
    'tais é o reino dos céus.',
  referencia: 'Mateus 19:14',
};

/**
 * Títulos e chamadas das seções da home.
 *
 * Está tudo aqui para você reescrever o site inteiro sem abrir componente
 * nenhum. O que eu redigi é rascunho — troque à vontade pelo jeito que a
 * igreja fala.
 */
export const TEXTOS = {
  capa: {
    /* A frase do tema do ano, logo abaixo da logo. Deixe '' e a linha some
       da página — é o lugar de trocar quando a festividade mudar. */
    tema: 'Vivendo o novo que Deus fez.',
  },
  ultimosEventos: {
    titulo: 'Últimos eventos',
    descricao: 'PREENCHER: uma linha sobre o que são estes registros.',
  },
  contato: {
    titulo: 'Venha nos visitar',
    /* Rascunho meu. A frase anterior afirmava que as crianças são recebidas
       em qualquer domingo — eu não tinha como saber disso. */
    descricao: 'PREENCHER: quando e como uma família pode visitar pela primeira vez.',
    ondeFica: 'Onde fica',
    noInstagram: 'No Instagram',
    instagramTexto: 'PREENCHER: o que vocês publicam por lá.',
  },
};

export type Passo = { titulo: string; texto: string };

/**
 * "Como funciona um domingo" — para quem nunca veio saber o que esperar.
 * Lista vazia esconde a seção inteira.
 */
export const COMO_FUNCIONA: {
  titulo: string;
  descricao: string;
  passos: Passo[];
} = {
  titulo: 'Como funciona um domingo',
  descricao: 'Para quem vem pela primeira vez saber o que esperar.',

  /*
   * VAZIO DE PROPÓSITO — a seção não aparece na home enquanto estiver assim.
   *
   * Eu tinha escrito estes quatro passos, mas eles afirmavam procedimento da
   * igreja que ninguém confirmou. Preencha com o que de fato acontece e a
   * seção volta sozinha. O formato é este:
   *
   *   passos: [
   *     { titulo: 'A chegada',   texto: 'Onde a criança é recebida e a partir de que horário.' },
   *     { titulo: 'A história',  texto: 'Como é a parte da palavra.' },
   *     { titulo: 'A atividade', texto: 'O que elas fazem depois.' },
   *     { titulo: 'A volta',     texto: 'Como e onde os pais buscam a criança.' },
   *   ]
   */
  passos: [],
};

export type Duvida = { pergunta: string; resposta: string };

/** Dúvidas frequentes dos pais. Lista vazia esconde a seção. */
export const PARA_OS_PAIS: {
  titulo: string;
  descricao: string;
  duvidas: Duvida[];
} = {
  titulo: 'Para os pais',
  descricao: 'O que as famílias costumam perguntar antes da primeira visita.',

  /*
   * VAZIO DE PROPÓSITO — mesma razão da seção acima. As respostas que eu
   * tinha escrito descreviam cadastro, entrega e retirada de criança, que é
   * justamente o tipo de informação que não pode ser chute. O formato é este:
   *
   *   duvidas: [
   *     { pergunta: 'Que idades vocês recebem?', resposta: '...' },
   *     { pergunta: 'Como é a entrega e a retirada?', resposta: '...' },
   *   ]
   */
  duvidas: [],
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
    logradouro: 'Rua Guerino Fonzar, 172',
    bairro: 'Jardim Alexandre Balbo',
    cidade: 'Ribeirão Preto',
    uf: 'SP',
    cep: '14066-310',
    // Busca pelo endereço no Google Maps. Se quiser que caia no pino exato
    // da igreja, abra o local no Maps, use "Compartilhar" e cole o link aqui.
    mapaUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      'R.%20Guerino%20Fonzar%2C%20172%20-%20Jardim%20Alexandre%20Balbo%2C' +
      '%20Ribeir%C3%A3o%20Preto%20-%20SP%2C%2014066-310',
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
