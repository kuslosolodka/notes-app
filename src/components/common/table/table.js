class Table {
  constructor(columns, data, caption) {
    this.columns = columns;
    this.data = data;
    this.caption = caption;
  }

  render() {
    const table = document.createElement('table');
    table.innerHTML = `
        <caption>${this.caption}</caption>
        <thead>
          <tr>
            ${this.columns.map((column) => `<th>${column}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${this.data
            .map(
              (row) => `
            <tr>
              ${this.columns
                .map((column) => `<td>${row[column]}</td>`)
                .join('')}
            </tr>
          `,
            )
            .join('')}
        </tbody>
      `;

    return table;
  }
}

export { Table };
