// Map each supported character to its Braille equivalent (HashMap)
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
        if (/[A-Z]/.test(char)) {
            return CAPITAL_SIGN + (brailleMap[char.toLowerCase()] || '');
        }
        if (brailleMap[char]) {
            return brailleMap[char];
        }
        return '';
    }).join('');
}

// Run after page loads
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    const container = document.querySelector(".container");
    const output = document.querySelector(".braille-output");
    const input = document.querySelector("input");
    const copyBtn = document.getElementById("copyBtn");

    button.addEventListener("click", function () {
        const englishText = input.value.trim();

        if (englishText === "") {
            alert("How will someone read that!");
            input.focus();
            return;
        }

        const brailleText = translateToBraille(englishText);
        container.classList.add("expanded");
        output.classList.add("show");
        output.textContent = brailleText;

        // Show copy button if there's text
        if (brailleText) {
            copyBtn.classList.add("visible");
        } else {
            copyBtn.classList.remove("visible");
        }
    });

    // Copy to clipboard
    copyBtn.addEventListener("click", function () {
        const brailleText = output.textContent;
        if (!brailleText) return;

        navigator.clipboard.writeText(brailleText).then(() => {
            alert("Braille copied to clipboard.");
        });
    });
});

