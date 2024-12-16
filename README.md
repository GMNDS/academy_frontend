# Academy Front-END

Academy é um sistema criado para o projeto interdisciplinar do curso de Desenvolvimento de Software Multiplataforma, focado em um sistema educacional genérico que possa ser utilizado por faculdades e cursos, podendo ser personalizável para cada empresa e com uma grande gama de ferramentas para melhor experiência do aluno, professor e administração da instituição.

Ele está sendo desenvolvido primariamente no PowerApps, HTML, CSS e Javascript. Atualmente se trata de uma prova de conceito sem funcionalidades reais.

## Site

Você pode acessar as telas que simulam as funcionalidades. Atualmente você pode experimentar uma interaçao simples com o banco de dados a partir da tela do administrador, as demais são apenas visuais.

[Tela de login](https://academyuniverse.site/)

![image](https://github.com/user-attachments/assets/a4ba8402-ee56-41fc-903d-680795222e6b)

[Tela do aluno](https://academyuniverse.site/aluno/)

![image](https://github.com/user-attachments/assets/d964feca-badb-4a59-af9f-e91d6813b946)

[Tela do professor](https://academyuniverse.site/professor/)

![image](https://github.com/user-attachments/assets/5e2a493a-f294-4179-8753-915cdb2cf9a9)

[Tela do administrador](https://academyuniverse.site/goe/)

![image](https://github.com/user-attachments/assets/fca0e6cb-b427-4312-b73e-00cde38a22b3)


> [!TIP]
> O site também é responsivo, caso deseje, também poderá acessar pelo navegador no celular

## Banco de dados
Apesar de não ter um banco de dados propriamente dito a modelagem do banco de dados já foi feita em seu estágio inicial, começando com 19 tabelas que se relacionam pra fazer as funcionalidades mínimas de um sistema de gerenciamento escolar. Pode ser visualizada no link abaixo:

[Banco de dados do academy](https://dbdiagram.io/d/academy-67282546b1b39dd8585752d0)


## Tecnologias utilizadas
Nesse projeto para que ele possa subir ao ar usamos algumas tecnologias tanto para desenvolvimento quanto para produção:

- HTML
- CSS
- Javascript
- Nginx
- Docker
- Devcontainer
- Traefik
- Cloudflare

Como se trata de uma prova de conceito o desenvolvimento foi inteiramente feito em HTML, CSS e Javascript, além do auxílio do devcontainers no codespaces do github. O projeto foi dockerizado para que pudesse ser implementado de forma reproduzível, ele utilizado Nginx como webserver dentro do container e outro container com Traefik controla o proxy reverso que aponta para o domínio que está cadastrado na cloudflare. Essa infraestrutura permite que o domínio com o projeto esteja disponível de forma confiável utilizando um certificado SSL e impeça que possíveis vunerabilidades afete todo o servidor.

Para o exemplo de funcionalidades apresentadas na tela do administrador utilizamos o [PgLite](https://pglite.dev/) que é uma forma de utilizar um banco de dados postgres através de um pacote WASM de 3mb no frontend do navegador. Mesmo não servindo para o propósito em produção para uma prova de conceito é uma escolha rápida.



