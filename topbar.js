async function fetchItems() {
  const response = await fetch(`/shared/topbar/fetchitems.php`);
  const text = await response.text();
  return JSON.parse(text);
}

function addItemToBar(i, bar) {
  let item;
  if (i.url) {
    item = document.createElement('a');
    item.setAttribute('href', `/${i.url}`);
  } else {
    item = document.createElement('div');
  }
  item.classList.add('item');
  if (i.text) {
    const text = document.createElement('div');
    text.classList.add('item');
    text.innerHTML = i.text;
    if (i.color) {
      text.style.color = i.color;
    }
    item.appendChild(text);
  }
  if (i.emoji) {
    const emoji = document.createElement('div');
    emoji.classList.add('item');
    emoji.innerHTML = i.emoji;
    if (i.color) {
      emoji.style.color = 'transparent';
      emoji.style.textShadow = `0 0 0 ${i.color}`;
    }
    item.appendChild(emoji);
  }
  bar.appendChild(item);
}

async function setupBar() {
  const bar = document.createElement('div');
  bar.classList.add('topbar');
  const items = await fetchItems();
  for (const i of items) {
    addItemToBar(JSON.parse(i), bar);
  }
  document.body.appendChild(bar);
}


window.onload = setupBar;