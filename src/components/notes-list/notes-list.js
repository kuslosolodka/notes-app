import { Button, Modal, Table } from '../common/common';
import { Note } from '../note/note';

class NotesList {
  constructor() {
    this.notes = [
      {
        id: 1,
        category: 'Task',
        name: 'Important thing',
        date: '2023-07-26',
        content: 'Chilling',
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isArchived: false,
      },
      {
        id: 2,
        category: 'Random Thought',
        name: 'Night thought',
        date: '2023-07-27',
        content: 'Why rollers are called rollers?',
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isArchived: false,
      },
      {
        id: 5,
        category: 'Idea',
        name: 'Business idea',
        date: '2023-07-26',
        content: 'Build ice cream shop',
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isArchived: true,
      },
    ];
  }

  getActiveNotes() {
    return this.notes.filter((note) => !note.isArchived);
  }

  getArchivedNotes() {
    return this.notes.filter((note) => note.isArchived);
  }

  editNote(id, updatedCategory, updatedName, updatedContent, updatedDate) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          category: updatedCategory,
          name: updatedName,
          content: updatedContent,
          date: updatedDate,
        };
      }
      return note;
    });
    this.render();
  }

  saveNote(id, updatedCategory, updatedName, updatedContent, updatedDate) {
    this.editNote(
      id,
      updatedCategory,
      updatedName,
      updatedContent,
      updatedDate,
    );
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.render();
  }

  toggleArchive(id) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return { ...note, isArchived: !note.isArchived };
      }
      return note;
    });
    this.render();
  }

  addNote() {
    const addForm = new Modal('Add Note', ['Task', 'Random Thought', 'Idea']);

    addForm.setOnAddCallback((category, name, content, date) => {
      const newId = Date.now();

      const newNote = {
        id: newId,
        category,
        name,
        content,
        date,
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isArchived: false,
      };

      this.notes.push(newNote);
      this.render();
    });

    addForm.render();
  }

  updateSummaryTable() {
    const summary = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const note of [...this.getActiveNotes(), ...this.getArchivedNotes()]) {
      const status = note.isArchived ? 'archivedCount' : 'activeCount';
      summary[note.category] = summary[note.category] || {
        activeCount: 0,
        archivedCount: 0,
      };
      // eslint-disable-next-line no-plusplus
      summary[note.category][status]++;
    }

    const summaryTableData = Object.keys(summary).map((category) => {
      const { activeCount, archivedCount } = summary[category];
      return {
        Category: category,
        'Active Count': activeCount,
        'Archived Count': archivedCount,
      };
    });

    const summaryTable = new Table(
      ['Category', 'Active Count', 'Archived Count'],
      summaryTableData,
      'Notes Summary',
    );

    const summaryContainer = document.querySelector('#summaryContainer');
    summaryContainer.innerHTML = '';
    summaryContainer.append(summaryTable.render());
  }

  render() {
    const notesContainer = document.querySelector('#app');
    notesContainer.innerHTML = '';

    const activeNotesTable = document.createElement('table');
    activeNotesTable.innerHTML = `
      <caption>Active Notes</caption>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Content</th>
          <th>Date</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const archivedNotesTable = document.createElement('table');
    archivedNotesTable.innerHTML = `
      <caption>Archived Notes</caption>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Content</th>
          <th>Date</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const activeNotesBody = activeNotesTable.querySelector('tbody');
    const archivedNotesBody = archivedNotesTable.querySelector('tbody');

    const activeNoteElements = this.getActiveNotes().map((note) => {
      const noteComponent = new Note(
        note.id,
        note.category,
        note.name,
        note.date,
        note.content,
        note.createdAt,
        note.isArchived,
        this.editNote.bind(this),
        this.saveNote.bind(this),
        this.deleteNote.bind(this),
        this.toggleArchive.bind(this),
      );
      return noteComponent.render();
    });

    activeNotesBody.append(...activeNoteElements);
    notesContainer.append(activeNotesTable);

    const archivedNoteElements = this.getArchivedNotes().map((note) => {
      const archivedNoteComponent = new Note(
        note.id,
        note.category,
        note.name,
        note.date,
        note.content,
        note.createdAt,
        note.isArchived,
        this.editNote.bind(this),
        this.saveNote.bind(this),
        this.deleteNote.bind(this),
        this.toggleArchive.bind(this),
      );
      return archivedNoteComponent.render();
    });

    archivedNotesBody.append(...archivedNoteElements);
    notesContainer.append(archivedNotesTable);

    const addNoteButton = new Button('Add Note', () => {
      this.addNote();
    });
    notesContainer.append(addNoteButton.render('add-button'));

    const summaryContainer = document.createElement('div');
    summaryContainer.id = 'summaryContainer';
    notesContainer.append(summaryContainer);

    this.updateSummaryTable();

    return notesContainer;
  }
}

export { NotesList };
