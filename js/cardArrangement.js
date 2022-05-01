const addedImages = []; //just a reference of cards that have been added
var getClassNameOfEmptyBoxes = [];
var dict = {};  // in this dictionary classNames and their value is stored.All the empty boxes are given 0 value and boxes that can be filled is given value 1.
var tempData = "";  //this variable will have id of the current card that is being dragged
var i = 0;

/**
 * gatherData() - will gather all the classNames and assign values. In this case the cards needs to be filled in order
 *                so the first box is set to 1 the rest is set to 0.This is done because order needs to be maintained.
 */

function gatherData() 
{
    console.log("GATHERING DATA")
    getClassNameOfEmptyBoxes = document.querySelectorAll("#empty")
    console.log("SOME DATA:" , getClassNameOfEmptyBoxes)
    
    
    for (var i =0;i<getClassNameOfEmptyBoxes.length;i++)
    {
        dict[getClassNameOfEmptyBoxes[i].className] = 0
    }
    dict[getClassNameOfEmptyBoxes[0].className] = 1
    console.log(dict)
    
}

function drag(ev)
{
    //console.log(ev.target.id);
    ev.dataTransfer.setData("text",ev.target.id);
    tempData = ev.target.id;
    console.log("This is id: ",tempData)
    console.log("THIS IS THE DICTIONARY: ",dict)

}

const empty = document.querySelectorAll("#empty")
empty.forEach(e => {
    e.addEventListener('dragover', (e)=>{
        console.log("Drag Over")
        e.preventDefault();
    })

    e.addEventListener('drop',(e) => {
        console.log("Dropped")
        console.log("WHATS IN E: ",e)
        console.log("CURRENT CLASS NAME: ", e.target.className) //This will give me the className of the box where the current card is being dropped on to.
        
        console.log("the value of current class ",e.target.className, "is: ", dict[e.target.className])
        
        if(dict[e.target.className] == 1)
        {
            console.log("BEFORE UPDATE: ", dict)
            console.log("VALUE OF I AT THE BEGINNING IS: ",i)
            e.preventDefault();
            var data = e.dataTransfer.getData("text")
            e.target.appendChild(document.getElementById(data))
            addedImages.push(tempData)
            console.log(addedImages)

            if(i>=9)
            {
                i = null
                console.log("VALUE OF I AT THE END IS: ",i)
                alert("YOU HAVE FILLED ALL THE BOXES")
            }
            
            i+=1;
            var activateNextEmptyBox = getClassNameOfEmptyBoxes[i].className
            console.log(activateNextEmptyBox)
            dict[activateNextEmptyBox] = 1;
            
            console.log("UPDATED DICTIONARY: ",dict)
            console.log("VALUE OF I AFTER INCREMENT IS: ",i)
        }
        else{
            alert("Dropping allowed only in order")
            console.log("No dropping allowed")
        }
    })
})
