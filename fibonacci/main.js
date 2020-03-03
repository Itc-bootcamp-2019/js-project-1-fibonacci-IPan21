
function getInputValue(){
    let inputVal = document.getElementById("myInput").value;
    console.log(fibonacci(inputVal));
    document.getElementById("result").textContent="loading...";
    setTimeout(() => { document.getElementById("result").textContent=(fibonacci(inputVal)); }, 500);
    
    
}


function fibonacci(x) {
    let previous1 = 1;
    let previous2 = 0; 
    let y = 1;
    
    for (let i = 0; i < x; i++) { 
        y = previous1 + previous2;
        previous1 = previous2;
        previous2 = y;
    } 
    return y;
}

function fibonacciServer()


