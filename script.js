document.getElementById('generateButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput.files.length) {
        alert('Please upload an .html file');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const htmlContent = event.target.result;

        // Create an invisible iframe to render the HTML
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        iframe.contentDocument.open();
        iframe.contentDocument.write(htmlContent);
        iframe.contentDocument.close();

        // Use html2canvas to capture a screenshot
        html2canvas(iframe.contentDocument.body).then(canvas => {
            // Convert the canvas to a Blob (image)
            canvas.toBlob(function(blob) {
                // Create a zip file using JSZip
                const zip = new JSZip();

                // Add the thumbnail to the zip
                zip.file("thumbnail.png", blob);

                // Add the HTML file renamed as index.html
                zip.file("index.html", htmlContent);

                // Generate the zip and trigger the download
                zip.generateAsync({ type: 'blob' }).then(function(content) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = 'files.zip';
                    link.click();

                    // Clean up the iframe after the process
                    document.body.removeChild(iframe);
                });
            }, 'image/png');
        });
    };

    reader.readAsText(file);
});
