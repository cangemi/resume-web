export type GridCell = {
  id: string
  title: string
  title_en?: string
  content?: string
  content_en?: string
  showLine?: boolean
}
//<span class="keyWord">
export const initialGridCells: Array<null | GridCell> = [
  {
    id: 'objetivo',
    title: 'CONHEÇA UM POUCO SOBRE MIM',
    title_en: 'GET TO KNOW ME',
    showLine: true,
    content: `<p>
            Sou desenvolvedor full stack e apaixonado por tecnologia. Gosto de criar soluções web que
            realmente fazem diferença, seja no visual ou na performance. Trabalho com sistemas embarcados, sites, plataformas web, APIs e aplicações completas de ponta a ponta.
            Amo transformar ideias em interfaces modernas usando
            <span class="keyWord">JavaScript</span> e <span class="keyWord">TypeScript</span> — e, claro, garantir um back-end
            robusto com <span class="keyWord">C#</span> e <span class="keyWord">Java</span>.<br /><br />

            Não sou só mais um dev: curto analisar código, sugerir melhorias e deixar tudo mais limpo e
            eficiente. Sou movido a desafios, adoro aprender coisa nova e acredito que trabalho em
            equipe é o que faz qualquer projeto decolar.
          </p>`,
    content_en: `<p>
        I'm a full stack developer passionate about technology. I enjoy building web solutions that really make a difference, whether visually or in performance. I work with embedded systems, websites, web platforms, APIs and end-to-end applications.
        I love turning ideas into modern interfaces using <span class="keyWord">JavaScript</span> and <span class="keyWord">TypeScript</span> — and, of course, ensuring a robust back-end with <span class="keyWord">C#</span> and <span class="keyWord">Java</span>.<br /><br />

        I'm not just another dev: I like to review code, suggest improvements and keep things clean and efficient. I'm driven by challenges, love learning new things and believe teamwork is what makes projects take off.
      </p>`,
  },
  null,
  null,
  null,
  {
    id: 'resumo',
    title: 'RESUMO PROFISSIONAL ',
    title_en: 'PROFESSIONAL SUMMARY',
    showLine: true,
    content: `<p> Engenheiro de Computação com experiência no desenvolvimento de aplicativos Android e iOS
          usando <span class="keyWord">Flutter</span> e em projetos que conectam software e hardware de forma prática.
          Recentemente, atuei em um projeto de <span class="keyWord">visão computacional</span>, participando de toda a
          construção da solução: criação de APIs em <span class="keyWord">Django</span> e treinamento de modelos de IA para
          processamento de imagens. Hoje trabalho como desenvolvedor full stack, usando <span class="keyWord">Vue.js</span> no
          front-end e <span class="keyWord">C#</span> com <span class="keyWord">SQL Server</span> no back-end, sempre com atenção à performance, consultas SQL
          bem otimizadas e boas práticas de arquitetura. Curto aprender coisas novas, encarar
          desafios e transformar problemas complexos em soluções simples, escaláveis e que realmente
          funcionam.</p>`,
    content_en: `<p>Computer Engineer with experience developing Android and iOS applications using <span class="keyWord">Flutter</span> and in projects that connect software and hardware practically.
        Recently, I worked on a <span class="keyWord">computer vision</span> project, participating in the full solution: building APIs with <span class="keyWord">Django</span> and training AI models for image processing. Today I work as a full stack developer using <span class="keyWord">Vue.js</span> on the front-end and <span class="keyWord">C#</span> with <span class="keyWord">SQL Server</span> on the back-end, always focused on performance, optimized SQL queries and sound architectural practices. I enjoy learning new things, taking on challenges and turning complex problems into simple, scalable solutions that actually work.</p>`,
  },
  null,
  null,
  {
    id: 'habilidades',
    title: 'HABILIDADES TÉCNICAS',
    title_en: 'TECHNICAL SKILLS',
    showLine: true,
    content: `
      - Linguagens: <span class="keyWord">Python, Dart, JavaScript, TypeScript, C, C#, Java, HTML5, CSS3 </span><br />
      - Frameworks: <span class="keyWord">Vue.js, Flutter, Node.js, Django, Flask </span><br />
      - Banco de Dados: <span class="keyWord">MySQL, PostgreSQL, Firebase</span><br />
      - Ferramentas: <span class="keyWord">Git, Docker, VS Code, Insomnia</span><br />
      - Metodologias Ágeis: Scrum, Kanban`,
    content_en: `
      - Languages: <span class="keyWord">Python, Dart, JavaScript, TypeScript, C, C#, Java, HTML5, CSS3 </span><br />
      - Frameworks: <span class="keyWord">Vue.js, Flutter, Node.js, Django, Flask </span><br />
      - Databases: <span class="keyWord">MySQL, PostgreSQL, Firebase</span><br />
      - Tools: <span class="keyWord">Git, Docker, VS Code, Insomnia</span><br />
      - Agile: Scrum, Kanban`,
  },
  {
    id: 'idiomas',
    title: 'IDIOMAS',
    title_en: 'LANGUAGES',
    showLine: true,
    content: `
      - Português: Nativo<br />
      - Inglês: Avançado`,
    content_en: `
      - Portuguese: Native<br />
      - English: Advanced`,
  },
  {
    id: 'historico',
    title: 'HISTÓRICO PROFISSIONAL ',
    title_en: 'PROFESSIONAL HISTORY',
    showLine: false,
    content: ``,
    content_en: ``,
  },
  {
    id: 'historico',
    title: 'Blue Projects ',
    showLine: false,
    content: `<p>
      Desenvolvedor Full Stack <span>| Junho 2025 – Atual</span>
    </p>

    <ul>
      <li>
        Desenvolvimento e manutenção de aplicações web full stack, com foco em performance,
        usabilidade e escalabilidade, utilizando <strong class="keyWord">Vue.js (TypeScript)</strong> no front-end
        e <strong class="keyWord">C#</strong> no back-end, com <strong class="keyWord">AWS Lambda</strong> em arquitetura serverless.
      </li>
      <li>
        Aplicação de <span class="keyWord">boas práticas de segurança</span>, arquitetura limpa e otimização, garantindo
        estabilidade e eficiência das soluções.
      </li>
      <li>
        Correção de bugs, <span class="keyWord">melhorias contínuas</span> e evolução de sistemas existentes.
      </li>
      <li>
        Criação e execução de testes unitários e de integração, assegurando a qualidade do código
        em produção.
      </li>
      <li>
        Atuação em <span class="keyWord">times ágeis (Scrum)</span>, participando de plannings, dailys, code reviews e
        retrospectivas.
      </li>
      <li>
        Modelagem e manipulação de bancos de dados relacionais, com consultas SQL otimizadas,
        dashboards analíticos e uso de <strong class="keyWord">SQL Server</strong>.
      </li>
      <li>
        Colaboração com times multidisciplinares para transformar requisitos técnicos e de
        negócio em soluções escaláveis e inovadoras.
      </li>
    </ul>`,
    title_en: 'Blue Projects',
    content_en: `<p>
      Full Stack Developer <span>| June 2025 – Present</span>
    </p>

    <ul>
      <li>
        Development and maintenance of full stack web applications focused on performance,
        usability and scalability using <strong class="keyWord">Vue.js (TypeScript)</strong> on the front-end
        and <strong class="keyWord">C#</strong> on the back-end, with <strong class="keyWord">AWS Lambda</strong> in a serverless architecture.
      </li>
      <li>
        Applied <span class="keyWord">security best practices</span>, clean architecture and optimizations to ensure
        solution stability and efficiency.
      </li>
      <li>
        Bug fixing, continuous improvements and evolution of existing systems.
      </li>
      <li>
        Creation and execution of unit and integration tests to ensure code quality in production.
      </li>
      <li>
        Participation in <span class="keyWord">agile teams (Scrum)</span>, taking part in plannings, dailies, code reviews and retrospectives.
      </li>
      <li>
        Data modeling and relational database manipulation, with optimized SQL queries and analytical dashboards.
      </li>
      <li>
        Collaboration with cross-functional teams to transform technical and business requirements into scalable, innovative solutions.
      </li>
    </ul>`,
  },
  {
    id: 'historico',
    title: 'AtriaTec Pesquisa e Desenvolvimento',
    showLine: false,
    content: `<p>
      Engenheiro de Computação <span>| Sertãozinho, SP | Setembro 2024 – Novembro 2025</span>
    </p>

    <ul>
      <li>
        Atuação em pesquisa e desenvolvimento de novas tecnologias, criando soluções inovadoras
        que integram hardware e software, com foco em eficiência e otimização de processos.
      </li>
      <li>
        Trabalho com diversas tecnologias e plataformas, incluindo <strong class="keyWord">ESP (ESP32/ESP8266)</strong>,
        <strong class="keyWord">YOLO</strong> para visão computacional, <strong class="keyWord">APIs</strong> e comunicação via
        <strong class="keyWord">HTTP e TCP</strong>.
      </li>
      <li>
        Integração de sistemas embarcados, <strong class="keyWord">IoT</strong>, automação e redes sem fio para
        diferentes tipos de aplicações.
      </li>
      <li>
        Configuração e gerenciamento de infraestrutura em <strong class="keyWord">Azure</strong>, incluindo
        servidores e serviços para suporte às aplicações.
      </li>
      <li>
        Utilização de <strong class="keyWord">Docker</strong> e <strong class="keyWord">Docker Compose</strong> para orquestração
        de múltiplas aplicações e serviços do sistema.
      </li>
      <li>
        Modelagem e manipulação de bancos de dados relacionais, com uso de
        <strong class="keyWord">SQL Server</strong> e <strong class="keyWord">PostgreSQL</strong>.
      </li>
    </ul>`,
    title_en: 'AtriaTec Pesquisa e Desenvolvimento',
    content_en: `<p>
      Computer Engineer <span>| Sertãozinho, SP | September 2024 – November 2025</span>
    </p>

    <ul>
      <li>
        Research and development of new technologies integrating hardware and software, focused on efficiency and process optimization.
      </li>
      <li>
        Work with technologies and platforms including <strong class="keyWord">ESP (ESP32/ESP8266)</strong>,
        <strong class="keyWord">YOLO</strong> for computer vision, <strong class="keyWord">APIs</strong> and communication via
        <strong class="keyWord">HTTP and TCP</strong>.
      </li>
      <li>
        Integration of embedded systems, <strong class="keyWord">IoT</strong>, automation and wireless networks for various applications.
      </li>
      <li>
        Infrastructure configuration and management on <strong class="keyWord">Azure</strong>, including servers and services to support applications.
      </li>
      <li>
        Use of <strong class="keyWord">Docker</strong> and <strong class="keyWord">Docker Compose</strong> for orchestrating multiple applications and services.
      </li>
      <li>
        Modeling and manipulation of relational databases using <strong class="keyWord">SQL Server</strong> and <strong class="keyWord">PostgreSQL</strong>.
      </li>
    </ul>`,
  },
  {
    id: 'historico',
    title: 'Faculdade Estácio',
    showLine: false,
    content: `<p>
      Orientador Educacional – Área de TI
      <span>| Ribeirão Preto, SP | Fevereiro 2025 – Atual</span>
    </p>

    <ul>
      <li>
        Atuação como Orientador Educacional na área de <strong class="keyWord">Tecnologia da Informação</strong>,
        auxiliando estudantes no entendimento de disciplinas técnicas e conteúdos de programação.
      </li>
      <li>
        Apoio na organização dos estudos, esclarecimento de dúvidas e superação de dificuldades
        de aprendizagem em temas relacionados a tecnologia.
      </li>
      <li>
        Contribuição para o desenvolvimento acadêmico e técnico dos alunos, promovendo uma
        base sólida em programação e boas práticas na área de TI.
      </li>
    </ul>`,
    title_en: 'Faculdade Estácio',
    content_en: `<p>
      Educational Advisor – IT Area
      <span>| Ribeirão Preto, SP | February 2025 – Present</span>
    </p>

    <ul>
      <li>
        Worked as an Educational Advisor in the IT area, helping students understand technical subjects and programming content.
      </li>
      <li>
        Supported study organization, clarified doubts and helped overcome learning challenges in technology-related topics.
      </li>
      <li>
        Contributed to students' academic and technical development, promoting a solid foundation in programming and best practices.
      </li>
    </ul>`,
  },
  null,
  {
    id: 'historico',
    title: 'Colégio Itamarati',
    showLine: false,
    content: `<p>
      Estagiário
      <span>| Ribeirão Preto, SP | Março 2021 – Agosto 2023</span>
    </p>

    <ul>
      <li>
        Desenvolvimento e apoio em aulas de <strong class="keyWord">cultura maker</strong>, ministradas em
        português e inglês, abordando temas como circuitos elétricos, programação e projetos práticos.
      </li>
      <li>
        Criação de atividades e projetos educacionais voltados ao aprendizado prático e criativo
        dos alunos.
      </li>
      <li>
        Iniciativa própria na busca por novos conhecimentos e no desenvolvimento de soluções
        didáticas para enriquecer o ensino.
      </li>
    </ul>`,
    title_en: 'Colégio Itamarati',
    content_en: `<p>
      Intern
      <span>| Ribeirão Preto, SP | March 2021 – August 2023</span>
    </p>

    <ul>
      <li>
        Supported and helped deliver hands-on "<strong class="keyWord">maker</strong>" classes in Portuguese and English, covering circuits, programming and practical projects.
      </li>
      <li>
        Created educational activities and projects focused on practical and creative learning.
      </li>
      <li>
        Took initiative to seek new knowledge and develop didactic solutions to enrich teaching.
      </li>
    </ul>`,
  },
  null,
  {
    id: 'historico',
    title: 'Supera Parque Tecnológico',
    showLine: false,
    content: `<p>
      Analista Laboratorial
      <span>| Ribeirão Preto, SP | Agosto 2023 – Maio 2024</span>
    </p>

    <ul>
      <li>
        Responsável pela realização de análises e ensaios laboratoriais,
        seguindo protocolos técnicos e padrões de qualidade.
      </li>
      <li>
        <span class="keyWord">Organização</span>, controle e registro de dados e resultados obtidos nos ensaios.
      </li>
      <li>
        Apoio a processos experimentais e atividades técnicas do laboratório.
      </li>
    </ul>`,
    title_en: 'Supera Parque Tecnológico',
    content_en: `<p>
      Laboratory Analyst
      <span>| Ribeirão Preto, SP | August 2023 – May 2024</span>
    </p>

    <ul>
      <li>
        Responsible for performing laboratory analyses and assays following technical protocols and quality standards.
      </li>
      <li>
        <span class="keyWord">Organization</span>, control and recording of data and results obtained in tests.
      </li>
      <li>
        Supported experimental processes and technical laboratory activities.
      </li>
    </ul>`,
  },
  null,
  {
    id: 'historico',
    title: 'Universidade de Ribeirão Preto',
    showLine: false,
    content: `<p>Projeto de Iniciação Científica
      <span>| Ribeirão Preto, SP | Março 2021 – Dezembro 2021</span>
    </p>

    <ul>
      <li>
        Atuação em projeto de pesquisa científica na área de radiologia, com desenvolvimento
        do aplicativo <strong>“Ultra Soluções Diagnósticas”</strong>.
      </li>
      <li>
        Criação de uma ferramenta educacional para auxiliar médicos na solicitação de exames
        radiológicos.
      </li>
      <li>
        Desenvolvimento do aplicativo utilizando <strong class="keyWord">Flutter</strong>, com foco em interface
        moderna e experiência do usuário.
      </li>
      <li>
        Aprendizado em programação, gerenciamento de <strong class="keyWord">projetos</strong> e trabalho em equipe.
      </li>
    </ul>`,
    title_en: 'Universidade de Ribeirão Preto',
    content_en: `<p>Undergraduate Research Project
      <span>| Ribeirão Preto, SP | March 2021 – December 2021</span>
    </p>

    <ul>
      <li>
        Participated in a scientific research project in radiology, developing the "Ultra Soluções Diagnósticas" application.
      </li>
      <li>
        Built an educational tool to help doctors request radiological exams.
      </li>
      <li>
        Developed the application using <strong class="keyWord">Flutter</strong>, focusing on modern UI and user experience.
      </li>
    </ul>`,
  },
  null,
  {
    id: 'historico',
    title: 'Brasil Center Comunicações',
    showLine: false,
    content: `<p>
    Serviços Especializados
    <span>| Novembro 2012 – Setembro 2019</span>
  </p>

  <ul>
    <li>
      <span class="keyWord">Atendimento ao cliente</span> com foco em demandas jurídicas e contratuais.
    </li>
    <li>
      Suporte aos advogados na elaboração de defesas em processos judiciais.
    </li>
    <li>
      Cumprimento de determinações judiciais, incluindo retirada de registros no Serasa,
      cancelamento e reativação de contratos, suspensão de cobranças e ajustes de faturamento.
    </li>
    <li>
      Negociação de acordos com clientes que ingressaram com ações judiciais,
      buscando evitar a evolução do processo para audiência.
    </li>
    <li>
      Atuação em ambiente de backoffice, com organização de processos,
      análise de contratos e interface entre áreas jurídicas e atendimento.
    </li>
  </ul>`,
    title_en: 'Brasil Center Comunicações',
    content_en: `<p>
    Specialized Services
    <span>| November 2012 – September 2019</span>
  </p>

  <ul>
      <li>
      <span class="keyWord">Customer support</span> focused on legal and contractual demands.
    </li>
    <li>
      Assisted lawyers in preparing defenses for legal proceedings.
    </li>
    <li>
      Carried out court-ordered tasks, such as removing records, cancelling/reactivating contracts and adjusting billing.
    </li>
    <li>
      Negotiated agreements with clients to avoid litigation progressing to hearings.
    </li>
    <li>
      Worked in a backoffice environment organizing processes and acting as liaison between legal and customer service teams.
    </li>
  </ul>`,
  },
  null,
  {
    id: 'cta',
    title: 'VAMOS CONVERSAR?',
    showLine: false,
    content: `<p>
    Gostou do que viu até aqui? 😊<br />
    Sua empresa está procurando um desenvolvedor comprometido, curioso e que gosta de
    resolver problemas de verdade?<br /><br />

    Seja para falar sobre uma oportunidade, trocar ideias, tirar dúvidas
    ou até sugerir melhorias neste site eu vou adorar conversar com você.
  </p>`,
    title_en: "LET'S TALK?",
    content_en: `<p>
    Did you like what you saw so far? 😊<br />
    Is your company looking for a committed, curious developer who likes to solve real problems?<br /><br />

    Whether it's to talk about an opportunity, exchange ideas, ask questions
    or even suggest improvements to this site, I'd love to chat with you.
  </p>`,
  },
  null,
  null,
  null,
  {
    id: 'contact',
    title: 'CONTATO',
    showLine: false,
    content: `<strong>PEDRO HENRIQUE GONÇALVES CANGEMI</strong><br />
      <h3>Desenvolvedor Full Stack</h3><br /><br />
      <a style="color: #4ade80" href="https://wa.me/5516981777171" target="_blank" rel="noopener noreferrer">(16) 98177-7171</a> –
      <a style="color: #4ade80" href="mailto:pedrocangemi@gmail.com?subject=Contato%20pelo%20site">pedrocangemi@gmail.com</a><br /><br />
      GitHub: <a style="color: #4ade80" href="https://github.com/Cangemi" target="_blank" rel="noopener noreferrer">https://github.com/Cangemi</a><br /><br />
      LinkedIn: <a style="color: #4ade80" href="https://www.linkedin.com/in/pedro-cangemi/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/pedro-cangemi/</a>`,
    title_en: 'CONTACT',
    content_en: `<strong>PEDRO HENRIQUE GONÇALVES CANGEMI</strong><br />
      <h3>Full Stack Developer</h3><br /><br />
      <a style="color: #4ade80" href="https://wa.me/5516981777171" target="_blank" rel="noopener noreferrer">(16) 98177-7171</a> –
      <a style="color: #4ade80" href="mailto:pedrocangemi@gmail.com?subject=Contact%20from%20site">pedrocangemi@gmail.com</a><br /><br />
      GitHub: <a style="color: #4ade80" href="https://github.com/Cangemi" target="_blank" rel="noopener noreferrer">https://github.com/Cangemi</a><br /><br />
      LinkedIn: <a style="color: #4ade80" href="https://www.linkedin.com/in/pedro-cangemi/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/pedro-cangemi/</a>`,
  },
  {
    id: 'cta',
    title: ' CURTIU A IDEIA DO SITE?',
    showLine: false,
    content: `<p>
        Ele foi pensado pra ser simples e flexível.
        Se a disposição das informações não te agradou, fique à vontade para
        <span class="keyWord">organizar tudo como preferir</span>.<br /><br />

        Experimente arrastar este card para o lado ou para cima e monte a visualização
        que fizer mais sentido pra você. Afinal, uma boa experiência também faz parte
        de um bom código 😉
      </p>`,
    title_en: 'DID YOU LIKE THE SITE IDEA?',
    content_en: `<p>
        It was designed to be simple and flexible.
        If the layout of information didn't please you, feel free to
        <span class="keyWord">arrange everything as you prefer</span>.<br /><br />

        Try dragging this card to the side or up and create the view
        that makes the most sense to you. After all, a good experience
        is also part of good code 😉
        </p>`,
  },
  null,
  null,
  null,
  {
    id: 'deleteAttempted',
    title: 'Valeu por interagir com o conteúdo',
    showLine: false,
    content: `e não tentar apagá-lo 😄`,
    title_en: 'Thanks for interacting with the content',
    content_en: `and not trying to delete it 😄`,
  },
  null,
]
