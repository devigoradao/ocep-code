document.getElementById('fileInput').addEventListener('change', function(event) {
    const fileInput = event.target;
    const fileNameSpan = document.getElementById('fileName');
    const generateButton = document.getElementById('generateButton');

    // Show the name of the file selected
    const fileName = fileInput.files.length ? fileInput.files[0].name : 'No file chosen';
    fileNameSpan.textContent = fileName;

    // Enable the "Generate and Download" button
    if (fileInput.files.length) {
        generateButton.classList.add('active');
        generateButton.disabled = false;
    } else {
        generateButton.classList.remove('active');
        generateButton.disabled = true;
    }
});

document.getElementById('generateButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput.files.length) {
       
