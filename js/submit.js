document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const file = document.querySelector("#file").files[0];
        console.log(FileList);
        if (file) {
            alert(`Submission successful! "${title}" has been submitted.`);
        }
        else {
            alert("Please upload a file.")
        }

    });
})