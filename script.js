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

    button.addEventListener('click', function () {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png, image/jpg';

        fileInput.addEventListener('change', function () {
            const file = fileInput.files[0];
            if (file) {
                if (!img) {
                    img = document.createElement('img');
                    container.insertBefore(img, button); // Inserta la imagen encima del botón
                }
                img.src = URL.createObjectURL(file);
                img.alt = 'Imagen cargada';
            }
        });

        fileInput.click();
    });
});