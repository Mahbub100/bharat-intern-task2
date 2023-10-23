document.addEventListener("DOMContentLoaded", function () {
    const contentForm = document.getElementById("content-form");
    const blogPreview = document.getElementById("blog-preview");

    contentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const text = document.getElementById("text").value;

        // Create a blog post element
        const post = document.createElement("div");
        post.classList.add("post");

        // Add title and text
        post.innerHTML = `<h3>${title}</h3><p>${text}</p>`;

        // Add image (if provided)
        const imageFile = document.getElementById("image").files[0];
        const imageUrl = document.getElementById("image-url").value;
        if (imageFile) {
            const image = document.createElement("img");
            image.src = URL.createObjectURL(imageFile);
            post.appendChild(image);
        } else if (imageUrl) {
            const image = document.createElement("img");
            image.src = imageUrl;
            post.appendChild(image);
        }

        // Add video (if provided)
        const videoFile = document.getElementById("video").files[0];
        const videoUrl = document.getElementById("video-url").value;
        if (videoFile) {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(videoFile);
            video.setAttribute("controls", "true");
            post.appendChild(video);
        } else if (videoUrl) {
            const video = document.createElement("video");
            video.src = videoUrl;
            video.setAttribute("controls", "true");
            post.appendChild(video);
        }

        // Append the post to the blog preview
        blogPreview.appendChild(post);

        // Clear form fields
        contentForm.reset();
    });
});

// Function to validate and display images from URLs
function displayImageFromURL(url) {
    if (isValidURL(url)) {
        const image = new Image();
        image.src = url;
        image.onload = function () {
            // Display the image when it's successfully loaded
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = "";
            imageContainer.appendChild(image);
        };
        image.onerror = function () {
            // Handle errors, e.g., display an error message
            console.log("Error loading the image.");
        };
    } else {
        console.log("Invalid URL format.");
    }
}

// Function to validate a URL
function isValidURL(string) {
    // Simple URL validation using a regular expression
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i;
    return urlPattern.test(string);
}

// Event listener for displaying images from URL
const imageUrlInput = document.getElementById("image-url");
document.getElementById("display-image-btn").addEventListener("click", function () {
    const imageUrl = imageUrlInput.value;
    displayImageFromURL(imageUrl);
});
