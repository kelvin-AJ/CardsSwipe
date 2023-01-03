const cards =  [
    "2_of_clubs",
    "3_of_clubs",
    "4_of_clubs",
    "5_of_clubs",
    "6_of_clubs",
    "7_of_clubs",
    "8_of_clubs",
    "9_of_clubs",
    "10_of_clubs",
    "jack_of_clubs",
    "queen_of_clubs",
    "king_of_clubs",
    "ace_of_clubs",
    "2_of_diamonds",
    "3_of_diamonds",
    "4_of_diamonds",
    "5_of_diamonds",
    "6_of_diamonds",
    "7_of_diamonds",
    "8_of_diamonds",
    "9_of_diamonds",
    "10_of_diamonds",
    "jack_of_diamonds",
    "queen_of_diamonds",
    "king_of_diamonds",
    "ace_of_diamonds",
    "2_of_hearts",
    "3_of_hearts",
    "4_of_hearts",
    "5_of_hearts",
    "6_of_hearts",
    "7_of_hearts",
    "8_of_hearts",
    "9_of_hearts",
    "10_of_hearts",
    "jack_of_hearts",
    "queen_of_hearts",
    "king_of_hearts",
    "ace_of_hearts",
    "2_of_spades",
    "3_of_spades",
    "4_of_spades",
    "5_of_spades",
    "6_of_spades",
    "7_of_spades",
    "8_of_spades",
    "9_of_spades",
    "10_of_spades",
    "jack_of_spades",
    "queen_of_spades",
    "king_of_spades",
    "ace_of_spades"
];

function getCardHtml(cards) {
    let html = '';
    for (const card of cards) {
      html += `<div class="normal-card card"><img src="./cards_png/${card}.png"></div>`;
    }
    
    document.querySelector(".cards-stack").insertAdjacentHTML("afterbegin", html)
}

getCardHtml(cards);
  


const topCard = document.querySelector(".top-card");

let startPageY;
let startPageX;
let startTime;
let complete = false;
let count = 1

topCard.addEventListener("touchstart", initializeCardMove)

function initializeCardMove(e) {
    e.preventDefault();

    const [touchObejct] = e.changedTouches;
    startPageY = touchObejct.pageY;
    startPageX = touchObejct.pageX;

    startTime = new Date().getTime();
}


topCard.addEventListener("touchmove", e => moveCards(e, topCard))

function moveCards(e, cardEl) {
    const currentTime = new Date().getTime();
    const [touchObject] = e.changedTouches;
    const elapsedTime = currentTime - startTime;

    // const dragDistanceX = -(Math.trunc(startPageY - touchObject.pageY));

    const dragDistanceY = -(Math.trunc(startPageY - touchObject.pageY));

    // topCard.style.transform = `translate(0px, ${dragDistanceY}px)`;

    if(elapsedTime < 300 && dragDistanceY < -150){
        cardEl.classList.add("up-card");
        cardEl.classList.remove("top-card");
        cardEl.style.zIndex = `${++count}`
        complete = true
    }

    if(elapsedTime < 300 && dragDistanceY > 150){
        cardEl.classList.add("down-card");
        cardEl.classList.remove("top-card");
        cardEl.style.zIndex = `${++count}`
        complete = true
    }
}



topCard.addEventListener("touchend", e => {
    if(complete)updateTopCard();
})


function updateTopCard() {
    complete = false

    const domCardsStack = [...document.querySelectorAll(".normal-card")]
    const lastCard = domCardsStack[domCardsStack.length -1 ]
    console.log(lastCard)

    if(lastCard.classList.contains("top-card")) return;

    lastCard.classList.add("top-card");
    lastCard.classList.remove("normal-card");
    lastCard.addEventListener("touchstart", initializeCardMove);
    lastCard.addEventListener("touchmove", e => moveCards(e, lastCard));
    lastCard.addEventListener("touchend", e => {
        if(complete)updateTopCard();
    })

}