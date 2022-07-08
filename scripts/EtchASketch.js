RenderCanvas();

function RenderCanvas()
{
    let gridSize = 16 * 16; //256

    for (let i = 1; i <= gridSize; i++)
    {
        //create div
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        //box.innerText = `${i}`;

        //Register event listener.
        box.addEventListener("mouseover", ColourIt);

        //attach to container
        let container = document.querySelector(".grid-container");
        container.appendChild(box);
    }
}

//This will colour the box when hovering over.
function ColourIt(event)
{
    event.target.style.backgroundColor = "black";
}