const addedImages = [] //just a reference of cards that have been added
var getClassNameOfEmptyBoxes = []
var dict = {}  // in this dictionary classNames and their value is stored.All the empty boxes are given 0 value and boxes that can be filled is given value 1.
var tempData = ""  //this variable will have id of the current card that is being dragged
var i = 0
var pickingExistingCard = 1
/**
 * gatherData() - will gather all the classNames and assign values.In this case the cards needs to be filled in order
                  so the first box is set to 1 the rest is set to 0.This is done because order needs to be maintained.
 */

function gatherData() 
{
    console.log("GATHERING DATA")
    getClassNameOfEmptyBoxes = document.querySelectorAll("#empty")
    
    for (var i =0;i<getClassNameOfEmptyBoxes.length;i++)
    {
        dict[getClassNameOfEmptyBoxes[i].className] = 0
    }
    dict[getClassNameOfEmptyBoxes[0].className] = 1
    console.log(dict)
    
}


function drag(ev)  
{
    //console.log(ev.target.id)
    ev.dataTransfer.setData("text",ev.target.id)
    tempData = ev.target.id   //current drag element id
    console.log("STARTING DRAG EVENT.....")
}

const empty = document.querySelectorAll("#empty")
empty.forEach(e => {
    e.addEventListener('dragover', (e)=>{
        console.log("Drag Over")
        if (addedImages.indexOf(tempData) == -1) //check if previously the element is added. Strict ordering
            e.preventDefault();
    })

    e.addEventListener('drop',(e) => {
        console.log("Dropped")
        //console.log("CURRENT CLASS NAME: ", e.target.className) //This will give me the className of the box where the current card is being dropped on to.
        //console.log("the value of current class ",e.target.className, "is: ", dict[e.target.className])
        
        if(dict[e.target.className] == 1)
        {
            var data = e.dataTransfer.getData("text")
            if (addedImages.indexOf(tempData)== -1)
            {
                e.preventDefault()
                e.target.appendChild(document.getElementById(data))
                console.log("Card id not present adding to list")
                addedImages.push(tempData)
                if(i<dict.length-1)
                    console.log("Incrementing i .................")
                    i+=1
                    if (i==dict.length-1)
                    {
                        console.log("In check")
                         return
                    }
                    else {
                        var activateNextEmptyBox = getClassNameOfEmptyBoxes[i].className
                        console.log(activateNextEmptyBox)
                        dict[activateNextEmptyBox] = 1    
                    }
                    
                    
            }

            console.log(addedImages)
            console.log("UPDATED DICTIONARY: ",dict)
            console.log("VALUE OF I AFTER INCREMENT IS: ",i)
           
        }
        else{
            alert("Dropping allowed only in order")
            console.log("No dropping allowed")
        }

        pickingExistingCard = 1;
    })
})


function rearrangementDrag(ev)
{
   console.log(ev)
}

function generatePDF()
{
    console.log("Generating PDF")
}
