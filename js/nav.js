
const container = document.querySelector('.navigation');

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.navigation');
    console.log(container);
});

const primary = container.querySelector('.nav__list');
const primaryItems = container.querySelectorAll('.nav__list > li:not(.nav__item__more)');
container.classList.add('--jsfied');

// Insert "more" button and duplicate the list
primary.insertAdjacentHTML('beforeend', `
  <li class="nav__item__more">
    <button type="button" aria-haspopup="true" aria-expanded="false">
      <svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2"></circle>
        <circle cx="4" cy="12" r="2"></circle>
        <circle cx="20" cy="12" r="2"></circle>
      </svg>
    </button>
    <ul class="nav__list__more">
      ${primary.innerHTML}
    </ul>
  </li>
`);

const secondary = container.querySelector('.nav__list__more');
const secondaryItems = secondary.querySelectorAll('li');
const allItems = container.querySelectorAll('li');
const moreLi = primary.querySelector('.nav__item__more');
const moreBtn = moreLi.querySelector('button');

moreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.toggle('nav__active');
  moreBtn.setAttribute('aria-expanded', container.classList.contains('nav__active'));
});

// Adapt tabs
const doAdapt = () => {
  // Reveal all ite  ms for the calculation
  allItems.forEach((item) => item.classList.remove('nav__hidden'));

  let stopWidth = moreBtn.offsetWidth;
  let hiddenItems = [];
  const primaryWidth = primary.offsetWidth;
  
  // Hide items that won't fit in the Primary
  primaryItems.forEach((item, i) => {
    if (primaryWidth >= stopWidth + item.offsetWidth) {
      stopWidth += item.offsetWidth;
    } else {
      item.classList.add('nav__hidden');
      hiddenItems.push(i);
    }
  });

  // Toggle the visibility of More button and items in Secondary
  if (!hiddenItems.length) {
    moreLi.classList.add('nav__hidden');
    container.classList.remove('nav__active');
    moreBtn.setAttribute('aria-expanded', false);
  } else {
    secondaryItems.forEach((item, i) => {
      item.classList.toggle('nav__hidden', !hiddenItems.includes(i));
    });
  }
};


const debounce = (func, delay) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

doAdapt();
window.addEventListener('resize', debounce(doAdapt, 100));

// Hide Secondary on the outside click
document.addEventListener('click', (e) => {
  let el = e.target;
  while (el) {
    if (el === secondary || el === moreBtn) return;
    el = el.parentNode;
  }
  container.classList.remove('nav__active');
  moreBtn.setAttribute('aria-expanded', false);
});