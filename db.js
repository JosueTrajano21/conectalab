/* Local data layer for the interactive MVP. Every visitor gets the same sample
   records; their own edits remain in their browser's IndexedDB. */
const LabDB = (() => {
  const databaseName = 'conecta-lab-paulista';
  const version = 1;
  const stores = ['businesses', 'people', 'organizations', 'opportunities', 'state'];
  const seed = {
    businesses: [
      {id:'padaria',name:'Padaria Aurora',category:'Padaria e café',distance:'350 m',rating:'4,8',reviews:'124',open:true,image:'assets/bakery.jpg',description:'Pães artesanais, café quentinho e boas conexões no coração da Vila Mariana.',about:'Um lugar para começar bem o dia. Aqui você encontra pães fresquinhos, cafés e kits de café da manhã para reuniões e equipes do bairro.',address:'Vila Mariana, Paulista',hours:'Segunda a sábado · 7h às 20h',tags:['Pães artesanais','Café da manhã'],postImage:'assets/breads.jpg',owner:'camila'},
      {id:'atelie',name:'Ateliê Linha & Afeto',category:'Costura e ajustes',distance:'600 m',rating:'4,9',reviews:'68',open:true,image:'assets/tailor.jpg',description:'Costura, ajustes e peças personalizadas feitas aqui no bairro.',about:'Aventais personalizados para cafés, salões e pequenos comércios. Pedidos a partir de 5 peças.',address:'Centro, Paulista',hours:'Segunda a sexta · 9h às 18h',tags:['Costura','Ajustes','Personalizados'],postImage:'assets/tailor.jpg',owner:'lucia'},
      {id:'flora',name:'Flora da Vila',category:'Flores e presentes',distance:'800 m',rating:'4,8',reviews:'32',open:true,image:'assets/marketing.jpg',description:'Flores e presentes feitos para celebrar o que acontece aqui perto.',about:'Arranjos florais, pequenos presentes e encomendas para momentos especiais no bairro.',address:'Janga, Paulista',hours:'Terça a sábado · 9h às 18h',tags:['Flores','Presentes','Encomendas'],postImage:'assets/marketing.jpg',owner:'marina'}
    ],
    people: [
      {id:'camila',name:'Camila Nascimento',role:'Empreendedora',business:'Padaria Aurora',neighborhood:'Vila Mariana',bio:'Gosta de transformar encontros simples em bons momentos ao redor da mesa.',initials:'CN',tone:'peach'},
      {id:'lucia',name:'Lúcia Andrade',role:'Costureira',business:'Ateliê Linha & Afeto',neighborhood:'Centro',bio:'Cria peças sob medida e acredita nas parcerias entre negócios do bairro.',initials:'LA',tone:'lilac'},
      {id:'rafael',name:'Rafael Moura',role:'Designer e autônomo',business:'Profissional independente',neighborhood:'Janga',bio:'Ajuda pequenos negócios a se apresentarem melhor no ambiente digital.',initials:'RM',tone:'mint'},
      {id:'marina',name:'Marina Silva',role:'Florista',business:'Flora da Vila',neighborhood:'Janga',bio:'Trabalha com flores, presentes e encomendas para a comunidade.',initials:'MS',tone:'rose'}
    ],
    organizations: [
      {id:'conecta',name:'Conecta Lab',kind:'Plataforma comunitária',neighborhood:'Paulista',description:'Um espaço para aprender, encontrar negócios locais e descobrir oportunidades.',initials:'CL',tone:'blue'},
      {id:'coletivo',name:'Coletivo Criar Paulista',kind:'Rede de colaboração',neighborhood:'Centro',description:'Grupo de demonstração que aproxima profissionais criativos e pequenos negócios.',initials:'CP',tone:'lilac'},
      {id:'ponte',name:'Espaço Ponte',kind:'Espaço de aprendizagem',neighborhood:'Janga',description:'Organização fictícia de teste com encontros e oficinas para quem empreende.',initials:'EP',tone:'mint'}
    ],
    opportunities: [
      {id:'v1',type:'Vaga',title:'Atendente de padaria',org:'Padaria Aurora',area:'Vila Mariana, Paulista',desc:'Atendimento ao público e apoio à organização da loja. Experiência é bem-vinda, mas não obrigatória.',date:'Publicado recentemente',contact:'conversa'},
      {id:'v2',type:'Vaga',title:'Auxiliar de costura',org:'Ateliê Linha & Afeto',area:'Centro, Paulista',desc:'Apoio na preparação de peças, ajustes e organização do ateliê.',date:'Publicado recentemente',contact:'conversa'},
      {id:'p1',type:'Apoio',title:'Trilha de transformação digital',org:'Conecta Lab',area:'Online',desc:'Conteúdos gratuitos e práticos para melhorar a presença digital e a gestão do seu negócio.',date:'Acesso gratuito',contact:'cursos'}
    ]
  };
  let dbPromise;
  function open() {
    if (!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB indisponível'));
    if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, version);
      request.onupgradeneeded = () => {
        const db = request.result;
        for (const name of stores) if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, {keyPath:'id'});
        for (const [name, rows] of Object.entries(seed)) {
          const store = request.transaction.objectStore(name);
          for (const row of rows) store.put(row);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return dbPromise;
  }
  async function all(name) {
    const db = await open();
    return new Promise((resolve,reject) => {const req=db.transaction(name,'readonly').objectStore(name).getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
  }
  async function get(name,id) {
    const db = await open();
    return new Promise((resolve,reject) => {const req=db.transaction(name,'readonly').objectStore(name).get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
  }
  async function put(name,value) {
    const db = await open();
    return new Promise((resolve,reject) => {const tx=db.transaction(name,'readwrite');tx.objectStore(name).put(value);tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error)});
  }
  return {open,all,get,put,seed};
})();
