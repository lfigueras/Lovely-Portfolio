import { Controller } from "@hotwired/stimulus"

// Highlights the left-side bullet for whichever section is at the viewport center.
export default class extends Controller {
  static targets = ["dot"]

  connect() {
    this.sections = this.dotTargets
      .map((dot) => document.getElementById(dot.dataset.section))
      .filter(Boolean)

    this.observer = new IntersectionObserver(
      (entries) => this.onIntersect(entries),
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    )
    this.sections.forEach((section) => this.observer.observe(section))
  }

  disconnect() {
    this.observer?.disconnect()
  }

  onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) this.activate(entry.target.id)
    })
  }

  activate(id) {
    this.dotTargets.forEach((dot) => {
      const active = dot.dataset.section === id
      dot.style.backgroundColor = active ? "#e35c2b" : "transparent"
      dot.style.borderColor = active ? "#e35c2b" : "rgba(26, 26, 26, 0.4)"
      dot.style.transform = active ? "scale(1.6)" : "scale(1)"
    })
  }
}
