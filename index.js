let currentIndex = 0
const items = document.querySelectorAll(".carousel-item")
const totalItems = items.length

let autoChangeInterval

function updateCarousel() {
  const carousel = document.querySelector(".carousel")
  const offset = -currentIndex * 100
  carousel.style.transform = `translateX(${offset}%)`
}

function changeItem(direction) {
  currentIndex += direction

  if (currentIndex < 0) {
    currentIndex = totalItems - 1
  } else if (currentIndex >= totalItems) {
    currentIndex = 0
  }

  updateCarousel()

  resetAutoChange()
}

function startAutoChange() {
  autoChangeInterval = setInterval(() => {
    changeItem(1)
  }, 5000)
}

function resetAutoChange() {
  clearInterval(autoChangeInterval)
  startAutoChange()
}

startAutoChange()
