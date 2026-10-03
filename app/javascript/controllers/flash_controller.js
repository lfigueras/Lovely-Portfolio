import { Controller } from "@hotwired/stimulus"

// Auto-dismisses a flash message after a short delay.
export default class extends Controller {
  static values = { delay: { type: Number, default: 4000 } }

  connect() {
    this.timeout = setTimeout(() => this.dismiss(), this.delayValue)
  }

  disconnect() {
    clearTimeout(this.timeout)
  }

  dismiss() {
    this.element.style.opacity = "0"
    this.element.addEventListener("transitionend", () => this.element.remove(), { once: true })
  }
}
