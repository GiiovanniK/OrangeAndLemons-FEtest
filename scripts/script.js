// Gebruikte bronnen: 
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
// https://stackoverflow.com/questions/2614461/javascript-get-mouse-position-relative-to-parent-element
// Eerste video result op query, draggable slider vanilla js: https://www.youtube.com/watch?v=KHGc7eZyxKY

// Image follows cursor. Image and tooltip on slider
followTooltip = (containerId, tooltipId) => {
    const container = document.getElementById(containerId);
    const imageFollowsCursor = document.getElementById(tooltipId);

    container.addEventListener("mousemove", (follow) => {
        const bounds = container.getBoundingClientRect();

        const x = follow.clientX - bounds.left + container.scrollLeft;
        const y = follow.clientY - bounds.top + container.scrollTop;

        imageFollowsCursor.style.left = `${x - imageFollowsCursor.offsetWidth / 2}px`;
        imageFollowsCursor.style.top = `${y - imageFollowsCursor.offsetHeight / 2}px`;

        if (imageFollowsCursor.classList.contains("hideFollowCursor")); {
            imageFollowsCursor.classList.remove("hideFollowCursor");
        }
    });

    container.addEventListener("mouseleave", () => {
        imageFollowsCursor.classList.add("hideFollowCursor");
    });
};

followTooltip('mainSection', 'followCursor');

// Text slider
const textSlider = document.getElementById('slider');
let mouseDown;
let startHorizontal;
let scrollLeft;

textSlider.addEventListener('mousedown', (e) => {
    mouseDown = true;
    startHorizontal = e.pageX - textSlider.offsetLeft;
    scrollLeft = textSlider.scrollLeft;
});

textSlider.addEventListener('mouseup', () => {
    mouseDown = false;
});

textSlider.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        e.preventDefault();
        const x = e.pageX - textSlider.offsetLeft;
        const scrollAmount = (x - startHorizontal) * 2;
        textSlider.scrollLeft = scrollLeft - scrollAmount;
    }
});

textSlider.addEventListener('mouseleave', () => {
    mouseDown = false;
});

textSlider.addEventListener("wheel", (e) => {
    e.preventDefault();
    textSlider.scrollTo(textSlider.scrollLeft + e.deltaY, 0);
});

followTooltip('slider', 'sliderTooltip');