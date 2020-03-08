function clearWindow() {
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
      text = "Server Error: 42 is the meaning of life";
      ServerErrorStyle()
      fourtytwo()
    } else if (inputVal > 50){
      text = "Can't be larger than 50";
      errorStyle()
      document.getElementById("validateInput").innerHTML = text;
    } else {
        text = "Input OK";
        getInputValue();
        getServerResults()
    }
  }


// async function handleErrors(response) {
//     if (!response.ok) {
//         let text = await response.text();
//         console.log(text)
//         throw Error(text);
//     }
//     return response;
// }

// function fourtytwo() {
//     fetch('http://localhost:5050/fibonacci/42')
//         .then(handleErrors) 
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.result)
//         })
//     .catch(error => document.getElementById("ServerError").innerHTML = (error));
// }

function fourtytwo() {
    fetch('http://localhost:5050/fibonacci/42')
    .then(async response => {
        let i = await response.text();
        console.log(i);
        throw Error(i)})
    .catch(error => document.getElementById("ServerError").innerHTML = (error));

}

function getInputValue(){
    let inputVal = document.getElementById("myInput").value;
    getInputStyle()
    fetch('http://localhost:5050/fibonacci/' + inputVal)
        .then(response => response.json())
        .then(data => {
            responseOkWindow()
            document.getElementById("result").textContent=(data.result)
        })
        .catch(error => console.log(error));
    
}

function getServerResults() {
    fetch('http://localhost:5050/getFibonacciResults')
    .then(response => response.json())
    .then(data => {
        document.getElementById("myListResults").style.visibility = 'visible';
        const sortedData = data.results.sort((a, b) => b.createdDate - a.createdDate);
        console.log(sortedData)
        console.log(sortedData[0])

        for (let i = 0; i < 10; i++) {
            attempt = sortedData[i];
            let d = new Date();
            attempt.createdDate = d.toUTCString()
            let ul = document.getElementById("myListResults");
            let li = document.createElement("li");
            li.innerHTML = ('The Fibonacci of ' + `<b>` + attempt.number + `</b>` + ' is ' + `<b>` + attempt.result + `</b>` + '. Calculated at ' + attempt.createdDate)
            ul.appendChild(li);
        }

    })
    .catch(error => console.error(error))}

document
.getElementById('myButton')
.addEventListener('click', validateInput);