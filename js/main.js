document.addEventListener('DOMContentLoaded', function () {
    // 1. CARROSSEL AUTOMÁTICO
    const imagens = document.querySelectorAll('#carousel-imagens img');
    let indiceAtual = 0;

    if (imagens.length > 0) {
        imagens.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });

        setInterval(() => {
            imagens[indiceAtual].style.display = 'none';
            indiceAtual = (indiceAtual + 1) % imagens.length;
            imagens[indiceAtual].style.display = 'block';
        }, 3000);
    }

    // 2. MÁSCARAS AUTOMÁTICAS (Telefone, CPF e CEP)
    const inputTelefone = document.getElementById('telefone');
    const inputCpf = document.getElementById('cpf');
    const inputCep = document.getElementById('cep');

    inputTelefone.placeholder = '(DDD) 12345-6789';
    inputCpf.placeholder = '123.456.789-00';
    inputCep.placeholder = '01234-567';

    inputTelefone.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = v;
    });

    inputCpf.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    });

    inputCep.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '').slice(0, 8);
        v = v.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = v;
    });

    // 3. VALIDAÇÃO DO FORMULÁRIO
    const form = document.getElementById('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const campos = form.querySelectorAll('input');
        let temErro = false;

        // Remove avisos antigos antes de validar novamente
        form.querySelectorAll('label.error').forEach(el => el.remove());

        campos.forEach(campo => {
            campo.classList.remove('error');

            if (!campo.value.trim()) {
                temErro = true;
                campo.classList.add('error');

                const msgErro = document.createElement('label');
                msgErro.className = 'error';
                msgErro.textContent = 'Este campo é obrigatório.';
                campo.parentElement.appendChild(msgErro);
            }
        });

        if (temErro) {
            alert('Por favor, preencha os campos para prosseguir com a compra!');
        } else {
            alert('Sua requisição foi enviada para análise, parabéns pela aquisição!');
            form.reset();
        }
    });
});

