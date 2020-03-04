function getInputValue(){
    let inputVal = document.getElementById("myInput").value;
    fetch('http://localhost:5050/fibonacci/' + inputVal)
    .then(response => response.json())
    .then(data => {
    console.log(data.result) // Prints result from `response.json()` in getRequest
    document.getElementById("result").textContent=(data.result)
    })
    .catch(error => console.error(error))
    
}

// function getInputValue(){
//     let inputVal = document.getElementById("myInput").value;
//     console.log(fibonacci(inputVal));
//     document.getElementById("result").textContent="loading...";
//     setTimeout(() => { document.getElementById("result").textContent=(fibonacci(inputVal)); }, 500);
    
    
// }


// function fibonacci(x) {
//     let previous1 = 1;
//     let previous2 = 0; 
//     let y = 1;
    
//     for (let i = 0; i < x; i++) { 
//         y = previous1 + previous2;
//         previous1 = previous2;
//         previous2 = y;
//     } 
//     return y;
// }


// // x = 7;
// // console.log(fibonacci(x));
// // y = fibonacci(x);

// // document.getElementById('x').innerText = [x];
// // document.getElementById('y').innerText = [y];


