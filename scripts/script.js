//Iniciar variáveis
const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let vez = 0

//Variáveis para o tempo
let hour = 0
let minute = 0
let second = 0

let checkTime = ''

let cron = null


//Inicia o jogo
function startGame() {
    let startGameLayer = document.getElementById('game-start')
    startGameLayer.style.display = 'none'

    startCounter()

    game.createCardsFromCharacters();
    initializeCards(game.cards);
}

//Adiciona cada uma das cartas no tabuleiro
function initializeCards(cards) {

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ''

    cards.forEach((card) => {

        //Cria HTML da carta
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    })

}

//Adiciona frente e verso a carta 
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement, cardBack)
}

//Monta a parte de trás
function cardBack(cardElementFace) {
    img_backcard = `<img class="brain" src="https://play-lh.googleusercontent.com/MxSC9b_LaOeh_4e-1e2Ilx5Vzk_v4zSwxdyxhp1y-H63VXCgB2V4emjV-IolhOoG3w-S" alt="🇯🇵">`;
    cardElementFace.innerHTML = img_backcard
}

//Cria frente e verso da carta
function createCardFace(face, card, cardElement, cardBack) {
    setTimeout(() => {
        let cardElementFace = document.createElement("div");
        cardElementFace.classList.add(face);
        

        if (face === FRONT) {
            let iconElement = document.createElement("img");
            iconElement.classList.add(ICON);
            iconElement.src = "./images/" + card.icon + ".png";
            cardElementFace.appendChild(iconElement);
        } else {
            cardBack(cardElementFace)
        }
        cardElement.appendChild(cardElementFace)
    }, 100)
}

//Vira a carta, verifica se ela continuará virada e se o jogo acabou
function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip")

        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    //Mostra resultados
                    vez++
                    checkTime = counter.innerText
                    createResults()
                    clearInterval(cron)

                    setTimeout(() => {
                        let gameOverLayer = document.getElementById('game-over')
                        gameOverLayer.style.display = 'flex'
                    }, 500)
                }
            } else {

                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)

            }
        }
    }
}

//Recomeçar jogo
function restartGame() {
    //Reiniciar contador
    clearInterval(cron)
    hour = 0
    minute = 0
    second = 0

    counter.innerText = "00:00:00"

    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById('game-over')
    gameOverLayer.style.display = 'none'
}

//Iniciar contador
function startCounter() {

    let counter = document.getElementById("counter")

    cron = setInterval(() => {
        second++
        if (second == 60) {
            second = 0
            minute++
        }
        if (minute == 60) {
            minute = 0
            hour++
        }

        let format = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second)
        counter.innerText = format
    }, 1000)
}

//Cria cronometragens
function createResults() {
    let resultsContainer = document.getElementById('resultsContainer')
    let numberOfResults = resultsContainer.children.length
    if (numberOfResults > 2) {
        resultsContainer.removeChild(resultsContainer.children[0])
    }

    let divResults = document.createElement('divResults')
    divResults.id = 'divResults'
    let result = document.createElement('h1')
    result.innerText = checkTime
    result.classList = 'result'

    divResults.appendChild(result)
    resultsContainer.appendChild(divResults)

}