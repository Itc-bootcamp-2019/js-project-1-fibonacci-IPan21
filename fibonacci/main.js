function clearWindow() {
    document.getElementById('myInput').className = "myInput";
    document.getElementById("result").style.display = 'none';
    document.getElementById("validateInput").style.visibility = 'hidden';
    document.getElementById('loading').style.visibility = 'hidden'; 
    document.getElementById("ServerError").style.visibility = 'hidden';
    document.getElementById("myListResults").style.visibility = 'hidden';
}

function errorStyle() {
    document.getElementById('myInput').className = "myInputError";
    document.getElementById("validateInput").style.visibility = 'visible';
}

function ServerErrorStyle() {
    document.getElementById('myInput').className = "myInputError";
    document.getElementById("ServerError").style.visibility = 'visible';
    document.getElementById('loading').style.visibility = 'hidden'; 
    document.getElementById('loadingResults').style.visibility = 'hidden';
}

function hideLoadingSpinner() {
    document.getElementById('loading').style.visibility = 'hidden';
}

function responseOkWindow(){
    document.getElementById("result").style.display = 'inline';
    document.getElementById('loading').style.visibility = 'hidden';
    document.getElementById('loadingResults').style.visibility = 'hidden';
}

function getInputStyle(){
    document.getElementById('loading').style.visibility = 'visible';
    document.getElementById('loadingResults').style.visibility = 'visible';
}


function validateInput() {
    let text;
    let inputVal = document.getElementById("myInput").value;
    clearWindow()
    if (isNaN(inputVal) || inputVal <= 0) {
      text = "Input not valid";
      errorStyle()
      document.getElementById("validateInput").innerHTML = text;
    } else if (inputVal == 42){
    getInputValueCatch()
    } else if (inputVal > 50){
      text = "Can't be larger than 50";
      errorStyle()
      document.getElementById("validateInput").innerHTML = text;
    } else {
        getInputValueCatch();
        getServerResults()
    }
  }

async function getInputValueCatch() {
try {
    getInputStyle();
    let inputVal = document.getElementById("myInput").value;
    const response = await fetch('http://localhost:5050/fibonacci/' + inputVal);
    if (!response.ok) {
        ServerErrorStyle()
        let text = await response.text();
        console.log(text)
        throw Error(text);
    } else {
        const data = await response.json();
        responseOkWindow();
        document.getElementById("result").textContent=(data.result);
    }
} catch(error) {
    document.getElementById("ServerError").innerHTML = (error)
}
}

async function getServerResults(){
    try {
        let ul = document.getElementById("myListResults");
        ul.innerHTML = "";
        const response = await fetch('http://localhost:5050/getFibonacciResults');
        const data = await response.json();
        document.getElementById("myListResults").style.visibility = 'visible';
        howToSort = document.getElementById('dropdown').value;
        console.log(document.getElementById('dropdown').value)
            if (howToSort == 4) {
                data.results.sort((a, b) => b.createdDate - a.createdDate);
            } else if (howToSort == 3) {
                data.results.sort((a, b) => a.createdDate - b.createdDate);
            } else if (howToSort == 2) {
                data.results.sort((a, b) => b.number - a.number);
            } else if (howToSort == 1) {
                data.results.sort((a, b) => a.number - b.number);
            } else {
                console.log('I don"t want to sort')
            }
        console.log(data.results)
        const sortedData = data.results;
        // const sortedData = data.results.sort((a, b) => b.createdDate - a.createdDate);
        console.log(sortedData)
        console.log(sortedData[0])
                for (let i = 0; i < 10; i++) {
                attempt = sortedData[i];
                console.log(attempt);
                let d = new Date(attempt.createdDate);
                let ul = document.getElementById("myListResults");
                let li = document.createElement("li");
                li.innerHTML = ('The Fibonacci of ' + `<b>` + attempt.number + `</b>` + ' is ' + `<b>` + attempt.result + `</b>` + '. Calculated at ' + d.toString())
                ul.appendChild(li);
            }
        } catch(error) {
            console.log(error)
        }
}

function getInputValueOffline(){
    let inputVal = document.getElementById("myInput").value;
    console.log(fibonacci(inputVal));
    document.getElementById("result").textContent=(fibonacci(inputVal));

}

// function fibonacci(x) {
//     let previous1 = 1;
//     let previous2 = 0; 
//     let result = 1;
    
//     for (let i = 0; i < x; i++) { 
//         result = previous1 + previous2;
//         previous1 = previous2;
//         previous2 = result;
//     } 
//     return result;
// }

function fibonacci(x) {
    if (x == 0){
        return 0;
    } else if (x == 1) {
        return 1;
    } else{
        return fibonacci(x-2) + fibonacci(x-1);
      }
}


function checkbox() {
    if (document.getElementById("checkbox").checked == true) {
        validateInput();
    } else {
        getInputValueOffline()
    }
}


document
.getElementById('myButton')
.addEventListener('click', checkbox);

document
.getElementById('dropdown')
.addEventListener('change', getServerResults);

