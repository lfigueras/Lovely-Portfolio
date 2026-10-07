import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "navItem", "viewLabel"]

  connect() {
    this.activate("overview")
  }

  show(event) {
    this.activate(event.currentTarget.dataset.view)
  }

  activate(view) {
    this.panelTargets.forEach((panel) => {
      panel.hidden = panel.dataset.viewPanel !== view
    })

    this.navItemTargets.forEach((item) => {
      item.setAttribute("aria-current", item.dataset.view === view ? "page" : "false")
    })

    if (this.hasViewLabelTarget) {
      this.viewLabelTarget.textContent = view.toUpperCase()
    }
  }
}