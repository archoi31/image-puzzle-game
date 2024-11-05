const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")
const tiles = document.querySelectorAll(".image-container > li")
const cheatkey = document.querySelector(".cheat-key")

cheatkey.addEventListener("click", function(){
    [...container.children].forEach(child => {
        child.innerText = child.getAttribute("data-type")
    })
})

let isPlaying = false;
let timeInterval = null;
let time = 0;

const dragged = {
    el : null,
    class : null,
    index : null,
}

startButton .addEventListener("click",()=>{
    setGame()
})

function setGame(){
    time = 0;
    gameText.style.display = "none"
    timeInterval = setInterval(()=>{
        time++;
        playTime.innerText = time;
      
    }, 1000)

    const gameTiles = shuffle([...tiles]);
    
    container.innerHTML = "";
    gameTiles.forEach(tile => {
        container.appendChild(tile)
    })
}

function shuffle(array){
    let index = array.length - 1 ;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
        index--;
    }
    return array;
}

function checkStatus(){
    const currentList = [...container.children];

    const unMatched = currentList.filter((list,index) => {
        return Number(list.getAttribute("data-type")) !== index
    })
    if(unMatched.length === 0){
        isPlaying = false;
        clearInterval(timeInterval)
        gameText.style.display = "block";
    }
    console.log(unMatched)
}

container.addEventListener("dragstart", e=>{
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf({obj});
    
})
container.addEventListener("dragover", e=>{
    e.preventDefault()
    // console.log(e)
})
container.addEventListener("drop",e=>{
    const obj = e.target;
    let originPlace;
    let isLast = false;

    if(dragged.el.nextSiling){i
        originPlace = dragged.el.nextSiling;
    }else{
        originPlace = dragged.el.previousSibling;
        isLast = true;
    }
    const droppedIndex = [...obj.parentNode.children].indexOf({obj});
    dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
    isLast ? originPlace.after(obj) : originPlace.before(obj);
    checkStatus()
})
