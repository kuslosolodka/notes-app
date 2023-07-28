import { Button, Modal } from '../common/common';
import styles from './note.module.css';

class Note {
  constructor(
    id,
    category,
    name,
    date,
    content,
    createdAt,
    isArchived,
    onEdit,
    onSave,
    onDelete,
    onToggleArchive,
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.date = date;
    this.content = content;
    this.createdAt = createdAt;
    this.isArchived = isArchived;
    this.onEdit = onEdit;
    this.onSave = onSave;
    this.onDelete = onDelete;
    this.onToggleArchive = onToggleArchive;
  }

  render() {
    const noteItem = document.createElement('tr');

    noteItem.innerHTML = `
      <td class="${styles['table-cell']}">${this.category}</td>
      <td class="${styles['table-cell']}">${this.name}</td>
      <td class="${styles['table-cell']}">${this.content}</td>
      <td class="${styles['table-cell']}">${this.date}</td>
      <td class="${styles['table-cell']}">${this.createdAt}</td>
    `;

    const editButton = new Button('', () => {
      const editForm = new Modal(
        'Edit Note',
        ['Task', 'Random Thought', 'Idea'],
        {
          id: this.id,
          category: this.category,
          name: this.name,
          content: this.content,
          date: this.date,
        },
      );

      editForm.setOnSaveCallback((id, category, name, content, date) => {
        this.onSave(id, category, name, content, date);
      });

      editForm.render();
    });

    noteItem.append(editButton.render('edit-button'));

    const deleteButton = new Button('', () => {
      this.onDelete(this.id);
    });
    noteItem.append(deleteButton.render('delete-button'));

    const archiveButtonLabel = this.isArchived ? '' : '';
    const archiveButton = new Button(archiveButtonLabel, () => {
      this.onToggleArchive(this.id);
    });
    noteItem.append(archiveButton.render('archive-button'));

    return noteItem;
  }
}

export { Note };
