# GreenPlantheme
Criador de temas

# GreenPlantheme - Desafio

Desafio desenvolvido por Cicero Vinicius, utilizando HTML, CSS, SCSS, javascript puro e o webpack para melhor organizar os assets (css/scss, imagens e js).
Os assets podem ser encontrados na pasta "src" (NÃO minificados) e "dist" (minificados);

Para baixar as dependências é só utilizar:

```bash
npm install
```

### Webpack
Utilizado para minificar os arquivos e compilar o Sass => CSS

```bash
npm run watch
```
ou o script abaixo para minificar os arquivos:

```bash
npm run prod
```

### O que foi feito:
- Criado site em HTML em que o usuário pode editar cores de um tema, aplicar as cores ao tema atual, cadastrar um novo tema ou até mesmo remover;
- Para cadastrar um tema novo é só clicar no botão flutuante no canto direito, na parte de baixo da tela;
- Cadastro e edição funcionam em uma sidenav/sidesheet, permitindo com que o usuário não saia da página para fazer ajustes ou adicionar um novo tema;
- Para editar um tema é só clicar no "lápis" em cima de cada tema na listagem;
- Para remover um tema é só clicar na "lixeira" em cima de cada tema na listagem;
- Para aplicar um tema é só clicar em cima da imagem do tema que ao passar o mouse por cima do tema, irá aparecer o texto "Aplicar";
- Para buscar um tema você pode buscar pelo nome completo do tema, ou pelo por uma parte do nome do tema;
- Caso queira mostrar todos os temas cadastrados (e que não foram removidos), é só limpar o campo de busca e clicar na "lupinha".

