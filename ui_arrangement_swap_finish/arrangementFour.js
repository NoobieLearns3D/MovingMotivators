var empty;
var dragSource;
var univI = 0;
var emptyDragSource;
var dropEndIn;
var classNameOfDropEndIn;

var containerOneElements = []
var containerTwoElements = []
var emptyContainerClassNames = {}


function gatherDataAndInitialize()  // Gather all the required data such as className id and add required eventListeners
{
    console.log("GATHERING DATA")

    const cards = document.querySelectorAll(".blockOne")
    var disableFinishButton = document.querySelector('.button').classList.add('hideDisplay') // disable finish button
    
    console.log("Displaying data of cards:", cards)
    cards.forEach(function (item) {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    })

    empty = document.querySelectorAll("#empty")
    console.log('empty :>> ', empty);
    deactivateAndDisplaySingle(empty);      //(1)
    addEventListeners(empty)                //(2)

    separateContainerOneAndContainerTwoCards(cards)    //(3)
}


// Display only single card at the beginning

function deactivateAndDisplaySingle(empty) {
    console.log("Deactivating display: ")
    for (var m = 0; m < empty.length; m++)
    {
        emptyContainerClassNames[empty[m].className] = 0
        empty[m].classList.add('hideDisplay')
    
    }
    console.log("Empty boxes and their state: ", emptyContainerClassNames)
    empty[0].classList.remove('hideDisplay')
    empty[0].classList.add('highlightAfterDisplay')
}

// Add event listeners to all the empty slots

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

// separate all the container one and container two cards just to keep count and move the boxes

function separateContainerOneAndContainerTwoCards(cards) {
    console.log("Separating...")
    for (var i = 0; i < 7; i++)
        containerOneElements.push(cards[i].id)
    console.log("CONTAINER ONE ELEMENTS: ", containerOneElements)

    for (var j = 7; j < cards.length; j++)
        containerTwoElements.push(cards[j].id)
    console.log("CONTAINER TWO ELEMENTS: ", containerTwoElements)
}

//Event Listeners

function dragStart(e) {
    console.log(" %c ************************** DRAG START ***********************************************", 'color: darkgreen')
    console.log('this :>> ', this);
    dragSource = this;
    dropEndIn = ""
    //const hideThis = dragSource.cloneNode()
    console.log("DragSource: ", dragSource)
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
        const hideMe = document.getElementById(dragSource.id)
        console.log("CARD TO HIDE: ", hideMe)
        hideMe.classList.add('hideDisplay')
    }
    console.log(" %c ************************** DRAG END ***********************************************", 'color: darkgreen')
}


function emptyDragStart(e) {
    console.log("Empty slot drag start from class: ", this.id)
    dragSource = this;
    dropEndIn = ""
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", this.innerHTML)
}


function dragOver(e) {
    e.preventDefault()
    console.log(" Drag Over ")
    dragSource.classList.remove('transform', 'scale')
}

function dragEnter(e) {
    console.log(" **** Entering Drag **** ")
    this.classList.add('over')
}

function dragLeave(e) {
    console.log(" Card not in valid drop section ")
    this.classList.remove('over')
}


function drop(e) {
    e.stopPropagation()
    console.log(" %c 'this' in drop function: ", 'color:red', this)
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

            containerOneElements.splice(indexOfelem, 1)
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

        this.classList.remove('over')
        this.classList.remove('highlightAfterDisplay')
        dropEndIn = this.id
        classNameOfDropEndIn = this.className
        console.log("Drop ended in: ", dropEndIn)
        console.log("this.id:", this.id, ", this.className:", this.className)

        // console.log("this.id: ", this.id, e.target.id), this.id and e.target.id will give same output 

        if (dragSource.id == this.id) {
            console.log("%c **** DRAG AND DROP IN THE SAME CONTAINER **** ",'background:red;color:white')
            console.log("Drag started from: ", dragSource.id, dragSource.className, "and Drag ended in: ", this.id, this.className)
            classNameOfDropEndIn = this.className

            let childCount = dragSource.className
            console.log(document.querySelector('.' + dragSource.className).children.length)
            console.log(document.querySelector('.' + classNameOfDropEndIn).children.length)
            console.log("Children count: ", childCount)

            // if the container has no image then child count is zero, so highlight the card that needs to be highlighted
            // else if both the containers have children then no need for highlight because both will be filled

            if (document.querySelector('.' + dragSource.className).children.length != 1)
                dragSource.classList.add('highlightAfterDisplay')
            else if (document.querySelector('.' + dragSource.className).children.length == 1)
                console.log("CONTAINS CHILD: ", document.querySelector('.' + dragSource.className).children.length)
        }
        else {

            console.log("Drag started from: ", dragSource.id, "and Drag ended in: ", this.id)
            univI += 1;
            console.log("UnivI: ", univI)
            if (univI >= empty.length) {
                console.log("Activating finish button")
                //activateFinishButton()
            }
            else
                activateDisplay(univI)
        }

        console.log(" %c **** Dropped **** ", 'background:red; color:white')
    }
    checkNumberOfCardsLeft()

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

function activateDisplay(univI) {
    empty[univI].classList.remove('hideDisplay')
    empty[univI].classList.add('highlightAfterDisplay')
}


function checkNumberOfCardsLeft()
{
    console.log("Checking if there is only one card left ...")
    console.log("SECOND CONTAINER ELEMENT: ", containerTwoElements)
    console.log("Checking function: ", containerOneElements, " only ", containerOneElements.length, " cards left")
    if (containerOneElements.length == 1)
    {
        var remainingCard = containerOneElements.shift()
        console.log("REMAINAING CARD: ", remainingCard)

        console.log("Elements of container One: ", containerOneElements)
        var lastCard = document.getElementById(remainingCard)
        lastCard.classList.remove('hideDisplay')
        console.log("LAST CARD DETAILS: ", lastCard)
        var lastEmptySlot = document.querySelector('.highlightAfterDisplay')
        console.log("EMPTY SLOT DETAILS: ", lastEmptySlot)
        lastEmptySlot.appendChild(lastCard)
        lastEmptySlot.classList.remove('highlightAfterDisplay')
        activateFinishButton()
        
    }
        
}


function activateFinishButton()
{
    document.querySelector('.outerContainer').style.filter = "blur(10px)"
    var getFinishButton = document.querySelector('button')
    console.log(getFinishButton)
    getFinishButton.classList.remove('hideDisplay')
    getFinishButton.style.cursor = "pointer"

    getFinishButton.onclick = function(){
        
        var askConfirm = confirm("Would you like to rearrange ... ?")
        if (confirm)
        {   
            var areYouSure = alert("Are you sure... ? ")
            document.querySelector('.outerContainer').style.filter = "blur(0px)"
        }
        else
            alert("Generating PDF")
    }
}