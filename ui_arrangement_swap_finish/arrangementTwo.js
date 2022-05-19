var empty;
var dragSource;
var univI = 0;
var addedCards = new Set();
var emptyDragSource;
var dropEndIn;
var containerOneElements = []
var containerTwoElements = []
var indexOfelem;
var containerOneDragCount = 0
var imageIdAndImageName = {'myCardIdEight':'powerCard.png','myCardIdNine':'relatednessCard.png','myCardIdTen':'statusCard.png'}
 

function gatherDataAndInitialize()  // Gather all the required data such as className id and add required eventListeners
{   
    console.log("GATHERING DATA")

    empty = document.querySelectorAll("#empty")
    console.log('empty :>> ', empty);
    deactivateAndDisplaySingle(empty);
    addEventListeners(empty)

    const cards = document.querySelectorAll(".blockOne")
    console.log("Displaying data of cards:", cards)
    cards.forEach(function (item) 
    {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend',dragEnd);
  })

    separateContainerOneAndContainerTwoCards(cards)

}

function addEventListeners(empty)
{
    empty.forEach( function(f)
    {
        f.addEventListener('dragstart', emptyDragStart);
        f.addEventListener('dragover', dragOver);
        f.addEventListener('dragenter', dragEnter);
        f.addEventListener('dragleave', dragLeave);
        f.addEventListener('dragend', dragEnd);
        f.addEventListener('drop', drop);
        
    })
}


function deactivateAndDisplaySingle(empty)
{
    console.log("Deactivating display: ")
    for(var m = 0;m<empty.length;m++)
        empty[m].classList.add('hideDisplay')
    empty[0].classList.remove('hideDisplay')
    empty[0].classList.add('highlightAfterDisplay')
}

function dragStart(e)
{
    dragSource = this;
    dropEndIn = ""
    //const hideThis = dragSource.cloneNode()
    console.log("dragSource: ",dragSource)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", this.innerHTML)
    console.log("Drag start, from class", this.id)
}

//Ending drag event of the dragged card, drop not handeled in this function
function dragEnd(e){
    console.log(" DRAG END FUNC: Drop ended in,", dropEndIn)
    if(dropEndIn.length == 0)
        alert("Invalid drop location")
    else
    {
        const hideMe = document.getElementById(e.target.id)
        console.log("CARD TO HIDE: ", hideMe)
        hideMe.classList.add('hideDisplay')
    }
    
}

function emptyDragStart(e)
{
    console.log("empty slot drag start from class: ", this.id)
    dragSource = this;
    dropEndIn = ""
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", this.innerHTML)
}

function dragOver(e)
{   
    e.preventDefault()
    console.log("Drag Over")
}

function dragEnter(e)
{
    console.log("Entering Drag")
    this.classList.add('over')
}

function dragLeave(e)
{
    console.log("Left Drag")
    this.classList.remove('over')
}

function drop(e)
{
    e.stopPropagation()
    //foo()

    
    console.log("this in drop function: ",this)
    console.log("DRAG SOURCE: ",dragSource)

    if (dragSource!== this) // drag and drop not allowed in cards slot
    {
        dragSource.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

        if(containerOneElements.indexOf(dragSource.id)!=-1 && dragSource.id != 'empty')  // to move cards from below container
        {
            
            console.log("User has moved ", containerOneDragCount, " from container one ...")
            console.log("this after drop: ", this.id)
            console.log('Element ',dragSource.id,' is in containerOne')
            console.log("Removing from container One list...")
            
            indexOfelem = containerOneElements.indexOf(dragSource.id)  // find the index of dragged element
            console.log("Element found at: ",indexOfelem)

            containerOneElements.splice(indexOfelem, 1)
            console.log("UPDATED containerOne list: ", containerOneElements)
            if(containerOneDragCount <= containerTwoElements.length-1)
            {
                moveFromSecondContainer(containerOneDragCount)
                containerOneDragCount+=1
            }
               
        }
        else
            console.log("CONTAINER TWO EMPTY...")
        // else if (containerTwoElements.indexOf(dragSource.id)!=-1 && dragSource.id !='empty')
        // {
        //     console.log('this after drop:>> ', this.id );
        //     console.log("Element ", dragSource.id," is in containerTwo")
        //     console.log("Removing from container Two list...")

        //     indexOfelem = containerTwoElements.indexOf(dragSource.id)  // find the index of dragged element
        //     console.log("Element found at: ",indexOfelem)

        //     containerTwoElements.splice(indexOfelem, 1)
        //     console.log("UPDATED containerTwo list: ", containerTwoElements)
        // }
           
    }
    this.classList.remove('over')
    this.classList.remove('highlightAfterDisplay')
    dropEndIn = this.id
    console.log("Drop ended in: ",dropEndIn)
    console.log("this.id: ", this.id, e.target.id)

    if (dragSource.id == this.id)
    {
        console.log("Drag started from: ", dragSource.id, "and Drag ended in: ", this.id)
    }
    else{

        console.log("Drag started from: ", dragSource.id, "and Drag ended in: ", this.id)
        univI+=1;
        console.log("UnivI: ", univI)
        if(univI >=empty.length)
        {
            console.log("Activating finish button")
            activateFinishButton()
        }
        else
            activateDisplay(univI)
    }
}
    

function activateDisplay(univI)
{
    
    empty[univI].classList.remove('hideDisplay')
    empty[univI].classList.add('highlightAfterDisplay')
}

function activateFinishButton()
{
    const activateButton = document.querySelector(".buttonContainer .button")
    console.log(activateButton)
    activateButton.style.cursor = "pointer";
    activateButton.style.backgroundColor = 'rgb(0, 255, 0)';
    activateButton.onclick = function() {
        var userOption = confirm("Would you like to change your preferences/re-arrange ...?")
        if(userOption)
        {
            if(confirm("Are you sure... ?")){}
            else
                alert("Generating PDF")
        }
    else{
        alert("Generating PDF")
    }
    }

}


function separateContainerOneAndContainerTwoCards(cards)
{
    console.log("Separating...")
    for(var i = 0;i<7;i++)
        containerOneElements.push(cards[i].id)
    console.log("CONTAINER ONE ELEMENTS: ",containerOneElements)

    for(var j = 7;j<cards.length;j++)
        containerTwoElements.push(cards[j].id)
    console.log("CONTAINER TWO ELEMENTS: ", containerTwoElements)
}


// function  foo()
// {
//     var someDropTrial = document.querySelector('.containerOne')
//     console.log("GETTING CONTAINER ONE:",someDropTrial)
//     var createDiv = document.createElement('div')
//     console.log("CREATING EMPTY DIV: ", createDiv)
//     var createImg = document.createElement('img')
//     console.log("CREATING IMAGE TAG: ", createImg)
//     createDiv.appendChild(createImg)
//     someDropTrial.appendChild(createDiv)



//     if(containerOneElements.indexOf(dragSource.id)!=-1)
//     {
//         console.log('Element ',dragSource.id,' is in containerOne')
//         console.log("Removing from container One list...")
//         indexOfelem = containerOneElements.indexOf(dragSource.id)
//         console.log("Element found at: ",indexOfelem)
//         containerOneElements.splice(indexOfelem, 1)
//         console.log("UPDATED containerOne list: ", containerOneElements)
//     }

//     else
//     {
//         console.log("Element is in containerTwo")
//         console.log("Removing from container Two list...")
//         containerTwoElements.pop(dragSource.id)
//         console.log("UPDATED containerTwo list: ", containerTwoElements)
//     }
       

// }

function moveFromSecondContainer(containerOneDragCount)
{
    console.log("******************************************")
    console.log("Moving from second container....",containerOneDragCount)
    var someDropTrial = document.querySelector('.containerOne')
    console.log("GETTING CONTAINER ONE:",someDropTrial)
    var createDiv = document.createElement('div')
    console.log("CREATING EMPTY DIV: ", createDiv)
    var createImg = document.createElement('img')

    // var imgSrc = document.querySelector('#'+containerTwoElements[containerOneDragCount])
    // console.log("IMAGE SOURCE: ", imgSrc.src)

    var removeImageFromSecondContainer = document.querySelector('#'+containerTwoElements[containerOneDragCount])
    console.log("remove IMAGE from container two: ", removeImageFromSecondContainer)
    removeImageFromSecondContainer.classList.add('hideDisplay')

    console.log("CREATING IMAGE TAG: ", createImg)
    createImg.src = 'cardsThree/'+imageIdAndImageName[containerTwoElements[containerOneDragCount]]


    console.log('cardsThree/'+imageIdAndImageName[containerTwoElements[containerOneDragCount]])
    console.log("IMAGE TO BE APPENDED:", createImg)
    createDiv.appendChild(createImg)
    someDropTrial.appendChild(createDiv)


    containerOneElements.push(containerTwoElements[containerOneDragCount])
    console.log(containerOneElements)
    
}