const url = window.location;

if (url.protocol === "file:" || url.hostname === "localhost") {
    document.getElementById("local").style.display = "block";
} else if (url.hostname.includes("netlify.com")) {
    document.getElementById("netlify").style.display = "block";
}