import { NotesList } from '../components/notes-list/notes-list'

class Notes {
  constructor() {
    this.notesList = new NotesList()
  }

  render() {
    this.notesList.render()
  }
}

export { Notes }
