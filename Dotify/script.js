// Map each supported character to its Braille equivalent
const brailleMap = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    ' ': ' ', ',': '⠂', '.': '⠲', '?': '⠦', '!': '⠖',
    '\'': '⠄', '-': '⠤'
};

// Braille prefix for uppercase letters
const CAPITAL_SIGN = '⠠';

// Convert English to Braille
function translateToBraille(text) {
    return text.split('').map(char => {
        // Checks if the character is uppercase
        if (/[A-Z]/.test(char)) {
            // Adds the capital sign + lowercase Braille equivalent (if found)
            return CAPITAL_SIGN + (brailleMap[char.toLowerCase()] || '');
        }
        // Checks if the character exists in the Braille map
        if (brailleMap[char]) {
            // Returns Braille equivalent
            return brailleMap[char];
        }
        // Character not existent within map, returns empty string
        return '';
    }).join('');
}

// Run after the page fully loads
document.addEventListener("DOMContentLoaded", function () {
    // Select main UI elements
    const button = document.querySelector("button");         
    const container = document.querySelector(".container");  
    const output = document.querySelector(".braille-output");
    const input = document.querySelector("input");           
    const copyBtn = document.getElementById("copyBtn");  

    // When translate button is clicked
    button.addEventListener("click", function () {
        const englishText = input.value.trim(); // Removes extra spaces

        // Checks if input is empty
        if (englishText === "") {
            alert("How will someone read that!");
            input.focus(); // Puts cursor back in input
            return; // Stops further execution
        }

        const brailleText = translateToBraille(englishText); // Convert to Braille
        container.classList.add("expanded"); // Expands UI container
        output.classList.add("show"); // Shows output
        output.textContent = brailleText; // Displays Braille

        // Checks if there is Braille output to show/hide copy button
        if (brailleText) {
            copyBtn.classList.add("visible"); // Shows copy button
        } else {
            copyBtn.classList.remove("visible"); // Hides copy button
        }
    });

    // When copy button is clicked
    copyBtn.addEventListener("click", function () {
        const brailleText = output.textContent;

        // Checks if there is any Braille to copy
        if (!brailleText) return;

        // Copies Braille to clipboard
        navigator.clipboard.writeText(brailleText).then(() => {
            alert("Braille copied to clipboard.");
        });
    });
});
