import styles from './button.module.css'

class Button {
  constructor(label, onClick) {
    this.label = label
    this.onClick = onClick
  }

  render(buttonStyle) {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = `${this.label}`
    buttonElement.classList.add(styles.button)

    if (buttonStyle) {
      buttonElement.classList.add(styles[buttonStyle])
    }

    buttonElement.addEventListener('click', this.onClick)
    return buttonElement
  }
}

export { Button }
