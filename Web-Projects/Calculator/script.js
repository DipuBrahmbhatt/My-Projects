let result = "";
const inputBox = document.getElementById("inputbox");

function printValue(value) {
    if (value === "AC") {
        result = "";
    } else if (value === "DLT") {
        result = result.slice(0, -1);
    } else if (value === "=") {
        result = eval(result).toString();
    } else {
        result += value;
    }

    inputBox.value = result;
}
