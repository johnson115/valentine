const messages = [
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely you don't mean it?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ]
  
  let messageIndex = 0
  let noButtonScale = 1
  
  function handleNoClick() {
    const noButton = document.querySelector(".no-btn")
    const yesButton = document.querySelector(".yes-btn")
  
    messageIndex = (messageIndex + 1) % messages.length
    noButton.textContent = messages[messageIndex]
  
    noButtonScale *= 0.9
    noButton.style.transform = `scale(${noButtonScale})`
  
    const yesButtonScale = Number.parseFloat(yesButton.style.transform.replace("scale(", "").replace(")", "") || 1)
    yesButton.style.transform = `scale(${yesButtonScale * 1.08})`
  
    moveNoButton()
    createHeart()
  }
  
  function moveNoButton() {
    const noButton = document.querySelector(".no-btn")
    const containerRect = document.querySelector(".container").getBoundingClientRect()
    const buttonRect = noButton.getBoundingClientRect()
  
    const maxX = containerRect.width - buttonRect.width
    const maxY = containerRect.height - buttonRect.height
  
    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)
  
    noButton.style.position = "absolute"
    noButton.style.left = `${randomX}px`
    noButton.style.top = `${randomY}px`
  }
  
  function handleYesClick() {
    const container = document.querySelector(".container")
    container.innerHTML = `
          <h1 class="title">Yay! Happy Valentine's Day!</h1>
          <div class="gif-container">
              <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmpqeXpjY3Vpc21oNXVrYTMzaGN3YjBrZ2p4aXljaGlhNGgyNGsyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1hoKkBNSBxVyHIsPer/giphy.gif" alt="Celebration GIF" class="valentine-gif">
          </div>
          <p>Thank you for being my Valentine! ❤️</p>
          <button class="btn share-btn" onclick="shareGiftCard()">Share Gift Card</button>
      `
    setInterval(createHeart, 300)
  }
  
  function createHeart() {
    const heart = document.createElement("div")
    heart.classList.add("heart")
    heart.style.left = Math.random() * 100 + "vw"
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"
    document.body.appendChild(heart)
  
    setTimeout(() => {
      heart.remove()
    }, 5000)
  }
  
  function generateGiftCard() {
    const canvas = document.getElementById("giftCardCanvas")
    const ctx = canvas.getContext("2d")
  
    canvas.width = 1080
    canvas.height = 1080
  
    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#ff758c")
    gradient.addColorStop(1, "#ff7eb3")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    // Border
    ctx.strokeStyle = "#FF4D6D"
    ctx.lineWidth = 20
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
  
    // Text
    ctx.fillStyle = "#590D22"
    ctx.font = 'bold 80px "Dancing Script", cursive'
    ctx.textAlign = "center"
    ctx.fillText("Happy Valentine's Day!", canvas.width / 2, 200)
  
    ctx.font = "40px Poppins, sans-serif"
    ctx.fillText("To my special someone", canvas.width / 2, 300)
  
    // Heart shape
    ctx.beginPath()
    const x = canvas.width / 2
    const y = canvas.height / 2
    const size = 200
    ctx.moveTo(x, y + size * 0.3)
    ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size, y + size / 3, x, y + size)
    ctx.bezierCurveTo(x - size, y + size / 3, x - size / 2, y - size / 2, x, y + size * 0.3)
    ctx.fillStyle = "#FF4D6D"
    ctx.fill()
  
    // Date
    ctx.font = "30px Poppins, sans-serif"
    ctx.fillStyle = "#590D22"
    ctx.fillText("February 14, 2024", canvas.width / 2, canvas.height - 100)
  
    return canvas.toDataURL("image/png")
  }
  
  function shareGiftCard() {
    const giftCardImage = generateGiftCard()
    const link = document.createElement("a")
    link.href = giftCardImage
    link.download = "valentine_gift_card.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  // Initial heart animation
  setInterval(createHeart, 1000)
  
  