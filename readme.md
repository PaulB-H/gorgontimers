<h1>Gorgon Timers</h1>

<img src="https://raw.githubusercontent.com/PaulB-H/gorgontimers/main/readme_img.PNG" alt="" />

<h5><small>Made with:</small><br /> HTML, CSS, JS</h5>

<a href="https://paulb-h.github.io/gorgontimers/" target="_blank">paulb-h.github.io/gorgontimers/</a>

<h2>Description</h2>
<p>An app to keep track of timers in an online game</p>

<h2>Details</h2>
<p>There are chests within dungeons that you can loot every (x) hours.</p>

<p>The MVP will be a list of chests for each dungeon, where you can click on a chest to mark it as looted.</p>
<p>When you do so:</p>
<ul>
	<li>Set a "lastLooted" property on the according chest item to the current UNIX timestamp</li>
    <li>Start a global interval to run every 1 second and update the remaining time on any active timers, based on the chests timer, and lastLooted</li>
</ul>
<p>The MVP does not need any images, however I would like to turn the map into an SVG, then layer some clickable elements over the chest icons, and also display the timer for the chest right below it.</p>
