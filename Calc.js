const Calculations = document.querySelector(".Shower span");
const Input = document.querySelector(".Shower input");
const Result = document.querySelector(".Shower p");

const CBtn = document.querySelector(".Signs .Clr");
const ACBtn = document.querySelector(".Signs .AC");
const NumBtns = document.querySelectorAll(".b0, .b1, .b2, .b3, .b4, .b5, .b6, .b7, .b8, .b9");
const BtnJam = document.querySelector(".Signs .jam");
const BtnKam = document.querySelector(".Signs .kam");
const BtnZrb = document.querySelector(".Signs .zrb");
const BtnTgh = document.querySelector(".Signs .tgh");
const BtnMomayez = document.querySelector(".Signs .dot");
const BtnMosavi = document.querySelector(".Signs .mos");

let Operator = null;
let Digits = [];
let result = 0;
let Local = 0;
Result.textContent = result;
let OldValue = 0;
let NewValue = 0;

Calculations.textContent = "";

if (Input.value == "") {
    Input.value = "0";
}

function SetOperator(op) {
    Operator = op;
    OldValue = Number(Input.value.replace(/^0+(\d)/, '$1'));
    Input.value = "0";
    Digits.push(OldValue);
    Digits.push(op);
    console.log(Digits);

    Calculations.textContent += OldValue;
    Calculations.textContent += " " + op + " ";
    Calculations.scrollLeft = Calculations.scrollWidth;
}

// function Calc(oldNum, OP, newNum) {
//     oldNum = Number(oldNum);
//     newNum = Number(newNum);
//     switch (OP) {
//         case "+":
//             result = oldNum + newNum;
//             break;
//         case "-":
//             result = oldNum - newNum;
//             break;
//         case "*":
//             result = oldNum * newNum;
//             break;
//         case "/":
//             result = oldNum / newNum;
//             break;
//     }
//     OldValue = result;
//     Input.value = result;
//     Result.textContent = result;
//     console.log(result);
// }

function evaluateDigits(arr) {
    let temp = [...arr];

    for (let i = 0; i < temp.length; i++) {
        if (temp[i] == "*" || temp[i] == "/") {
            let left = Number(temp[i - 1]);
            let right = Number(temp[i + 1]);
            let res = (temp[i] == "*") ? (left * right) : (left / right);

            temp.splice(i - 1, 3, res);
            i = i - 1;
        }
    }

    for (let i = 0; i < temp.length; i++) {
        if (temp[i] == "+" || temp[i] == "-") {
            let left = Number(temp[i - 1]);
            let right = Number(temp[i + 1]);
            let res = (temp[i] == "+") ? (left + right) : (left - right);

            temp.splice(i - 1, 3, res);
            i = i - 1;
        }
    }

    return temp[0];
}

NumBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        if (Input.value == 0 + ".") {
            Input.value += btn.textContent.trim();
            Calculations.scrollLeft = Calculations.scrollWidth;
        }
        else {
            if (Input.value == 0 || Input.value == "NaN") {
                Input.value = "";
                Input.value += btn.textContent.trim();
                Calculations.scrollLeft = Calculations.scrollWidth;
            }
            else {
                Input.value += btn.textContent.trim();
                Calculations.scrollLeft = Calculations.scrollWidth;
            }
        }
    })
})

BtnJam.addEventListener("click", function (e) {
    SetOperator("+");
    Result.textContent = result;
})
BtnKam.addEventListener("click", function (e) {
    SetOperator("-");
    Result.textContent = result;
})
BtnZrb.addEventListener("click", function (e) {
    SetOperator("*");
    Result.textContent = result;
})
BtnTgh.addEventListener("click", function (e) {
    SetOperator("/");
    Result.textContent = result;
})
BtnMosavi.addEventListener("click", function (e) {
    NewValue = Number(Input.value);
    Digits.push(NewValue);
    console.log(Digits)

    result = evaluateDigits(Digits);

    Result.textContent = result;
    Input.value = result;

    Calculations.textContent = "";

    Digits = [];
    console.log(`------Digits Clear!-----`);

    Operator = null;
})
BtnMomayez.addEventListener("click", (e) => {
    if (!Input.value.includes(".")) {
        if (Input.value = "") {
            Input.value = "0.";
        }
        else {
            Input.value += ".";
        }
    }
})
CBtn.addEventListener("click", (e) => {
    Digits = [];
    result = 0;
    Result.textContent = "0"
    Operator = null;
    Calculations.textContent = "";
    Input.value = 0;
    console.log("-------------All Clear!-------------");
})
ACBtn.addEventListener("click", (e) => {
    Input.value = "0";
})

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Enter" || key === "=") {
        NewValue = Number(Input.value);
        Digits.push(NewValue);
        console.log(Digits)

        result = evaluateDigits(Digits);

        Result.textContent = result;
        Input.value = result;

        Calculations.textContent = "";

        Digits = [];
        console.log(`------Digits Clear!-----`);

        Operator = null;
    }
    if (key === "+") {
        SetOperator("+");
        Result.textContent = result;
    }
    if (key === "-") {
        SetOperator("-");
        Result.textContent = result;
    }
    if (key === "*") {
        SetOperator("*");
        Result.textContent = result;
    }
    if (key === "/") {
        SetOperator("/");
        Result.textContent = result;
    }

    if (key === "Escape") {
        Digits = [];
        result = 0;
        Result.textContent = "0"
        Operator = null;
        Calculations.textContent = "";
        Input.value = 0;
        console.log("-------------All Clear!-------------");
    }

    if (key === ".") {
        if (!Input.value.includes(".")) {
            if (Input.value === "") {
                Input.value = "0.";
            }
            else {
                Input.value += ".";
            }
        }
    }

    if (key === "Backspace") {
        Input.value = Input.value.slice(0, -1);
        if (Input.value === "") Input.value = "0";
    }

    if(!isNaN(key) && key !== " ")
    {
        if(Input.value == "0" || Input.value == "NaN")
        {
            Input.value = key;
        }
        else
        {
            Input.value += key
        }
        Calculations.scrollLeft = Calculations.scrollWidth;
    }
})