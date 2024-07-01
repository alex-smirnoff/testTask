document.getElementById("processButton").addEventListener("click", async function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const numbersArray = content.trim().split('\n').map(Number);

        // maximum and minimum number
        let maxNumber = numbersArray[0];
        for (let i = 1; i < numbersArray.length; i++) {
            if (numbersArray[i] > maxNumber) {
                maxNumber = numbersArray[i];
            }
        }
        let minNumber = numbersArray[0];
        for (let i = 1; i < numbersArray.length; i++) {
            if (numbersArray[i] < minNumber) {
                minNumber = numbersArray[i];
            }
        }

        // median
        let arrayForMedian = [...numbersArray];
        arrayForMedian.sort((a, b) => a - b);
        const middleIndex = Math.floor(arrayForMedian.length / 2);
        let median = arrayForMedian.length % 2 === 0 ? (arrayForMedian[middleIndex - 1] + arrayForMedian[middleIndex]) / 2 : arrayForMedian[middleIndex];

        // mean
        let mean = arrayForMedian.reduce((acc, num) => acc + num, 0) / arrayForMedian.length;

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

        console.log("Max Number:", maxNumber);
        console.log("Min Number:", minNumber);
        console.log("Median:", median);
        console.log("Mean:", mean);
        console.log("All Sequences:", sequencesAll);
        console.log("Longest Increasing Sequence:", longestArray);
        console.log("All Sequences (Decreasing):", allSequences);
        console.log("Longest Decreasing Sequence:", arrayLongest);
    };

    reader.readAsText(file);
});