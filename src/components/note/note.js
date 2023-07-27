import { Button } from '../common/button/button';
import { Modal } from '../common/modal/modal';
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
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.onSave = onSave;
    this.onToggleArchive = onToggleArchive;
  }

  render() {
    const noteItem = document.createElement('tr');
    noteItem.classList.add(styles.note);

    noteItem.innerHTML = `
      <td>${this.category}</td>
      <td>${this.name}</td>
      <td>${this.content}</td>
      <td>${this.date}</td>
      <td>${this.createdAt}</td>
    `;

    const editButton = new Button('Edit', () => {
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

    noteItem.append(editButton.render());

    const deleteButton = new Button('Delete', () => {
      this.onDelete(this.id);
    });
    noteItem.append(deleteButton.render());

    const archiveButtonLabel = this.isArchived ? 'Unarchive' : 'Archive';
    const archiveButton = new Button(archiveButtonLabel, () => {
      this.onToggleArchive(this.id);
    });
    noteItem.append(archiveButton.render());

    return noteItem;
  }
}

export { Note };
