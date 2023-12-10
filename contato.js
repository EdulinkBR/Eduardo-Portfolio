function validarCampos() {
    // Resetar mensagens de erro
    resetarMensagensErro();

    // Verificar se os campos obrigatórios estão preenchidos
    let camposValidos = true;

    const camposObrigatorios = document.querySelectorAll('.campo-obrigatorio');
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
        // Exemplo: document.getElementById('meuFormulario').submit();

        // Impedir o comportamento padrão do formulário (redirecionamento)
        return false;
    }

    return camposValidos;
}

function resetarMensagensErro() {
    const mensagensErro = document.querySelectorAll('.mensagem-erro');
    mensagensErro.forEach(mensagem => {
        mensagem.textContent = '';
    });
}
