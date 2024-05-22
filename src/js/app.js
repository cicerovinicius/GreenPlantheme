const app = {
  temas: [],
  breakpoints: {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 991px)',
    desktop: '(min-width: 992px)'
  },

  functions: {
    buscarDadosTemas: async function(){
      try {
        let resposta = await app.functions.getJson();
        app.temas = resposta;
        document.getElementById('results-area').innerHTML = app.functions.gerarListagem(resposta);
        console.log("TEMAS: ", resposta);
      } catch (erro) {
        console.error("Erro ao buscar temas: ", erro);
      }
    },

    buscarTemas: function(busca = ''){
      let temasAExibir = app.temas;
      if(busca) temasAExibir = app.temas.filter(tema => tema.name.toLowerCase().includes(busca.toLowerCase()));

      document.getElementById('results-area').innerHTML = app.functions.gerarListagem(temasAExibir);
      console.log("temasAExibir: ", temasAExibir);
    },

    gerarListagem: function(lista){
      let listagem = '';
      for(let i = 0; i < lista.length; i++){
        let tema = app.functions.adicionarTema(lista[i]);
        listagem += tema;
      }

      return listagem;
    },

    adicionarTema: function(tema){
      let novoTema = `
        <li id="tema_${tema.id}" class="result tema" style="width: 100%; display: inline-block">
          <div class="wrap">
            <div class="img" onclick="aplicarTema(${tema.id})" style="background: ${tema.colors.primary}">
              <img
                src="dist/images/mobile/mobile-leaves_gray.png"
                alt="${tema.name}"
                title="${tema.name}"
              />
              <span>Aplicar</span>
            </div>
            <h2 class="name" title="${tema.name} | GreenPlanthemes">${tema.name}</h2>
            <div class="botoes">
              <span class="material-icons botao edit secondary" onclick="editarTema(${tema.id})">edit</span>
              <span class="material-icons botao delete danger" onclick="removerTema(${tema.id})">delete</span>
            </div>
          </div>
        </li>`;
      return novoTema;
    },

    getJson: function(busca = ''){
      return fetch('./db.json')
        .then(response => {
          if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
          return response.json();
        })
        .then(data => {
          if(busca) return data.filter(tema => tema.name.toLowerCase() == busca);
          else return data;
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
        });
    },

    abrirSideNav: function(){
      console.log("app.temas: ", app.temas);
      document.getElementById('sideNav').classList.add('opened');
      document.getElementById('sidenavBackdrop').classList.add('opened');
    },
    fecharSideNav: function(){
      document.getElementById('sideNav').classList.remove('opened');
      document.getElementById('sidenavBackdrop').classList.remove('opened');
      app.functions.limparCampos();
    },

    cadastrarTema: function(){
      app.functions.limparCampos();
      document.getElementById('modo').value = 1;

      let titulo = document.getElementById('tituloSideNav');
      titulo.innerHTML = "Cadastrar Tema";
      titulo.setAttribute("title", "Cadastrar Tema");

      app.functions.abrirSideNav();
    },
    editarTema: function(id = ''){
      document.getElementById('modo').value = 2;

      let titulo = document.getElementById('tituloSideNav');
      titulo.innerHTML = "Editar Tema";
      titulo.setAttribute("title", "Editar Tema");

      app.functions.preencherDados(id);
      app.functions.abrirSideNav(id);
    },
    preencherDados: function(id = ''){
      let posicao = app.temas.findIndex(tema => tema.id == id);
      document.getElementById('temaId').value = id;
      document.getElementById('nome').value = app.temas[posicao].name;
      document.getElementById('color-picker-primary').value = app.temas[posicao].colors.primary;
      document.getElementById('color-picker-secondary').value = app.temas[posicao].colors.secondary;
      document.getElementById('color-picker-success').value = app.temas[posicao].colors.success;
      document.getElementById('color-picker-danger').value = app.temas[posicao].colors.danger;
      document.getElementById('color-picker-warning').value = app.temas[posicao].colors.warning;
    },

    gerarId: function(){
      let ids = app.temas.map(tema => tema.id);
      let novoId = Math.max(...ids);
      return novoId + 1;
    },
    salvarTema: function(dados){
      let modo = document.getElementById('modo').value;

      if(modo == 1){
        let novoTema = app.functions.adicionarTema(dados);
        app.temas.push(dados);

        let template = document.createElement("template");
        template.innerHTML = novoTema.trim();
        document.getElementById('results-area').appendChild(template.content.firstElementChild);

      }else{
        let posicao = app.temas.findIndex(tema => tema.id == dados.id);

        app.temas[posicao].name = dados.name;
        app.temas[posicao].colors.primary = dados.colors.primary;
        app.temas[posicao].colors.secondary = dados.colors.secondary;
        app.temas[posicao].colors.success = dados.colors.success;
        app.temas[posicao].colors.danger = dados.colors.danger;
        app.temas[posicao].colors.warning = dados.colors.warning;

        document.querySelector(`#tema_${dados.id} .name`).innerHTML = dados.name;
        document.querySelector(`#tema_${dados.id} .img`).style.backgroundColor = dados.colors.primary;

        if(document.querySelector(`#tema_${dados.id}`).classList.contains('applied')) app.functions.aplicarTema(dados.id);
      }

      app.functions.fecharSideNav();
    },
    removerTema: function(id = ''){
      app.temas = app.temas.filter(tema => {
        return tema.id != id;
      });

      let temaARemover = document.getElementById(`tema_${id}`);
      temaARemover.remove();
    },
    aplicarTema: function(id = ''){
      let posicao = app.temas.findIndex(tema => tema.id == id);
      let primaryElements = document.querySelectorAll('.primary');
      let secondaryElements = document.querySelectorAll('.secondary');
      let successElements = document.querySelectorAll('.success');
      let dangerElements = document.querySelectorAll('.danger');
      let warningElements = document.querySelectorAll('.warning');

      primaryElements.forEach(primaryElement => {
        primaryElement.style.backgroundColor = app.temas[posicao].colors.primary;
      });
      secondaryElements.forEach(secondaryElement => {
        secondaryElement.style.backgroundColor = app.temas[posicao].colors.secondary;
      });
      successElements.forEach(successElement => {
        successElement.style.backgroundColor = app.temas[posicao].colors.success;
      });
      dangerElements.forEach(dangerElement => {
        dangerElement.style.backgroundColor = app.temas[posicao].colors.danger;
      });
      warningElements.forEach(warningElement => {
        warningElement.style.backgroundColor = app.temas[posicao].colors.warning;
      });

      let temas = document.querySelectorAll('.temas .tema');
      temas.forEach(tema => {
        tema.classList.remove('applied');
      });

      document.querySelector(`#tema_${id}`).classList.add('applied');

      let topo = document.getElementById('hero');
      if(!topo.classList.contains('themeApplied')) document.getElementById('hero').classList.add('themeApplied');
    },

    limparCampos: function(){
      document.getElementById('modo').value = 1;
      document.getElementById('temaId').value = '';
      document.getElementById('nome').value = '';
      document.getElementById('color-picker-primary').value = "#ffffff";
      document.getElementById('color-picker-secondary').value = "#ffffff";
      document.getElementById('color-picker-success').value = "#ffffff";
      document.getElementById('color-picker-danger').value = "#ffffff";
      document.getElementById('color-picker-warning').value = "#ffffff";
    }
  },
  init: function(){
    app.functions.buscarDadosTemas();
  }
};

window.app = app;
app.init();