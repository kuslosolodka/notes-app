import styles from './modal.module.css'

class Modal {
  constructor(title, categoryOptions, noteData = {}) {
    this.title = title
    this.categoryOptions = categoryOptions
    this.noteData = noteData
  }

  render() {
    const formDialog = document.createElement('dialog')
    formDialog.classList.add(styles.dialog)
    formDialog.innerHTML = `
      <form class="${styles.form}">
        <label for="noteCategory" class="${styles.label}">Category:</label>
        <select id="noteCategory" class="${styles.select}" required>
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
        }" class="${styles.input}" required>

        <label for="noteContent">Content:</label>
        <textarea id="noteContent" class="${styles.textarea}"required>${
          this.noteData.content || ''
        }</textarea>

        <label for="noteDate">Date:</label>
        <input type="date" id="noteDate" value="${
          this.noteData.date || ''
        }" class="${styles.input}" required>

        <button type="button" id="cancelNote">${
          this.noteData.id ? 'Cancel' : 'Close'
        }</button>
        <button type="submit" id="saveNote">${
          this.noteData.id ? 'Save' : 'Add'
        }</button>
      </form>
    `

    const cancelNoteButton = formDialog.querySelector('#cancelNote')
    cancelNoteButton.addEventListener('click', () => {
      formDialog.close()
    })

    const saveNoteButton = formDialog.querySelector('#saveNote')
    saveNoteButton.addEventListener('click', (event) => {
      event.preventDefault()
      const category = formDialog.querySelector('#noteCategory').value
      const name = formDialog.querySelector('#noteName').value
      const content = formDialog.querySelector('#noteContent').value
      const date = formDialog.querySelector('#noteDate').value

      if (!category || !name || !content || !date) {
        alert('Please fill in all required fields.')
        return
      }

      if (this.noteData.id) {
        this.onSave(this.noteData.id, category, name, content, date)
      } else {
        this.onAdd(category, name, content, date)
      }

      formDialog.close()
    })

    formDialog.addEventListener('keydown', (event) => {
      const focusableElements = formDialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0]
      // eslint-disable-next-line unicorn/prefer-at
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    })

    document.body.append(formDialog)
    formDialog.showModal()
  }

  setOnAddCallback(callback) {
    this.onAdd = callback
  }

  setOnSaveCallback(callback) {
    this.onSave = callback
  }
}

export { Modal }
