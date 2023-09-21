const buttons = document.querySelectorAll('button')
const inputElements = document.querySelectorAll("section > div > input");
const dropDivs = document.querySelectorAll("section > div");
function createTask(e) {
    e.target.nextElementSibling.className = 'show'
    e.target.nextElementSibling.focus()
}
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createTask)
}


function handleInput(e) {
    if (e.keyCode == 13) {
        e.target.className = 'hide'
        const card = document.createElement('div')
        card.className = 'card'
        card.draggable = 'true'
        card.innerHTML = `
        <p>${e.target.value}</p>
        <button onclick="handleDelete(this)" >delete</button>
        `
        e.target.nextElementSibling.appendChild(card)
        e.target.value = ''
        getAllCards()
    }
}

for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('keyup', handleInput)
}

function handleDelete(buttonRef) {
    buttonRef.parentNode.remove()
    getAllCards()
}
const cols = document.querySelectorAll('section>div')
for (let i = 0; i < cols.length; i++) {
    cols[i].addEventListener("drop", (e) => {
        e.preventDefault()
    })
}
function getAllCards() {
    const cards = document.getElementsByClassName('card')
    for (let card of cards) {
        card.addEventListener('dragstart', (e) => {
            let selectedCard = e.target
            for (let dropDiv of dropDivs) {
                dropDiv.addEventListener('dragenter', e => {
                    let dropArea = e.target
                    if(dropArea.className=='cards') 
                    dropArea.style.border = "1px dashed blue"
                })
                dropDiv.addEventListener('dragleave', e => {
                    let dropArea = e.target
                    if(dropArea.className=='cards') 
                    dropArea.style.border = "none"
                })
                dropDiv.addEventListener('dragover', e => {
                    e.preventDefault()
                })
                dropDiv.addEventListener('drop', e => {
                    e.target.appendChild(selectedCard)
                    selectedCard = null
                    e.target.style.border = 'none'
                })
            }

        })
    }
}