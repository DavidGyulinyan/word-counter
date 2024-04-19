const textarea = document.querySelector(".textarea");
const widgetBody = document.querySelector(".widget-body");

//create elements for content
const sentancesBody = document.createElement("span");
const wordsBody = document.createElement("span");
const letterBody = document.createElement("span");

//sets sentancesBody as child for widgetBody
widgetBody.appendChild(sentancesBody);

//sets wordsBody as child for widgetBody
widgetBody.appendChild(wordsBody);

//sets letterBody as child for widgetBody
widgetBody.appendChild(letterBody);

const sentances = "Total sentences";
const words = "Total words";
const letters = "Total letters";

//Content count state displayed 0 by default
let count = 0;

//each contnet has it's default state
sentancesBody.textContent = `${sentances}: ${count}`;
wordsBody.textContent = `${words}: ${count}`;
letterBody.textContent = `${letters}: ${count}`;

//function returns error message will be called in error catching process 
const error = () => {
    return console.error("Something went wrong, check is everithing done correctly");
}

//function asynchronously get the text and display total count of letters
const getLettersCount = async () => {
    try {
        const text = await textarea.value;//gets textarea value(text itself)
        const lettersArr = await text.split('');//splits every letter
        const trimedArr = await lettersArr.filter(item => item !== ' ');//filters the spaces from array

        if (text) {
            widgetBody.appendChild(letterBody);
            count = trimedArr.length
            letterBody.textContent = `${letters}: ${count}`;
        } else {
            count = 0;
            letterBody.textContent = `${letters}: ${count}`;
            alert("Enter text please");
        };
    } catch {
        error();
    };
};

//function asynchronously get the text and display total count of words
const getWordsCount = async () => {
    try {
        const text = await textarea.value;//gets textarea value(text itself)
        const wordsArr = await text.split(' ');//splits every word
        const trimedArr = await wordsArr.filter(item => item !== '');//filters the spaces from array

        if (text) {
            count = trimedArr.length
            wordsBody.textContent = `${words}: ${count}`;
        } else {
            count = 0;
            wordsBody.textContent = `${words}: ${count}`;
        };
    } catch {
        error();
    };
};

//function asynchronously get the text and display total count of sentences
const getSentencesCount = async () => {
    try {
        const sentanceEnders = ['.', ':', '?', '!'];//this marks notes that sentencs ends
        const text = await textarea.value;//gets textarea value(text itself)
        const wordsArr = await text.split('');//splits every letter
        const sentence = await wordsArr.filter(item => sentanceEnders.includes(item));//filters every items from array which has enders

        if (text) {
            count = sentence.length;
            sentancesBody.textContent = `${sentances}: ${count}`;
        } else {
            count = 0;
            sentancesBody.textContent = `${sentances}: ${count}`;
        }

    } catch {
        error();
    };

};

//An Immediately Invoked Function that is called immediately to run events
(() => {
    const button = document.querySelector(".button");

    //Event listener for getLettersCount function to display total number of letters by clicking on Count button
    button.addEventListener("click", getLettersCount);
    button.addEventListener("click", getWordsCount);
    button.addEventListener("click", getSentencesCount);
})();
