# Academy Front-END

## Contribuir

### Pré-requisitos

- Git instalado
- Visual Studio Code

### Configuração de ambiente

- **Clone o projeto**

Faça um clone do projeto na pasta que deseja colocar seus projetos, através do terminal ou vscode e abra ela no vscode.

```bash
git clone https://github.com/GMNDS/academy_frontend.git
code academy_frontend
```

- **Instale as extensões**

  Caso, não tenha instale as extensões recomendas, vai aparecer nas notificaçÕes na parte inferior

- **Copie o modelo**

  Crie uma nova página HTML copiando o [modelo.html](modelo.html) e adicione na pasta correta (professor,goe,aluno,etc...)

- **Corrija as referências para os arquivos**

Arrume a referência de links do `styles.css` e `script.js` para os estilos e os scripts funcionarem. Se você colocar somente em uma pasta a mais é só mudar para: `..` significa a pasa anterior

```html
<link rel="stylesheet" href="../assets/css/styles.css" />
<script src="../assets/scripts/script.js" defer></script>
```

- **Mantenha a consisência**

As classes e IDs existentes nos arquivos CSS são genericos para maior parte das situações, use-os para estilizar seus elementos. Caso precise de algo específico só para página crie um novo arquivo CSS e referencie ele. Já está tudo estruturado, então basta modificar.

- **Teste se tudo está certo**

Teste suas alterações com **Live preview**, verifique se tudo está funcionando corretamente. você pode testar no navegador copiando o link do live preview no seu navegador.

- **Faça Commit Das Suas Alterações**

  - No terminal, verifique quais arquivos foram modificados:
    ```bash
    git status
    ```
  - Adicione os arquivos ao commit (nao esqueça de adicionar a pasta):

    ```bash
    git add pasta/pagina.html
    ```

  - Faça um commit com uma mensagem descritiva:
    ```bash
    git commit -m "Adiciona nova página X"
    ```

- **Envie as Alterações Para o repositório**

  - Faça push das suas alterações para o repositório remoto:
    ```bash
    git push origin main
    ```

## Telas

### Página inicial

- [x] WEB
- [x] Powerapps

### Plano aula

- [x] WEB Professor
- [ ] Powerapps Professor
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Notas

- [ ] WEB Professor
- [ ] Powerapps Professor
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Presenças

- [ ] WEB Professor
- [ ] Powerapps Professor
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Atividades

- [ ] WEB Professor
- [ ] Powerapps Professor
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Cursos

- [ ] WEB GOE
- [ ] Powerapps GOE
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Eventos

- [ ] WEB GOE
- [ ] Powerapps GOE
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Notícias

- [ ] WEB GOE
- [ ] Powerapps GOE
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Grade horária

- [ ] WEB GOE
- [ ] Powerapps GOE
- [ ] WEB Aluno
- [ ] Powerapps Aluno

### Histórico academico

- [ ] WEB Aluno
- [ ] Powerapps Aluno
