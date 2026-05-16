
function addBarItem(icon, text, color, bar) {
  const barItem = document.createElement('div');
  const barText = document.createElement('span');
  barText.innerText = text;
  barText.setAttribute('style', `color:${color};`);
  barItem.innerText = icon;
  barItem.appendChild(barText);
  bar.appendChild(barItem);
}

function addCautionData() {

}

function setupBar() {
  const bar = document.createElement('div');
  bar.classList.add('topbar');
  addCautionData();
  document.body.appendChild(bar);
}


window.onload = setupBar;