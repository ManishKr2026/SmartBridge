let selectedFile = null;
const cloudName = 'dq0joztmo';
const uploadPreset = 'grain_pallet';
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li a");

    // Toggle mobile menu
    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    // Set active link based on current page URL
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});

//Uploading/Handling Image
document.addEventListener("DOMContentLoaded", function() {
    const dragArea = document.getElementById("drag-area");
    const fileInput = document.getElementById("file-input");
    const browseBtn = document.getElementById("browse-btn");
    const previewContainer = document.getElementById("preview-container");
    const uploadedImage = document.getElementById("uploaded-image");
    const removeImgBtn = document.getElementById("remove-img");
    const submitBtn = document.getElementById("submit-btn");

    // Browse button click
    browseBtn.addEventListener("click", () => fileInput.click());

    // File input change
    fileInput.addEventListener("change", function() {
        handleFiles(this.files);
    });

    // Drag over event
    dragArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dragArea.classList.add("drag-active");
    });

    // Drag leave event
    dragArea.addEventListener("dragleave", () => {
        dragArea.classList.remove("drag-active");
    });

    // Drop event
    dragArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dragArea.classList.remove("drag-active");
        handleFiles(event.dataTransfer.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadedImage.src = e.target.result;
                    dragArea.classList.add("hidden"); // Hide upload area
                    previewContainer.classList.remove("hidden"); // Show preview container
                    previewContainer.classList.add("after-upload");
                    submitBtn.classList.remove("hidden"); // Show submit button
                    submitBtn.classList.add("enable"); // Show submit button
                };
                reader.readAsDataURL(file);
            } else {
                alert("Only image files are allowed.");
            }
        }
    }

    // Remove image
    removeImgBtn.addEventListener("click", function() {
        uploadedImage.src = "";
        previewContainer.classList.add("hidden"); // Hide preview
        dragArea.classList.remove("hidden"); // Show upload area
        submitBtn.classList.add("hidden"); // Hide submit button
        fileInput.value = ""; // Clear file input
    });

    //Submit Button
    submitBtn.addEventListener("click", function() {
        if (selectedFile) {
            submitBtn.classList.add("disable");
            submitBtn.classList.remove("enable");
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', uploadPreset);
            formData.append('cloud_name', cloudName);
            fetch(cloudinaryUrl, {
                    method: 'POST',
                    body: formData,
                })
                .then((response) => response.json())
                .then((data)=>{
                    window.location.href = `/results/${data.public_id}`;
                });
        } else {
            alert("Please select an image to upload.");
        }
    });
});

// Add this to your existing script.js
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const navBar = document.querySelector('.nav-bar');

    if (currentScrollY > lastScrollY) {
        // Scrolling down
        navBar.classList.add('hidden');
        // Close mobile menu when scrolling down
        document.querySelector('.nav-links').classList.remove('active');
    } else {
        // Scrolling up
        navBar.classList.remove('hidden');
    }

    // Always show navbar when reaching top
    if (currentScrollY <= 10) {
        navBar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
});

// Optional: Hide navbar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!e.target.closest('.nav-bar') && window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});