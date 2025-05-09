let boxes = document.querySelectorAll(".box")
let rst = document.querySelector("#rst")
let newGame = document.querySelector("#new")
let win = document.querySelector("#win")
let dis = document.querySelector(".dis")
let main1 = document.querySelector("main")
let modes = document.querySelectorAll("input[name='player']")
let currentMode = "single"

modes.forEach(function (mode) {
    mode.addEventListener('change', function () {
        currentMode = mode.value
        Restart()
    })
})

let turnO = true
let count = 0

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach(function (box) {
    box.addEventListener('click', function () {
        if (currentMode === "multi") {
            if (turnO) {
                box.innerHTML = "O"
                turnO = false
                box.classList.add("O")
            }
            else {
                box.innerHTML = "X"
                turnO = true
                box.classList.add("X")
            }
            box.disabled = true
            count++
            const isWinner = checkWinner()
            if (count === 9 && !isWinner) {
                dis.classList.remove("hide")
                main1.classList.add("add")
                win.innerHTML = "Draw"
            }
        }
        else {
            box.innerHTML = "O"
            turnO = false
            box.classList.add("O")
            box.disabled = true
            count++
            let isWinner = checkWinner()
            if (count === 9 && !isWinner) {
                dis.classList.remove("hide")
                main1.classList.add("add")
                win.innerHTML = "Draw"
            }
            Computer()
        }
    })
})
function Computer() {
    const emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "")
    if (emptyBoxes.length === 0) {
        return
    }
    for (let patt of winPattern) {
        let pat0 = boxes[patt[0]].innerHTML
        let pat1 = boxes[patt[1]].innerHTML
        let pat2 = boxes[patt[2]].innerHTML
        let values = [pat0, pat1, pat2]
        const X = values.filter(v => v === "X")
        const empt = values.includes("")
        if (X.length === 2 && empt) {
            let index = patt[values.indexOf("")]
            boxes[index].innerHTML = "X"
            boxes[index].classList.add("X")
            boxes[index].disabled = true
            count++
            checkWinner()
            return
        }
    }
    for (let patt of winPattern) {
        let pat0 = boxes[patt[0]].innerHTML
        let pat1 = boxes[patt[1]].innerHTML
        let pat2 = boxes[patt[2]].innerHTML
        let values = [pat0, pat1, pat2]
        const O = values.filter(v => v === "O")
        const empt = values.includes("")
        if (O.length === 2 && empt) {
            let index = patt[values.indexOf("")]
            boxes[index].innerHTML = "X"
            boxes[index].classList.add("X")
            boxes[index].disabled = true
            count++
            checkWinner()
            return
        }

    }
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]
    randomBox.innerHTML = "X"
    randomBox.classList.add("X")
    randomBox.disabled = true
    count++
    const isWinner = checkWinner()
    if (count === 9 && !isWinner) {
        dis.classList.remove("hide")
        main1.classList.add("add")
        win.innerHTML = "Draw"
    }
}
function checkWinner() {
    for (let patt of winPattern) {
        let pos0 = boxes[patt[0]].innerHTML
        let pos1 = boxes[patt[1]].innerHTML
        let pos2 = boxes[patt[2]].innerHTML

        if (pos0 != "" && pos1 != "" && pos2 != "") {
            if (pos0 === pos1 && pos1 === pos2) {
                dis.classList.remove("hide")
                main1.classList.add("add")
                win.innerHTML = pos0 + " is the Winner"
                return true
            }
        }
    }
}
function Restart() {
    for (let box of boxes) {
        box.innerHTML = ""
        box.classList.remove("O", "X")
        box.disabled = false
    }
    main1.classList.remove("add")
    dis.classList.add("hide")
    count = 0;
    turnO = true;
}

rst.addEventListener('click', Restart)
newGame.addEventListener('click', Restart)