'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stages', [
      {
        title: 'Nivel 1 - Iniciante',
        description: 'Texto simples com palavras curtas e comuns',
        difficulty: 1,
        enabled: true,
        thumbUrl: null,
        textChallenge: 'O gato comeu o rato. A casa e bonita. O sol brilha forte.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 2 - Basico',
        description: 'Frases um pouco mais longas com vocabulario comum',
        difficulty: 2,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'Maria gosta de ler livros interessantes. Joao prefere jogar futebol no parque. Ana adora musica classica.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 3 - Facil',
        description: 'Textos com pontuacao basica e palavras mais variadas',
        difficulty: 3,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'Hoje e um dia especial. O ceu esta azul e claro. As aves voam alto. As pessoas caminham pela rua. A vida e bela.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 4 - Intermediario',
        description: 'Sentencas mais complexas com conectivos e variacao de vocabulario',
        difficulty: 4,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A tecnologia avanca rapidamente em nossa sociedade moderna. Computadores e smartphones transformaram a forma como trabalhamos e nos comunicamos. A internet conecta pessoas ao redor do mundo inteiro.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 5 - Medio',
        description: 'Paragrafos com ideias mais elaboradas e vocabulario expandido',
        difficulty: 5,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A educacao e fundamental para o desenvolvimento humano. Atraves do aprendizado constante, adquirimos conhecimento e habilidades essenciais. Estudantes dedicados sempre buscam excelencia academica. Professores inspiradores fazem a diferenca na vida de muitos jovens.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 6 - Avancado',
        description: 'Textos tecnicos com termos especificos e estruturas complexas',
        difficulty: 6,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A programacao de software requer logica precisa e atencao aos detalhes. Algoritmos eficientes resolvem problemas complexos rapidamente. Desenvolvedores utilizam linguagens modernas como Python, JavaScript e Java. Testes automatizados garantem qualidade e confiabilidade dos sistemas.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 7 - Dificil',
        description: 'Paragrafos longos com vocabulario sofisticado e ideias abstratas',
        difficulty: 7,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A filosofia explora questoes profundas sobre existencia e conhecimento humano. Pensadores ao longo da historia desenvolveram teorias complexas sobre etica e moralidade. A reflexao critica permite compreender melhor o mundo ao nosso redor. Grandes obras literarias transmitem sabedoria e inspiracao para geracoes futuras.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 8 - Muito Dificil',
        description: 'Textos academicos com vocabulario especializado e estruturas elaboradas',
        difficulty: 8,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A ciencia moderna investiga fenomenos naturais atraves de metodos rigorosos e experimentacao sistematica. Pesquisadores analisam dados estatisticos para validar hipoteses teoricas. Publicacoes academicas divulgam descobertas importantes para a comunidade cientifica internacional. A colaboracao entre instituicoes promove avancos significativos em diversas areas do conhecimento.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 9 - Expert',
        description:
          'Textos extensos com vocabulario altamente especializado e raciocinio complexo',
        difficulty: 9,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A economia global enfrenta desafios constantes relacionados a distribuicao de recursos e crescimento sustentavel. Especialistas analisam indicadores macroeconomicos para prever tendencias futuras. Polticas publicas influenciam diretamente o bem estar social e o desenvolvimento economico das nacoes. Inovacoes tecnologicas transformam setores tradicionais e criam novas oportunidades de negocio. A globalizacao conecta mercados e culturas de forma sem precedentes na historia humana.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Nivel 10 - Mestre',
        description:
          'Texto extremamente desafiador com vocabulario erudito e estruturas muito complexas',
        difficulty: 10,
        enabled: true,
        thumbUrl: null,
        textChallenge:
          'A literatura brasileira possui uma tradicao riquissima que remonta aos periodos coloniais e se desenvolve ate os dias contemporaneos. Autores renomados como Machado de Assis, Guimaraes Rosa e Clarice Lispector revolucionaram a prosa nacional com estilos unicos e profundidade psicologica. A poesia modernista transformou completamente a expressao artistica no Brasil, incorporando elementos da cultura popular e linguagem coloquial. Criticos literarios analisam obras considerando contexto historico, influencias estrangeiras e inovacoes formais. A narrativa contemporanea explora temas universais como identidade, memoria e transformacao social atraves de tecnicas experimentais e perspectivas diversas.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stages', null, {})
  }
}
