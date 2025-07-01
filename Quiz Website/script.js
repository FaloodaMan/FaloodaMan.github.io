const addQuestionBtn = document.getElementById('add-question-btn');
const questionInput = document.getElementById('question-input');
const questionsContainer = document.getElementById('questions-container');

addQuestionBtn.addEventListener('click', () => {
  const questionText = questionInput.value.trim();
  if (questionText === '') return;

  createQuestionBox(questionText);
  questionInput.value = '';
});

questionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addQuestionBtn.click();
});

function createQuestionBox(questionText) {
  const questionBox = document.createElement('div');
  questionBox.className = 'question-box';

  const questionTextEl = document.createElement('div');
  questionTextEl.className = 'question-text';
  questionTextEl.innerHTML = `<strong>Q: ${questionText}</strong>`;
  questionBox.appendChild(questionTextEl);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';

  for (let i = 0; i < 4; i++) {
    const optionWrapper = document.createElement('div');
    optionWrapper.className = 'option';

    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.placeholder = `Add Option ${i + 1}`;

    const addOptionBtn = document.createElement('button');
    addOptionBtn.textContent = '+';

    addOptionBtn.addEventListener('click', () => {
      const val = optionInput.value.trim();
      if (val === '') return;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${questionText}`;

      optionWrapper.innerHTML = '';
      optionWrapper.className = 'option';

      const label = document.createElement('label');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '10px';
      label.style.width = '100%';

      radio.style.margin = '0';
      label.appendChild(radio);
      label.appendChild(document.createTextNode(val));

      optionWrapper.appendChild(label);
    });

    optionWrapper.appendChild(optionInput);
    optionWrapper.appendChild(addOptionBtn);
    optionsContainer.appendChild(optionWrapper);
  }

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', () => {
    const textEl = questionBox.querySelector('.question-text');
    const currentText = textEl.textContent.replace(/^Q:\s*/, '');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'question-input-edit';
    textEl.replaceWith(input);

    editBtn.textContent = 'Save';
    editBtn.onclick = () => {
      const newText = input.value.trim();
      if (!newText) return;
      const newDiv = document.createElement('div');
      newDiv.className = 'question-text';
      newDiv.innerHTML = `<strong>Q: ${newText}</strong>`;
      input.replaceWith(newDiv);
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => editBtn.click();
    };
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    questionsContainer.removeChild(questionBox);
  });

  questionBox.appendChild(optionsContainer);
  questionBox.appendChild(editBtn);
  questionBox.appendChild(deleteBtn);
  questionsContainer.appendChild(questionBox);
}
