//Globals
const navButtons = document.querySelectorAll("nav>div");
const navbar = document.querySelector("nav");
const header = document.querySelector("header");
const sectionTitles = document.querySelectorAll("section.title");
const sectionArray = Array.from(sectionTitles);
const startPosition = navbar.offsetTop;
const observer = new IntersectionObserver(entries => adjustVisibility(entries));

function init() {
    observer.observe(header);

    for (let title of sectionTitles) {
        observer.observe(title);
    }
}

function adjustVisibility(entries) {
    const mobileView = window.matchMedia("(max-width: 650px)");

    for (let entry of entries) {
        if (!mobileView.matches) {
            if (entry.target.nodeName === "HEADER") {
                if (entry.intersectionRatio > 0) {
                    removeSelected();
                    navbar.classList.remove("sticky");
                } else {
                    navbar.classList.add("sticky");
                }
            }
            if (entry.target.nodeName === "SECTION") {
                let i = sectionArray.indexOf(entry.target);
                if (entry.intersectionRatio > 0) {
                    removeSelected();
                    navButtons[i].classList.add("selected");
                }
            }
        }
    }
}

function removeSelected() {
    for (let button of navButtons) {
        button.classList.remove("selected");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Modal
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");

    // Alle prototypeGallery containers selecteren
    let imageContainers = document.querySelectorAll('.prototypeGallery');

    // Event listener toevoegen aan elke prototypeGallery container
    imageContainers.forEach(container => {
        container.addEventListener('click', function (event) {
            if (event.target.tagName === 'IMG') {
                modal.style.display = "block";
                modalImg.src = event.target.src;
                captionText.innerHTML = event.target.alt;
            }
        });
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Span container
    let span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    };
});

document.addEventListener("DOMContentLoaded", init);