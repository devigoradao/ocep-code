document.getElementById('generateButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput.files.length) {
        alert('Por favor, faça upload de um arquivo .html');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const htmlContent = event.target.result;
        
        // Criar um iframe invisível para gerar a thumbnail
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        iframe.contentDocument.open();
        iframe.contentDocument.write(htmlContent);
        iframe.contentDocument.close();

        // Usar html2canvas para tirar uma screenshot
        html2canvas(iframe.contentDocument.body).then(canvas => {
            // Converter a imagem em Blob e salvar
            canvas.toBlob(function(blob) {
                // Criar um arquivo zip com JSZip
                const zip = new JSZip();
                
                // Adicionar a thumbnail ao zip
                zip.file("thumbnail.png", blob);

                // Adicionar o arquivo HTML renomeado para index.html
                zip.file("index.html", htmlContent);

                // Gerar o zip e baixá-lo
                zip.generateAsync({ type: 'blob' }).then(function(content) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = 'arquivo.zip';
                    link.click();
                });
            });
        });
        
        // Remover o iframe após gerar a thumbnail
        document.body.removeChild(iframe);
    };

    reader.readAsText(file);
});