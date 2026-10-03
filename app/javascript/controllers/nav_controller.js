import { Controller } from "@hotwired/stimulus"

// Toggles the mobile nav menu with a smooth max-height/opacity transition.
export default class extends Controller {
  static targets = ["menu"]

  toggle() {
    const opening = this.menuTarget.classList.contains("max-h-0")
    this.setOpen(opening)
  }

  close() {
    this.setOpen(false)
  }

  setOpen(open) {
    this.menuTarget.classList.toggle("max-h-0", !open)
    this.menuTarget.classList.toggle("opacity-0", !open)
    this.menuTarget.classList.toggle("max-h-96", open)
    this.menuTarget.classList.toggle("opacity-100", open)
  }
}
