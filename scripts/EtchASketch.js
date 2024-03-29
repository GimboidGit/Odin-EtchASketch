//Add event listeners
const customSizeButton = document.getElementById("setGrid");
customSizeButton.addEventListener("click", SetGridSize);

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", ResetCanvas);

const colourList = document.getElementById("colour-mode");
colourList.addEventListener("change", SetColourMode);


let colourMode = 0;

//Greyscale Colour Mode.
let currGreyscale = 240;

let currentGridSize = 16;
UpdateGridSizeLabel();

RenderCanvas(currentGridSize);


function RenderCanvas(numberOfBoxes)
{
    Clear();

    let gridSize = numberOfBoxes * numberOfBoxes;

    let container = document.querySelector(".grid-container");

    for (let i = 1; i <= gridSize; i++)
    {
        //create div
        let box = document.createElement("div");
        box.setAttribute("class", "box");

        //We were trying to be clever. Didn't help.
        //Let's leave CSS Grid to handle the sizing of Cells!
        //
        // let calculateSize = `${100 / numberOfBoxes}%`;
        // box.style.width = calculateSize;
        // box.style.height = calculateSize;        
        
        //Register event listener.
        box.addEventListener("mouseover", ColourIt);

        //attach to container
        container.appendChild(box);
    }

    //ADJUST GRID TEMPLATE COLS
    container.style.gridTemplateColumns = `repeat(${numberOfBoxes}, 1fr)`;
}


function SetColourMode(event)
{
    colourMode = event.target.selectedIndex;
}

//This will colour the box when hovering over.
function ColourIt(event)
{
    switch(colourMode)
    {
        case 0:
            event.target.style.backgroundColor = "black";
            break;

        case 1: //Greyscale.
            event.target.style.backgroundColor = CreateGreyscaleRGB();
            break;

        case 2: //Random RGB.
            event.target.style.backgroundColor = CreateRandomRGB();
            break;
    }
}

function CreateGreyscaleRGB()
{
    //Wrap back round to Light Grey.
    if (currGreyscale - 8 < 40)
        currGreyscale = 240;

    let rgbText = `rgb(${currGreyscale}, ${currGreyscale}, ${currGreyscale})`;

    currGreyscale -= 8;

    return rgbText;
}

function CreateRandomRGB()
{
    let red = GetRandomRGBValue();
    let green = GetRandomRGBValue();
    let blue = GetRandomRGBValue();

    return `rgb(${red}%, ${green}%, ${blue}%)`;
}

//Number between 0 and 100. Use: Percentages.
function GetRandomRGBValue()
{
    return Math.floor(Math.random() * 101);
}


function SetGridSize(event)
{
    let size = 
        Number(prompt("What grid size would you like? \r\n\r\n Specify a number between 1 and 100:"));

    if (!Number.isInteger(size))
    {
        alert("That's not a valid number!");
        return;
    }

    if (size < 1 && size > 100) 
    {
        alert("That's not a valid grid size!");
        return;
    }

    currentGridSize = size;

    UpdateGridSizeLabel();
    RenderCanvas(currentGridSize);
}

//This clears the Canvas, leaving it blank.
function Clear()
{
    let container = document.querySelector(".grid-container");
    //container.innerHTML = "";
    container.textContent = "";
}

//Driven by button click this will clear the canvas, then render it again.
function ResetCanvas()
{
    let answer = confirm("Are you sure you want to reset the canvas?");

    if (answer === false)
        return;

    Clear();
    RenderCanvas(currentGridSize);
}

//Updates the P element that displays the current grid size.
function UpdateGridSizeLabel() 
{
    const p = document.querySelector(".current-size");
    p.textContent = `Current Grid Size: ${currentGridSize} x ${currentGridSize}`
}