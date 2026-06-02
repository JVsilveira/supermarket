class Carousel {
  constructor({
    carouselSelector = ".carousel",
    itemSelector = ".carousel-item",
    prevSelector = ".prev",
    nextSelector = ".next",
    autoplayTime = 5000,
  } = {}) {
    this.currentIndex = 0
    this.autoplayTime = autoplayTime

    this.carousel = document.querySelector(carouselSelector)
    this.items = [...document.querySelectorAll(itemSelector)]

    this.prevButton = document.querySelector(prevSelector)
    this.nextButton = document.querySelector(nextSelector)

    this.totalItems = this.items.length
    this.interval = null

    this.initialize()
  }

  initialize() {
    if (!this.carousel || !this.totalItems) return

    this.bindEvents()
    this.startAutoplay()
    this.update()
  }

  bindEvents() {
    this.prevButton?.addEventListener("click", () => {
      this.previous()
    })

    this.nextButton?.addEventListener("click", () => {
      this.next()
    })

    this.carousel.addEventListener("mouseenter", () => {
      this.stopAutoplay()
    })

    this.carousel.addEventListener("mouseleave", () => {
      this.startAutoplay()
    })
  }

  update() {
    this.carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`
  }

  next() {
    this.goTo(this.currentIndex + 1)
  }

  previous() {
    this.goTo(this.currentIndex - 1)
  }

  goTo(index) {
    this.currentIndex = (index + this.totalItems) % this.totalItems

    this.update()
    this.restartAutoplay()
  }

  startAutoplay() {
    this.stopAutoplay()

    this.interval = setInterval(() => {
      this.next()
    }, this.autoplayTime)
  }

  stopAutoplay() {
    clearInterval(this.interval)
  }

  restartAutoplay() {
    this.startAutoplay()
  }
}

function initializeMenu() {
  const hamburgerMenu = document.getElementById("hamburgerMenu")

  const dropdownMenu = document.getElementById("dropdownMenu")

  hamburgerMenu?.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active")
    dropdownMenu?.classList.toggle("open")
  })
}

function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchForm = document.getElementById("searchForm")
  const products = document.querySelectorAll(".product-card")
  const noResults = document.getElementById("noResults")

  searchForm?.addEventListener("submit", event => {
    event.preventDefault()
  })

  searchInput?.addEventListener("input", event => {
    const searchTerm = event.target.value.toLowerCase().trim()

    let visibleProducts = 0

    products.forEach(product => {
      const productName =
        product.querySelector("h3")?.textContent.toLowerCase() || ""

      const isVisible = productName.includes(searchTerm)

      product.classList.toggle("hidden", !isVisible)

      if (isVisible) {
        visibleProducts++
      }
    })

    if (visibleProducts === 0) {
      noResults.style.display = "block"
    } else {
      noResults.style.display = "none"
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  new Carousel()

  initializeMenu()

  initializeSearch()
})
