const gradientBox = document.querySelector(".gredient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const  textarea = document.querySelector("teatarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const getRandomColor = () => {
    // generating a random color in hexadecimal format. example: #5665E9
    const randomHex = Math.floor(Math.random() *0xffffff).toString(16);
    return '#${randomHex}';
}

const generateGradient = (isRandom) => {
    if(isRandom){ //if isRandom  is true,update the color inputs value with random color
        colorInputs[0].value=getRandomColor();
        colorInputs[1].value=getRandomColor();
        
    }
    // creating a gradient string using the color input values
    const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value},${colorInputs[1].value})`;
    gradientBox.style.background = gradient;
    textarea.value = `background: ${gradient};`;
}
const copyCode = () => {
    navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = "Code Copied";
    setTimeout(() => copyBtn.innerText = "Code Copied",1600);
}

colorInputs.forEach(input => {
    //calling generateGradient function on each color input Clicks
    input.addEventListener("input", () =>generateGradient(false));
} );
selectMenu.addEventListener("change", () =>generateGradient(false));
refreshBtn.addEventListener("click",() => generateGradient(true));
copyBtn.addEventListener("click", copyCode);
