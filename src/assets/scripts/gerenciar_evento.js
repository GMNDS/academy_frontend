// Função para exibir os dados salvos na página
function exibirPublicacoes() {
    // Recupera as publicações do localStorage, ou um array vazio caso não haja publicações
    const publicacoes = JSON.parse(localStorage.getItem('publicacoes')) || [];
    const publicacoesElement = document.getElementById('publicacoes');
  
    // Verifica se há publicações
    if (publicacoes.length > 0) {
      publicacoesElement.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos itens
      publicacoes.forEach((publicacao, index) => {
        // Monta o HTML para cada publicação
        publicacoesElement.innerHTML += `
          <div class="saved-entry">
            <p class="evento"><strong>Título do Evento:</strong> ${publicacao.titulo_evento}</p>
            <p class="evento"><strong>Descrição do Evento:</strong> ${publicacao.descricao_evento}</p>
            <p class="evento"><strong>Data:</strong> ${publicacao.data}</p>
            ${publicacao.imagem ? `<div class="file-preview"><img src="${publicacao.imagem}" alt="Imagem Anexada" style="max-width: 100%; height: auto;"></div>` : ''}
            ${publicacao.video ? `<div class="file-preview"><video controls style="max-width: 100%; height: auto;"><source src="${publicacao.video}" type="video/mp4"></video></div>` : ''}
          </div>
        `;
      });
    } else {
      publicacoesElement.innerHTML = "<p>Nenhuma publicação encontrada.</p>";
    }
  }
  
  // Carregar as publicações quando a página for carregada
  window.onload = function() {
    exibirPublicacoes();
  };
      // Função para exibir os dados salvos na página
      function exibirPublicacoes() {
        const publicacoes = JSON.parse(localStorage.getItem('publicacoes')) || [];
        const publicacoesElement = document.getElementById('publicacoes');
  
        if (publicacoes.length > 0) {
          publicacoesElement.innerHTML = '';
          publicacoes.forEach((publicacao, index) => {
            publicacoesElement.innerHTML += `
              <div class="saved-entry" id="publicacao-${index}">
                <p><strong>Título do Evento:</strong> ${publicacao.titulo_evento}</p>
                <p><strong>Descrição do Evento:</strong> ${publicacao.descricao_evento}</p>
                <p><strong>Data:</strong> ${publicacao.data}</p>
                ${publicacao.imagem ? `<div class="file-preview"><img src="${publicacao.imagem}" alt="Imagem Anexada"></div>` : ''}
                ${publicacao.video ? `<div class="file-preview"><video controls><source src="${publicacao.video}" type="video/mp4"></video></div>` : ''}
                <div class="buttons">
                  <button onclick="editarPublicacao(${index})" class="button edit">Editar</button>
                  <button onclick="excluirPublicacao(${index})" class="button delete">Excluir</button>
                </div>
              </div>
            `;
          });
        } else {
          publicacoesElement.innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        }
      }
  
      // Função para limpar o localStorage e atualizar a página
      function limparLocalStorage() {
        localStorage.clear();
        document.getElementById('publicacoes').innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        alert('Todas as publicações foram apagadas!');
      }
  
      // Função para editar uma publicação
      function editarPublicacao(index) {
        const publicacoes = JSON.parse(localStorage.getItem('publicacoes')) || [];
        const publicacao = publicacoes[index];
  
        // Aqui você pode substituir pelo código do seu formulário para editar os dados
        const novoTitulo = prompt("Digite o novo título do evento:", publicacao.titulo_evento);
        const novaDescricao = prompt("Digite a nova descrição do evento:", publicacao.descricao_evento);
  
        if (novoTitulo && novaDescricao) {
          publicacao.titulo_evento = novoTitulo;
          publicacao.descricao_evento = novaDescricao;
  
          // Atualizar os dados no localStorage
          publicacoes[index] = publicacao;
          localStorage.setItem('publicacoes', JSON.stringify(publicacoes));
  
          // Atualizar a lista de publicações na interface
          exibirPublicacoes();
        }
      }
  
      // Função para excluir uma publicação
      function excluirPublicacao(index) {
        const publicacoes = JSON.parse(localStorage.getItem('publicacoes')) || [];
        
        if (confirm("Tem certeza que deseja excluir esta publicação?")) {
          // Remover a publicação do array
          publicacoes.splice(index, 1);
          
          // Atualizar o localStorage com o novo array
          localStorage.setItem('publicacoes', JSON.stringify(publicacoes));
  
          // Atualizar a lista de publicações na interface
          exibirPublicacoes();
        }
      }
  
      // Carregar as publicações quando a página for carregada
      window.onload = function() {
        exibirPublicacoes();
      };
  
      // Para salvar dados (exemplo para teste)
      function salvarDados() {
        const publicacoes = JSON.parse(localStorage.getItem('publicacoes')) || [];
        const novaPublicacao = {
          titulo_evento: "Evento Teste",
          descricao_evento: "Descrição do evento",
          imagem: "data:image/png;base64,.....", // Exemplo de base64
          video: "https://www.exemplo.com/video.mp4",
          data: new Date().toLocaleString()
        };
        publicacoes.push(novaPublicacao);
        localStorage.setItem('publicacoes', JSON.stringify(publicacoes));
      }
  