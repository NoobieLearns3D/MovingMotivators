/*var someTemp = "";

function idCollector(sentId)
{
    someTemp = sentId;
    console.log("ElementId: ", sentId);
}

const item = document.querySelector('#secondItem');
item.addEventListener('dragstart', dragstart);

function dragstart(e){
    e.dataTransfer.setData('text/plain',item.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

const target = document.querySelectorAll('.trial');
target.forEach(trials => {
    trials.addEventListener('dragenter',dragEnter);
    trials.addEventListener('dragover',dragOver);
    trials.addEventListener('dragleave',dragLeave);
    trials.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('dragover');
}

function dragOver(e) {
    e.preventDefault();
    console.log("dropping");
    e.target.classList.add('dragover');
}

function dragLeave(e) {
    e.target.classList.remove('dragover');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('dragover');
    //console.log("e: ",e);
    const droppedElementId = e.dataTransfer.getData('text/plain');
    console.log(typeof(droppedElementId));
    //console.log("DroppedID: ",droppedElementId);
    const draggable= document.getElementById(droppedElementId);
    console.log(typeof(draggable));
    //console.log(draggable);
    e.target.appendChild(draggable);
    draggable.classList.remove('hide');

}
*/

function drag(ev)
{
    console.log(ev.target.id);
    ev.dataTransfer.setData("text",ev.target.id);
}

function allowDrop(ev)
{
    ev.preventDefault();
    ev.target.classList.add('dragover');
    console.log(ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    ev.target.classList.remove('dragover');
    const data = ev.dataTransfer.getData("text");
    const draggable = document.getElementById(data);
    console.log(draggable);
    ev.target.appendChild(draggable);
}