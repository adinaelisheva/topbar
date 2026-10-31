// A helper function that anything adding the topbar JS can use
async function postToTopbar(key, emoji, color, url, text) {
  if (!key) {
    console.log('Cannot post to topbar with empty key');
    return;
  }
  let payload = `key=${key}`;
  let info = {};
  if (emoji) {
    info.emoji = emoji;
  }
  if (color) {
    info.color = color;
  }
  if (url) {
    info.url = url;
  }
  if (text) {
    info.text = text;
  }
  if (Object.keys(info).length !== 0) {
    payload += `&value=${encodeURI(JSON.stringify(info))}`;
  }
  
  let endpoint = '../shared/topbar/additem.php';
  console.log(`fetching ${endpoint} with payload:`);
  console.log(payload);
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: "POST",
    body: payload,
  });
  const responseBody = await response.text();
  let error;
  // No guarantee the response will be JSON parseable, but an error should be
  try {
    const parsed = JSON.parse(responseBody);
    error = parsed.Error;
  } catch {}
  if (error) {
    console.log(`Server Error: ${error}`);
    return error;
  } else {
    console.log(responseBody);
  }
}

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
  item.classList.add('tbItem');
  if (i.text) {
    const text = document.createElement('div');
    text.classList.add('text');
    text.innerHTML = i.text;
    if (i.color) {
      text.style.color = i.color;
    }
    item.appendChild(text);
  }
  if (i.emoji) {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
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

window.addEventListener('load', () => { setupBar() });