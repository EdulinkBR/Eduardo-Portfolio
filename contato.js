function validarCampos(formularioId) {
        // Resetar mensagens de erro
        resetarMensagensErro(formularioId);
    
        // Verificar se os campos obrigatórios estão preenchidos
        let camposValidos = true;
    
        const camposObrigatorios = document.querySelectorAll(`#${formularioId} .campo-obrigatorio`);
        camposObrigatorios.forEach(campo => {
            const idCampo = campo.id;
            const mensagemErroId = `erro${idCampo.charAt(0).toUpperCase()}${idCampo.slice(1)}`;
            const mensagemErro = document.getElementById(mensagemErroId);
    
            if (!campo.value.trim()) {
                mensagemErro.textContent = 'Campo obrigatório';
                mensagemErro.style.color = 'red';
                camposValidos = false;
            }
        });
    
        if (camposValidos) {
            // Se os campos são válidos, você pode adicionar aqui o código para enviar o formulário (se necessário)
            // Exemplo: document.getElementById(formularioId).submit();
    
            // Enviar o e-mail
            // ...
    
            // Exibir uma mensagem de sucesso
            const mensagemSucesso = document.getElementById("mensagemSucesso");
            mensagemSucesso.style.display = "block";
    
            // Remover o botão
            const botaoFechar = mensagemSucesso.querySelector("button");
            botaoFechar.remove();
    
            // Permitir o comportamento padrão do formulário (redirecionamento)
            return true;
        }
    
        return camposValidos;
    }
    
    function resetarMensagensErro(formularioId) {
        const mensagensErro = document.querySelectorAll(`#${formularioId} .mensagem-erro`);
        mensagensErro.forEach(mensagem => {
            mensagem.textContent = '';
        });
    }
    