module.exports = {
  name: "p",
  description: "play a sound",
  async execute(message, args, soundFiles) {
    if (!args.length) return message.channel.send("cade o nome do som");
    const soundFile = `${args[0]}.mp3`;
    if (!soundFiles.includes(soundFile))
      return message.channel.send("nao tem isso ai nao");
    if (!message.member.voice.channel)
      return message.channel.send("entra num canal de voz ai");
    if (message.member.voice.channel) {
      console.log(`playing sound ${args[0]}`);
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play(`sound/${soundFile}`);
      dispatcher.on("error", console.error);
    }
  },
};
