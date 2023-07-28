import styles from './table.module.css'

class Table {
  constructor(columns, data, caption) {
    this.columns = columns
    this.data = data
    this.caption = caption
  }

  render() {
    const table = document.createElement('table')
    table.classList.add(styles.table)

    table.innerHTML = `
      <caption class="${styles['table-caption']}">${this.caption}</caption>
      <thead>
        <tr>
          ${this.columns
            .map(
              (column) =>
                `<th class="${styles['table-header']}">${column}</th>`,
            )
            .join('')}
        </tr>
      </thead>
      <tbody>
        ${this.data
          .map(
            (row) => `
          <tr class="${styles['table-row']}">
            ${this.columns
              .map(
                (column) =>
                  `<td class="${styles['table-cell']}" data-label="${column}">${row[column]}</td>`,
              )
              .join('')}
          </tr>
        `,
          )
          .join('')}
      </tbody>
    `

    return table
  }
}

export { Table }
