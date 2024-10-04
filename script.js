document.getElementById('generateBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Por favor, selecione um arquivo HTML.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const htmlContent = e.target.result;

        // Renderiza o HTML no elemento oculto
        const htmlContainer = document.getElementById('htmlContent');
        htmlContainer.innerHTML = htmlContent;

        // Gera a imagem do conteúdo usando html2canvas
        html2canvas(htmlContainer, { 
            logging: true, 
            useCORS: true,
            allowTaint: true, // Permite imagens tainted
            scale: window.devicePixelRatio // Para maior resolução
        }).then(canvas => {
            // Usando toDataURL para obter a imagem
            const imgData = canvas.toDataURL('image/jpeg', 1.0); // Usando qualidade máxima
            
            // Criar um blob a partir da imagem usando a função Blob
            const byteString = atob(imgData.split(',')[1]);
            const mimeString = imgData.split(',')[0].split(':')[1].split(';')[0];
            const ab = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ab[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });

            // Cria o ZIP
            const zip = new JSZip();
            zip.file("index.html", htmlContent);
            zip.file("thumbnail.jpg", blob, { binary: true });

            // Gera o arquivo ZIP e inicia o download
            zip.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, "arquivos.zip");
            }).catch(error => {
                console.error("Erro ao gerar o arquivo ZIP:", error);
            });
        }).catch(error => {
            console.error("Erro ao gerar imagem:", error);
        });
    };

    reader.readAsText(file);
});
