function beginReArrangement(ef)
{
   console.clear()
   console.log("rearrangement id is: ", ef.target.id)
   console.log(classAndCards)
   console.log("Begin to rearrange")
   overWriteEmptyId(ef)
}

const something = document.querySelector('#myId')
something.addEventListener('dragstart',drag,false)
something.addEventListener('dragstart',() => {
    console.log("IN REARRANGEMENT, drag start")
})

function overWriteEmptyId(ef)
{
    const reArrangeEmpty = document.querySelectorAll("#empty")
    console.log(reArrangeEmpty)

    reArrangeEmpty.forEach( h => {

        h. addEventListener('dragstart', (ef)=>{
            console.log("Starting drag", ef.target.id)
            draggingCardData = ef.dataTransfer.setData("text/plain", ef.target.id)
        })

        h.addEventListener('dragover', (ef) =>{
                var tempoDat = ef.target.className
                console.log("CLASS MAPPED TO: ", classAndCards[tempoDat])
                console.log("DRAGGED CARD ID: ",draggingCardData)
                if (classAndCards[ef.target.className] == ef.target.id)
                    console.log("Cannot drop on the same spot")
                else{
                    console.log("DRAGGING OVER: ",ef.target.className, " TO DROP ", ef.target.id)
                    ef.preventDefault()
        
                }
            

        h.addEventListener('drop', hello)
        })

    })
}

function hello()
{

}