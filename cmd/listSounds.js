module.exports = {
  name: "ls",
  description: "list sounds",
  execute(message, args, soundFiles) {
    let soundList = "```";
    soundFiles.forEach((sound) => {
      soundList += `${sound.slice(0, -4)}\n`;
    });
    soundList += "```";
    message.channel.send(soundList);
  },
};
