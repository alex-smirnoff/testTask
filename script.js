const maxNum = document.getElementById("maximum");
const maxSpan = document.getElementById("maximumSpan");
const minNum = document.getElementById("minimum");
const minSpan = document.getElementById("minimumSpan");
const med = document.getElementById("median");
const medSpan = document.getElementById("medianSpan");
const mea = document.getElementById("mean");
const meaSpan = document.getElementById("meanSpan");
const incr = document.getElementById("increasing");
const incrSpan = document.getElementById("increasingSpan");
const decr = document.getElementById("decreasing");
const decrSpan = document.getElementById("decreasingSpan");
const comments = document.getElementById("comments");
const filespan = document.getElementById("filespan");
const loader = document.getElementById("loader");
const loaderspan = document.getElementById("loaderspan");
const reloadButton = document.getElementById("reloadButton");
const fileButton = document.getElementById("fileButton");


document.getElementById("fileInput").addEventListener("change", async function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    filespan.innerText = file.name;
    fileButton.setAttribute("disabled", "true");

    loader.style.display = "block";
    loaderspan.style.display = "block";

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = async function(e) {
        const content = e.target.result;
        const numbersArray = content.trim().split('\n').map(Number);

        // maximum and minimum number
        let maxNumber = numbersArray[0];
        for (let i = 1; i < numbersArray.length; i++) {
            if (numbersArray[i] > maxNumber) {
                maxNumber = numbersArray[i];
            }
        }

        comments.style.opacity = "1";
        maxNum.style.opacity = "1";
        maxSpan.innerText = maxNumber;
        maxNum.style.height = "fit-content";

        let minNumber = numbersArray[0];
        for (let i = 1; i < numbersArray.length; i++) {
            if (numbersArray[i] < minNumber) {
                minNumber = numbersArray[i];
            }
        }

        minNum.style.opacity = "1";
        minSpan.innerText = minNumber;
        minNum.style.height = "fit-content";

        //median
        let arrayForMedian = [...numbersArray];
        arrayForMedian.sort((a, b) => a - b);
        const middleIndex = Math.floor(arrayForMedian.length / 2);
        let median = arrayForMedian.length % 2 === 0 ? (arrayForMedian[middleIndex - 1] + arrayForMedian[middleIndex]) / 2 : arrayForMedian[middleIndex];

        med.style.opacity = "1";
        medSpan.innerText = median;
        med.style.height = "fit-content";

        // mean
        let mean = arrayForMedian.reduce((acc, num) => acc + num, 0) / arrayForMedian.length;

        mea.style.opacity = "1";
        meaSpan.innerText = mean;
        mea.style.height = "fit-content";

        // longest increasing sequence
        let sequencesAll = [];
        let currentSequence = [];

        currentSequence.push(numbersArray[0]);

        for (let i = 1; i < numbersArray.length; i++) {
            if (numbersArray[i-1] < numbersArray[i]) {
                currentSequence.push(numbersArray[i]);
            }
            else {
                sequencesAll.push([...currentSequence]);
                currentSequence = [numbersArray[i]];
            }
        }
        sequencesAll.push([...currentSequence]);

        let longestArray = [];
        let maxLength = 0;

        for (let i = 0; i < sequencesAll.length; i++) {
            if (sequencesAll[i].length > maxLength) {
                maxLength = sequencesAll[i].length;
                longestArray = sequencesAll[i];
            }
        }

        incr.style.opacity = "1";
        incrSpan.innerText = `${longestArray.join(', ')} (елементів загалом: ${longestArray.length})`;
        incr.style.height = "fit-content";


        // longest decreasing sequence
        let allSequences = [];
        let sequenceCurrent = [];

        sequenceCurrent.push(numbersArray[0]);

        for (let i = 1; i < numbersArray.length; i++) {
            if (numbersArray[i-1] > numbersArray[i]) {
                sequenceCurrent.push(numbersArray[i]);
            }
            else {
                allSequences.push([...sequenceCurrent]);
                sequenceCurrent = [numbersArray[i]];
            }
        }
        allSequences.push([...sequenceCurrent]);

        let arrayLongest = [];
        let lengthMax = 0;

        for (let i = 0; i < allSequences.length; i++) {
            if (allSequences[i].length > lengthMax) {
                lengthMax = allSequences[i].length;
                arrayLongest = allSequences[i];
            }
        }

        decr.style.opacity = "1";
        decrSpan.innerText = `${arrayLongest.join(', ')} (елементів загалом: ${arrayLongest.length})`;
        decr.style.height = "fit-content";
        
        console.log("Max Number:", maxNumber);
        console.log("Min Number:", minNumber);
        console.log("Median:", median);
        console.log("Mean:", mean);
        // console.log("All Sequences:", sequencesAll);
        console.log("Longest Increasing Sequence:", longestArray);
        // console.log("All Sequences (Decreasing):", allSequences);
        console.log("Longest Decreasing Sequence:", arrayLongest);
        loader.style.display = "none";
        loaderspan.style.display = "none";
        reloadButton.style.display = "block";
    };

    reader.readAsText(file);
});