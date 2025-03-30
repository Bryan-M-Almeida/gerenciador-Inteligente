document.getElementById('formTarefa').addEventListener('submit', function (event) {
    event.preventDefault();
    // valores inseridos pelo usuário
    const tarefaNome = document.getElementById('tarefaNome').value;
    const tarefaData = document.getElementById('tarefaData').value;
    const tarefaUrgencia = document.getElementById('tarefaUrgencia').value;

    if (!tarefaNome || !tarefaData || !tarefaUrgencia) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    //estrutura da tarefa
    const tarefa = {
        nome: tarefaNome,
        data: tarefaData,
        urgencia: tarefaUrgencia
    };

    // Adiciona a tarefa à lista
    adicionarTarefa(tarefa);

    // Limpa os campos
    document.getElementById('tarefaNome').value = '';
    document.getElementById('tarefaData').value = '';
    document.getElementById('tarefaUrgencia').value = 'baixa';
});

function adicionarTarefa(tarefa) {
    const tarefasLista = document.getElementById('tarefasLista');
    const tarefaDiv = document.createElement('div');
    tarefaDiv.classList.add('tarefa-item');

    const tarefaNome = document.createElement('h3');
    tarefaNome.textContent = tarefa.nome;
    tarefaDiv.appendChild(tarefaNome);

    const tarefaData = document.createElement('p');
    tarefaData.textContent = `Data de Entrega: ${tarefa.data}`;
    tarefaDiv.appendChild(tarefaData);

    const tarefaUrgencia = document.createElement('p');
    tarefaUrgencia.textContent = `Urgência: ${tarefa.urgencia}`;
    tarefaDiv.appendChild(tarefaUrgencia);

    tarefasLista.appendChild(tarefaDiv);
}

document.getElementById('priorizarTarefas').addEventListener('click', function () {
    priorizarTarefas();
});

function priorizarTarefas() {
    const tarefas = [...document.querySelectorAll('.tarefa-item')];

    // Ordena as tarefas por urgência
    tarefas.sort((a, b) => {
        const urgenciaA = a.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        const urgenciaB = b.querySelector('p:nth-child(3)').textContent.split(': ')[1];

        const prioridades = { "baixa": 1, "media": 2, "alta": 3 };

        return prioridades[urgenciaB] - prioridades[urgenciaA];
    });

    const tarefasLista = document.getElementById('tarefasLista');
    tarefasLista.innerHTML = ''; // Limpar lista de tarefas

    // Reordena as tarefas
    tarefas.forEach(tarefaDiv => tarefasLista.appendChild(tarefaDiv));
}
