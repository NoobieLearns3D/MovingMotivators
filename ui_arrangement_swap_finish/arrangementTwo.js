var empty;
var dragSource;
var univI = 0;
var addedCards = new Set();
var emptyDragSource;
var dropEndIn;

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

    console.log("this in drop function: ",this)
    console.log("DRAG SOURCE: ",dragSource)

    if (dragSource !== this )
    {
        dragSource.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    this.classList.remove('over')
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
