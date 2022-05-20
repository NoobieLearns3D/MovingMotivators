var empty;
var dragSource;
var univI = 0;
var addedCards = new Set();
var emptyDragSource;
var dropEndIn;
var classNameOfDropEndIn;

var containerOneElements = []
var containerTwoElements = []
var containerOneDragCount = 0

var imageIdAndImageName = { 'myCardIdEight': 'powerCard.png', 'myCardIdNine': 'relatednessCard.png', 'myCardTen': 'statusCard.png' }

function gatherDataAndInitialize()  // Gather all the required data such as className id and add required eventListeners
{
    console.log("GATHERING DATA")

    document.querySelector('button').classList.add('hideDisplay')
    empty = document.querySelectorAll("#empty")
    console.log('empty :>> ', empty);
    deactivateAndDisplaySingle(empty);
    addEventListeners(empty)

    const cards = document.querySelectorAll(".blockOne")
    console.log("Displaying data of cards:", cards)
    cards.forEach(function (item) {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    })

    separateContainerOneAndContainerTwoCards(cards)
}

function addEventListeners(empty) {
    empty.forEach(function (f) {
        f.addEventListener('dragstart', emptyDragStart);
        f.addEventListener('dragover', dragOver);
        f.addEventListener('dragenter', dragEnter);
        f.addEventListener('dragleave', dragLeave);
        f.addEventListener('dragend', dragEnd);
        f.addEventListener('drop', drop);

    })
}


function deactivateAndDisplaySingle(empty) {
    console.log("Deactivating display: ")
    for (var m = 0; m < empty.length; m++)
        empty[m].classList.add('hideDisplay')
    empty[0].classList.remove('hideDisplay')
    empty[0].classList.add('highlightAfterDisplay')

}

function dragStart(e) {
    console.log("*************************************************************************")
    dragSource = this;
    dropEndIn = ""
    //const hideThis = dragSource.cloneNode()
    console.log("dragSource: ", dragSource)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", this.innerHTML)
    console.log("Drag start, from class", this.id)
}

//Ending drag event of the dragged card, drop not handeled in this function
function dragEnd(e) {
    console.log(" DRAG END FUNC: Drop ended in,", dropEndIn, classNameOfDropEndIn)
    if (dropEndIn.length == 0)
        alert("Invalid drop location")
    else {
        const hideMe = document.getElementById(e.target.id)
        console.log("CARD TO HIDE: ", hideMe)
        hideMe.classList.add('hideDisplay')
    }
    console.log("containerOneDragCount is: ", containerOneDragCount)
    console.log("***************************************************************************")

}

function emptyDragStart(e) {
    console.log("empty slot drag start from class: ", this.id)
    dragSource = this;
    dropEndIn = ""
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", this.innerHTML)
}

function dragOver(e) {
    e.preventDefault()
    console.log("Drag Over")
    dragSource.classList.remove('transform','scale')
}

function dragEnter(e) {
    console.log("Entering Drag")
    this.classList.add('over')
}

function dragLeave(e) {
    console.log("Left Drag")
    this.classList.remove('over')
}

function drop(e) {
    e.stopPropagation()

    console.log("this in drop function: ", this)
    console.log("DRAG SOURCE: ", dragSource)

    if (dragSource !== this) {
        dragSource.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

        if (containerOneElements.indexOf(dragSource.id) != -1 && dragSource.id != 'empty') {
            console.log("this after drop: ", this.id)
            console.log('Element ', dragSource.id, ' is in containerOne')
            console.log("Removing from container One list...")

            indexOfelem = containerOneElements.indexOf(dragSource.id)  // find the index of dragged element
            console.log("Element found at: ", indexOfelem)

            containerOneElements.splice(indexOfelem, 1)   // remove elements from containerOne
            console.log("UPDATED containerOne list: ", containerOneElements)
            moveFromSecondContainer()

        }

        else if (containerTwoElements.indexOf(dragSource.id) != -1 && dragSource.id != 'empty') {
            console.log("this after drop: ", this.id)
            console.log('Element ', dragSource.id, ' is in containerTwo')
            console.log("Removing from containerTwo list...")

            indexOfelem = containerTwoElements.indexOf(dragSource.id)  // find the index of dragged element
            console.log("Element found at: ", indexOfelem)

            containerTwoElements.splice(indexOfelem, 1)
            console.log("UPDATED containerTwo list: ", containerTwoElements)
            
        }
    }

    this.classList.remove('over')
    this.classList.remove('highlightAfterDisplay')

    dropEndIn = this.id
    classNameOfDropEndIn = this.className
    console.log("Drop ended in: ", dropEndIn)
    console.log("this.id: ", this.id, e.target.id)

    if (dragSource.id == this.id) {
        console.log("Drag started from: ", dragSource.id,dragSource.className, "and Drag ended in: ", this.id,this.className)
        classNameOfDropEndIn = this.className

        let childCount  = dragSource.className
        console.log(document.querySelector('.'+dragSource.className).children.length)
        console.log(document.querySelector('.'+classNameOfDropEndIn).children.length)
        console.log("Children count: ", childCount)

        if (document.querySelector('.'+dragSource.className).children.length != 1)
            dragSource.classList.add('highlightAfterDisplay')
        else if (document.querySelector('.'+dragSource.className).children.length == 1)
            console.log("CONTAINS CHILD: ", document.querySelector('.'+dragSource.className).children.length)
    }
    else {

        console.log("Drag started from: ", dragSource.id, "and Drag ended in: ", this.id)
        univI += 1;
        console.log("UnivI: ", univI)
        // if (univI >= empty.length) {
        //     console.log("Activating finish button")
        //     //activateFinishButton()
        // }
        // else
            activateDisplay(univI)
    }

    checkNumberOfCardsLeft()
}


function activateDisplay(univI) {
    empty[univI].classList.remove('hideDisplay')
    empty[univI].classList.add('highlightAfterDisplay')
}

function separateContainerOneAndContainerTwoCards(cards) {
    console.log("Separating...")
    for (var i = 0; i < 7; i++)
        containerOneElements.push(cards[i].id)
    console.log("CONTAINER ONE ELEMENTS: ", containerOneElements)

    for (var j = 7; j < cards.length; j++)
        containerTwoElements.push(cards[j].id)
    console.log("CONTAINER TWO ELEMENTS: ", containerTwoElements)
}

function moveFromSecondContainer() {

    console.log("moving from second container...")
    var topElementSecondContainer = containerTwoElements.shift()
    
    if (topElementSecondContainer != undefined)
        containerOneElements.push(topElementSecondContainer)

    var findSecondContainerTopElement = document.getElementById(topElementSecondContainer)
    if (findSecondContainerTopElement != null) {
        console.log("Second container top element:", findSecondContainerTopElement)


        var createDiv = document.createElement('div')
        createDiv.appendChild(findSecondContainerTopElement)
        console.log("add this to container one tail:", createDiv)

        var findContainerOne = document.querySelector('.containerOne')
        findContainerOne.appendChild(createDiv)

        console.log("After movement: ")
        console.log("First container elements: ", containerOneElements)
        console.log("Second container Elements: ", containerTwoElements)
        
    }

}

// After dropping every card, this function is triggered 

function checkNumberOfCardsLeft()
{
    console.log("Checking...")
    console.log(containerOneElements)
    console.log(containerOneElements.length, "cards left")

    if (containerOneElements.length == 1)
    {
        
        //alert("Moving the left out card to appropriate position")
        // var lastCard = containerOneElements
        // console.log("DETAILS OF LAST CARD:", document.querySelector('#'+lastCard))

        // var lastEmptySlot = document.getElementsByClassName('highlightAfterDisplay')
        // console.log("EMPTY SLOT DETAILS:",lastEmptySlot)

        // lastEmptySlot.innerHTML = document.createElement('div').appendChild

        console.log("Elements of container One: ", containerOneElements)
        var lastCard = document.getElementById(containerOneElements[0])
        console.log("LAST CARD DETAILS: ", lastCard)

        var lastEmptySlot = document.querySelector('.highlightAfterDisplay')
        console.log("EMPTY SLOT DETAILS: ", lastEmptySlot)

        //lastCard.classList.add('hideDisplay')


        lastEmptySlot.appendChild(lastCard)
        lastEmptySlot.classList.remove('highlightAfterDisplay')
        //lastCard.classList.add('hideDisplay')


        // var tempCardPropOne = containerOneElements.pop()
        // console.log("TEMP CARD Prop ONE: ", tempCardPropOne)
        // var tempCardPropTwo = document.querySelector(tempCardPropOne).classList.remove('hideDisplay')
        // console.log('tempCardPropTwo :>> ', tempCardPropTwo);

        
    }
    
   
}
