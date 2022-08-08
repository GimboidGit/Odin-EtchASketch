import _ from "./html2canvas.js";


const customSizeButton = document.getElementById("download");
customSizeButton.addEventListener("click", Download);


function Download()
{
    let element = document.querySelector(".grid-container");

    html2canvas(element)
        .then(canvas =>
            {
                let base64Image = 
                    canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");

                window.open(base64Image, "_blank");
            });
}