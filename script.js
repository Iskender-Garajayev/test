let sections = [];

function addTodoWithTitle() {
  const titleInput = document.getElementById('title-input');
  const title = titleInput.value.trim();

  if (title !== '') {
    const todoListDiv = document.getElementById('todo-list');
    const todoSection = document.createElement('div');
    todoSection.classList.add('todo-section');

    todoSection.innerHTML = `
            <h3>${title}</h3>
            <button onclick="removeSection(${sections.length})">Remove</button>
            <input type="text" id="todo-input-${sections.length}" placeholder="Enter your task">
            <button onclick="addTodoInsideSection(${sections.length})">Add</button>
            <div class="todo-list" id="todo-list-${sections.length}"></div>
        `;

    sections.push({ title, todos: [] });
    todoListDiv.appendChild(todoSection);

    // Clear the title input
    titleInput.value = '';
  }
}

function addTodoInsideSection(sectionIndex) {
  const todoInput = document.getElementById(`todo-input-${sectionIndex}`);
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    sections[sectionIndex].todos.push(todoText);
    renderTodos(sectionIndex);
    todoInput.value = '';
  }
}

function renderTodos(sectionIndex) {
  const todoListDiv = document.getElementById(`todo-list-${sectionIndex}`);
  todoListDiv.innerHTML = '';

  sections[sectionIndex].todos.forEach((todo, index) => {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.classList.add('todo-item');
    todoItemDiv.innerHTML = `
                    <input type="checkbox" onchange="toggleTodoInsideSection(${sectionIndex}, ${index})">
                    <span>${todo}</span>
                    <button onclick="removeTodoInsideSection(${sectionIndex}, ${index})">Remove</button>
                `;
    todoListDiv.appendChild(todoItemDiv);
  });
}

function toggleTodoInsideSection(sectionIndex, todoIndex) {
  sections[sectionIndex].todos[todoIndex] = sections[sectionIndex].todos[
    todoIndex
  ].startsWith('✓ ')
    ? sections[sectionIndex].todos[todoIndex].slice(2)
    : '✓ ' + sections[sectionIndex].todos[todoIndex];
  renderTodos(sectionIndex);
}

function removeTodoInsideSection(sectionIndex, todoIndex) {
  sections[sectionIndex].todos.splice(todoIndex, 1);
  renderTodos(sectionIndex);
}

function removeSection(sectionIndex) {
  sections.splice(sectionIndex, 1);
  renderSections();
}

function renderSections() {
  const todoListDiv = document.getElementById('todo-list');
  todoListDiv.innerHTML = '';
  sections.forEach((section, index) => {
    const todoSection = document.createElement('div');
    todoSection.classList.add('todo-section');
    todoSection.innerHTML = `
                    <h3>${section.title}</h3>
                    <button onclick="removeSection(${index})">Remove</button>
                    <input type="text" id="todo-input-${index}" placeholder="Enter your task">
                    <button onclick="addTodoInsideSection(${index})">Add</button>
                    <div class="todo-list" id="todo-list-${index}"></div>
                `;
    todoListDiv.appendChild(todoSection);
    renderTodos(index);
  });
}
