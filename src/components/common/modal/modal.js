class Modal {
  constructor(title, categoryOptions, noteData = {}) {
    this.title = title;
    this.categoryOptions = categoryOptions;
    this.noteData = noteData;
  }

  render() {
    const formDialog = document.createElement('dialog');
    formDialog.classList.add();
    formDialog.innerHTML = `
      <form>
        <label for="noteCategory">Category:</label>
        <select id="noteCategory" required>
          ${this.categoryOptions
            .map(
              (option) =>
                `<option value="${option}" ${
                  this.noteData.category === option ? 'selected' : ''
                }>${option}</option>`,
            )
            .join('')}
        </select>

        <label for="noteName">Name:</label>
        <input type="text" id="noteName" value="${
          this.noteData.name || ''
        }" required>

        <label for="noteContent">Content:</label>
        <textarea id="noteContent" required>${
          this.noteData.content || ''
        }</textarea>

        <label for="noteDate">Date:</label>
        <input type="date" id="noteDate" value="${
          this.noteData.date || ''
        }" required>

        <button type="button" id="cancelNote">${
          this.noteData.id ? 'Cancel' : 'Close'
        }</button>
        <button type="submit" id="saveNote">${
          this.noteData.id ? 'Save' : 'Add'
        }</button>
      </form>
    `;

    const cancelNoteButton = formDialog.querySelector('#cancelNote');
    cancelNoteButton.addEventListener('click', () => {
      formDialog.close();
    });

    const saveNoteButton = formDialog.querySelector('#saveNote');
    saveNoteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const category = formDialog.querySelector('#noteCategory').value;
      const name = formDialog.querySelector('#noteName').value;
      const content = formDialog.querySelector('#noteContent').value;
      const date = formDialog.querySelector('#noteDate').value;

      if (this.noteData.id) {
        this.onSave(this.noteData.id, category, name, content, date);
      } else {
        this.onAdd(category, name, content, date);
      }

      formDialog.close();
    });

    document.body.append(formDialog);
    formDialog.showModal();
  }

  setOnAddCallback(callback) {
    this.onAdd = callback;
  }

  setOnSaveCallback(callback) {
    this.onSave = callback;
  }
}

export { Modal };
