// Função para converter uma imagem em base64
function converterImagemBase64(imagemFile, callback) {
    const reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);  // A imagem convertida estará aqui
    };
    reader.readAsDataURL(imagemFile);  // Converter para base64
  }
  
  // Função para salvar os dados do formulário no localStorage
  function salvarDados() {
    const titulo_evento = document.getElementById('titulo_evento').value;
    const descricao_evento = document.getElementById('descricao_evento').value;
    const imagemFile = document.getElementById('imagem').files[0];
    const videoFile = document.getElementById('video').files[0];
  
    // Verificar se os campos não estão vazios
    if (titulo_evento && descricao_evento) {
      let imagemBase64 = null;
      if (imagemFile) {
        converterImagemBase64(imagemFile, function(imagemData) {
          imagemBase64 = imagemData;  // Armazenar a imagem convertida em base64
          salvarDadosNoStorage(imagemBase64, videoFile, titulo_evento, descricao_evento);
        });
      } else {
        salvarDadosNoStorage(imagemBase64, videoFile, titulo_evento, descricao_evento);
      }
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  }
  
  // Função para salvar os dados no localStorage
  function salvarDadosNoStorage(imagemBase64, videoFile, titulo_evento, descricao_evento) {
    const videoUrl = videoFile ? URL.createObjectURL(videoFile) : null;
  
    // Criar um objeto para a nova edição
    const novaEdicao = {
      titulo_evento: titulo_evento,
      descricao_evento: descricao_evento,
      imagem: imagemBase64,
      video: videoUrl,
      data: new Date().toLocaleString()  // Adicionar a data de quando a edição foi feita
    };
  
    // Recupera o array de publicações salvas ou cria um novo se não existir
    let publicacoes = JSON.parse(localStorage.getItem('publicacoes')) || [];
    publicacoes.push(novaEdicao);  // Adiciona a nova publicação ao array existente
    localStorage.setItem('publicacoes', JSON.stringify(publicacoes));
  
    // Limpar os campos do formulário
    document.getElementById('formulario').reset();
  
    // Redirecionar para a página gerenciar_evento.html
    window.location.href = 'gerenciar_eventos.html'; // Redireciona para a página de eventos
  }
  