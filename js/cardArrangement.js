const addedImages = [];
var tempData = "";
function drag(ev)
{
    console.log(ev.target.id);
    ev.dataTransfer.setData("text",ev.target.id);
    tempData = ev.target.id;
    console.log(tempData)
}

const empty = document.querySelectorAll("#empty")
console.log(empty)

empty.forEach(e => {
    e.addEventListener('dragover', (e)=>{
        console.log("Drag Over")
        e.preventDefault();
    })

    e.addEventListener('drop',(e) => {
        e.preventDefault();
        console.log("Dropped")
        var data = e.dataTransfer.getData("text")
        e.target.appendChild(document.getElementById(data))
        
        if(addedImages.indexOf(data)!==-1)
            console.log("exists")
        else
            addedImages.push(tempData)
        console.log(addedImages)
    })
})