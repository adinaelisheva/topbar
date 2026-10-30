# Top Status Bar 

A bar showing short icon/text statuses from various websites.

## To include on a site
1) Include `shared/topbar/topbar.css`
2) Include `shared/topbar/topbar.js`
3) Ensure your main app has 24px space on top

## To add info to the topbar

Your app can add anything it likes to the topbar by posting a JSON blob to:

`/shared/topbar/additem.php`

Request params should be:

```
{
  key: str;   // The key representing this topbar item
  value: str; // JSON blob containing all info for display
}
```

Items are keyed to the `key` string, so sending info for key X will replace any preexisting info for X. Keys are not displayed to the user.

The JSON info blob is structured as follows:

```
{
  text: str;
  emoji: str;
  color: str; // Color string to be used directly for CSS styling
  url: str; // directory name (relative path)
}
```

All properties are optional. Examples:

```
{
  text: 'temp',
  emoji: '🌡️',
  color: '#e3ba24',
}

{
  emoji: '✅',
}
```

How to actually hit this endpoint is up to you.