var empty;
var univI = 0;
var separateClass = []
var cardId = []
var myAddedCards = new Set()

function gatherDataAndInitialize()  // Gather all the required data such as className id and add required eventListeners
{   
    console.log("GATHERING DATA")
    const cards = document.querySelectorAll(".blockOne")
    console.log("Displaying data of cards:", cards)
    cards.forEach( f=> {
        f.addEventListener('dragend',(e)=>{
            console.log("Ending drag", e.target.id, e.target.className)
            
        })
    })      
    
    empty = document.querySelectorAll("#empty")
    console.log("\n\nDisplaying data of empty cards: ", empty)
    for( var k = 0;k<empty.length;k++)
    {
        empty[k].classList.add('hideDisplay')  //do not display all the empty slot
    }
    empty[0].classList.remove('hideDisplay')  //display only the first empty slot

    empty.forEach( d => {
        d.addEventListener('dragover', (e) => {
            e.preventDefault()
            console.log("dragging Over",e.target.id, e.target.className)   //add drag over event - when card is over the empty slot
        })
    })

}

function dragStart(ev){                               // when user starts dragging this is activated
    ev.dataTransfer.setData('text/plain', ev.target.id)
    console.log("Starting drag")
    console.log("drag card id: ",ev.target.id)
}
 
function activateDisplay(index)                           // display the empty slots one by one 
{
    console.log("INDEX AND COUNT IS: ",index)
    empty[index].classList.remove('hideDisplay')
    //border.classList.remove('.highlightAfterDisplay')
}


function drop(e)
{           // add drop event
    e.stopPropagation();
        var data = e.dataTransfer.getData("text/plain");
        console.log("not present adding", data)
        e.target.appendChild(document.getElementById(data));
        var border = document.getElementById(data)
        border.classList.add('addBorder')
        //border.classList.add('highlightAfterDisplay')
        console.log("dropped")
        myAddedCards.add(data)
        univI+=1;
        activateDisplay(univI)
}