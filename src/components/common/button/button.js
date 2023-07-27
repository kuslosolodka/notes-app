import styles from './button.module.css';

class Button {
  constructor(label, onClick) {
    this.label = label;
    this.onClick = onClick;
  }

  render() {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = `${this.label}`;
    buttonElement.classList.add(styles.button);
    buttonElement.addEventListener('click', this.onClick);
    return buttonElement;
  }
}

export { Button };
