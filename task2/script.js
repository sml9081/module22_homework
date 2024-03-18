const btn = document.querySelector('.btn');
const svgWite = document.querySelector('.svg-wite');
const svgBlack = document.querySelector('.svg-black');

btn.addEventListener('click', () => {
    if (svgWite.style.display === 'none') {
        svgWite.style.display = 'flex';
        svgBlack.style.display = 'none';
    } else {
        svgWite.style.display = 'none';
        svgBlack.style.display = 'flex';
    }
})