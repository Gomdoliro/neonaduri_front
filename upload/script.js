document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const uploadSpace = document.getElementById('upload-space');
    const imagePreview = document.getElementById('image-preview');

    uploadSpace.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        handleFiles(event.target.files);
    });

    uploadSpace.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadSpace.classList.add('dragging');
    });

    uploadSpace.addEventListener('dragleave', () => {
        uploadSpace.classList.remove('dragging');
    });

    uploadSpace.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadSpace.classList.remove('dragging');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        const filesArray = Array.from(files);

        const selectedFiles = filesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        selectedFiles.forEach((url, i) => {
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = `image${i}`;
            imagePreview.appendChild(imgElement);
        });

        if (filesArray.length > 0) {
            uploadButton.style.display = 'none';
        }
    } 
});

document.getElementById('plus').addEventListener('click', function() {
    const tagInput = document.getElementById('tag');
    const tagValue = tagInput.value.trim();
    const tagsList = document.querySelector('.tags_list');
    const yetDiv = document.querySelector('.yet');

    if (tagValue) {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag_item';
        tagElement.innerHTML = `
            ${tagValue} 
            <span class="delete_tag" onclick="removeTag(this)">x</span>
        `;
        tagsList.appendChild(tagElement);

        yetDiv.style.display = 'none';

        tagInput.value = '';
    }
});

function removeTag(deleteButton) {
    const tagsList = document.querySelector('.tags_list');
    const yetDiv = document.querySelector('.yet');
    
    deleteButton.parentElement.remove();

    if (tagsList.children.length === 0) {
        yetDiv.style.display = 'block';
    }
}