let previousButton = document.getElementById('previous');
let nextButton = document.getElementById('next');

previousButton.addEventListener('click', function () { slide(1) });
nextButton.addEventListener('click', function () { slide(2) });

function slide(param) {
    let productsBlock = document.getElementById('productsBlock');
    let firstItem = productsBlock.firstElementChild;

    if (param == 1) {
        productsBlock.appendChild(firstItem);
    } else if (param == 2) {
        productsBlock.insertBefore(productsBlock.lastElementChild, firstItem);
    }    
}
