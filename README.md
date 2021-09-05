# Dungeon of Doom

This is a simple roguelike created while reading _Andre Alves Garzia's_ book on roguelike development. A lot of this is cribbed directly from him but, if you want to understand what is going on, get [Roguelike Development with JavaScipt](https://www.apress.com/us/book/9781484260586)

The pathfinding library used is [Xueqiao Xu's PathFinding.js](https://github.com/qiao/PathFinding.js)

## Notes

* I'm linking to the minimized CDN version of phaser to save space.
* Chapter 3: There are some changes to the game config when moving to the full dungeon map. Also, for Firefox, at least, you need to add `type="module"` to the script tag in index.html.
* Chapter 3: With the new turn manager, you need to hold the keys down for the movement to feel natural.
* Chapter 4: I moved all the script tags to the end of the body just to be safe.
* Chapter 4: On p.83, there is a tileToWorldX() call that should be tileToWorldY()
