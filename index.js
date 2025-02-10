let currentIndex = 0
const items = document.querySelectorAll(".carousel-item")
const totalItems = items.length

let autoChangeInterval // Variável para controlar o intervalo de troca automática

// Função para atualizar o slide
function updateCarousel() {
  const carousel = document.querySelector(".carousel")
  const offset = -currentIndex * 100 // Calcula a posição do carrossel
  carousel.style.transform = `translateX(${offset}%)` // Aplica a transformação
}

// Função para alterar o item com base na direção
function changeItem(direction) {
  currentIndex += direction // Modifica o índice baseado na direção (1 ou -1)

  if (currentIndex < 0) {
    currentIndex = totalItems - 1 // Volta ao último item se for menor que 0
  } else if (currentIndex >= totalItems) {
    currentIndex = 0 // Volta ao primeiro item se for maior ou igual ao total de itens
  }

  updateCarousel()

  // Reinicia o intervalo quando o usuário clicar nas setas
  resetAutoChange()
}

// Função para navegação automática a cada 5 segundos
function startAutoChange() {
  autoChangeInterval = setInterval(() => {
    changeItem(1) // Move para o próximo item automaticamente
  }, 5000)
}

// Função para resetar o timer e reiniciar a navegação automática
function resetAutoChange() {
  clearInterval(autoChangeInterval) // Limpa o intervalo anterior
  startAutoChange() // Reinicia o intervalo
}

// Inicializa o carrossel e começa a navegação automática
startAutoChange()
