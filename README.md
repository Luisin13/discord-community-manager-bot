# How the bot works?

It's a simple bot, that can easily be upgraded for your needs using modules or plugins!

# What are modules?

Modules are big pieces of code that can be implemented into the bot, so it can have many more functions!<br/>
How to install modules:<br/>
● Locate the modules folder in src directory<br/>
● Download a module<br/>
● Place the module in the bot modules folder<br>
● Now you are good to go<br/>

# What are plugins?

Plugins are like a module, but in small size and can only be used in bot events, like `ready` and `messageCreate` event!
But why we need plugins, if there is modules? It's because plugins have small functionalities that doesn't worth making a module for that.<br/>
How to install plugins:<br/>
● Locate the plugins folder in src directory<br/>
● Download a plugin<br/>
● Place the plugin in the bot plugins folder<br/>
● Now you are good to go<br/>

# How to start the bot?

First you need <a href="https://nodejs.org/en/">Node.js v16.14.0</a> then after Node.js is installed you need a code editor, some good ones are <a href="https://code.visualstudio.com">Visual Studio Code</a> and <a href="https://www.sublimetext.com">Sublime Text</a>, after you install one of these code editors, go ahead and open the bot folder with them, now you will need to configure the `config.js`, so open the `config.js` with the code editor and start placing the bot token, if you need help with this go to <a href="https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot">Discord.js Guide</a> it can help you to get the token, with the token in hands, go ahead and remove the placeholder text and paste the token, in the prefix remove the placeholder text and write the wanted prefix, I recommend maximum of 3 chars, for the guild id you will need the <a href="https://support.discord.com/hc/pt-br/articles/206346498">guild id<a> where the bot will be used, and remove placeholder text and paste your guild id, and the last part of setting up the bot, remove placeholder text of mod roles do almost the same process as the guild id, but this time with your mod role id. Now you can start the bot by typing `node .` on the terminal

<details>
<summary>At the end the config.js should be looking like this (click to see)</summary>
 <br />
<p><img src="https://user-images.githubusercontent.com/84397555/156944199-d781805a-a863-4b06-a735-e20b6290c607.png" alt="image" /></p>
</details><br />
