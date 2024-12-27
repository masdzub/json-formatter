const currentYearSpan = document.getElementById('currentYear');
currentYearSpan.textContent = new Date().getFullYear();

const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const jsonFile = document.getElementById('jsonFile');
const formatButton = document.getElementById('formatButton');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const fileUploadText = document.getElementById('file-upload-text');

const formatJSON = (input) => {
    try {
        return JSON.stringify(JSON.parse(input), null, 2);
    } catch (error) {
        return 'Invalid JSON';
    }
};

const autoResize = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
};

const handleFormat = () => {
    jsonOutput.textContent = formatJSON(jsonInput.value);
    autoResize(jsonOutput);
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        fileUploadText.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                jsonInput.value = JSON.stringify(JSON.parse(e.target.result), null, 2);
                handleFormat();
            } catch (error) {
                jsonInput.value = "";
                jsonOutput.textContent = 'Invalid JSON in file';
                autoResize(jsonOutput);
            }
        };
        reader.readAsText(file);
    } else {
        fileUploadText.textContent = "No file chosen";
    }
};

const handleClear = () => {
    jsonInput.value = '';
    jsonOutput.textContent = '';
    fileUploadText.textContent = "No file chosen";
    autoResize(jsonInput);
    autoResize(jsonOutput);
};

jsonInput.addEventListener('input', () => {
    handleFormat();
    autoResize(jsonInput);
});
formatButton.addEventListener('click', handleFormat);
jsonFile.addEventListener('change', handleFileSelect);
clearButton.addEventListener('click', handleClear);

new ClipboardJS(copyButton);
copyButton.addEventListener('click', () => alert('JSON copied to clipboard!'));

autoResize(jsonInput);
autoResize(jsonOutput);