const Discord = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./cmd")
  .filter((file) => file.endsWith(".js"));
const soundFiles = fs
  .readdirSync("./sound")
  .filter((file) => file.endsWith(".mp3"));

for (const file of commandFiles) {
  const command = require(`./cmd/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("ready");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  try {
    command.execute(message, args, soundFiles);
  } catch (error) {
    console.error(error);
    message.reply("deu merda ai ana maria");
  }
});

client.login(token);
