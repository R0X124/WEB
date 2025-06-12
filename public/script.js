/*document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('buttonCI');
    const container = document.getElementById('C_image');

    // Crear un contenedor específico para la imagen
    const imgWrapper = document.createElement('div');
    imgWrapper.id = 'imgPreview';
    imgWrapper.style.width = '100%';
    imgWrapper.style.height = '100%';
    imgWrapper.style.marginTop = '1rem';

    // Insertar al final del contenedor principal
    container.appendChild(imgWrapper);

    button.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png, image/jpg';

        fileInput.addEventListener('change', function() {
            const file = fileInput.files[0];
            if (file){
                container.innerHTML = ''; // Clear previous images

                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = 'Imagen cargada';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';

                container.appendChild(img);
            }
        });
        fileInput.click(); // Open file dialog
    });
});*/

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('buttonCI');
    const container = document.getElementById('C_image');
    let img = null;
    let currentFile = null;

    button.addEventListener('click', function () {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png, image/jpg';

        fileInput.addEventListener('change', function () {
            currentFile = fileInput.files[0];
            if (currentFile) {
                if (!img) {
                    img = document.createElement('img');
                    container.insertBefore(img, button); // Muestra imagen arriba del botón
                }
                img.src = URL.createObjectURL(currentFile);
                img.alt = 'Imagen cargada';

                // Ahora mandamos la imagen al backend
                const formData = new FormData();
                formData.append("file", currentFile);

                fetch("http://localhost:5000/predict", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Actualizar campos con la respuesta
                    document.getElementById("title1").value = data.class;
                    document.getElementById("title2").value = (data.confidence * 100).toFixed(2) + "%";
                    document.getElementById("title3").value = "Modelo: VGG16";
                    document.getElementById("title4").value = "Clasificación exitosa";
                    document.getElementById("title5").value = "Dim: 224x224";
                    document.getElementById("title6").value = currentFile.name;
                })
                .catch(error => {
                    alert("Error al predecir: " + error.message);
                });
            }
        });

        fileInput.click();
    });
});
