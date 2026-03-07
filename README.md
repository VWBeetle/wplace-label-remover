# wplace-label-remover
A userscript that removes map labels (streets, towns, bodies of water, etc.) from wplace.live.

I use this if I want to share screenshots on social media without directly revealing the locations of my projects. Just note that it's not foolproof and people can still find your projects with enough time and a little bit of detective work.

I also like it because it makes the map feel a bit cleaner.

The script works by intercepting the map style used by the site and removing the layers responsible for rendering text labels. This keeps the base map visible while preventing labels from appearing. Hypothetically it could be rewritten to only show certain labels, but I didn't see the point.

## Features
* Removes all map text labels (from cities, roads, etc.)
* Works when you toggle between light and dark modes

Runs automatically once installed. You can toggle off the extension in Tampermonkey and reload wplace.live if you want to see labels.

## Requirements
This script requires a userscript manager.
It has been tested with:
* Tampermonkey

## Installation

1. Install Tampermonkey in your browser.
2. Click [this link](https://raw.githubusercontent.com/vwbeetle/wplace-label-remover/main/wplace-label-remover.user.js]) and Tampermonkey should prompt you to install the script
3. Reload wplace.live

Alternatively:
1. Install Tampermonkey
2. Open the Tampermonkey dashboard
3. Create a new script
4. Paste the contents of wplace-label-remover.user.js
5. Click save
6. Reload wplace.live

## How It Works
Wplace draws its map using a style file that defines many layers. Text labels (such as city names, streets, and bodies of water) are drawn by specific layers in that style.

This script intercepts the style file when the site loads it and removes the layers responsible for text labels before the map is rendered. Because the labels never reach the map engine, they never appear on the screen.

Wplace loads a different style when switching between light and dark mode. The script intercepts this as well, ensuring the labels remain gone when you toggle back and forth.

## License
MIT License
