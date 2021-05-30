const { token, webhook } = require('./config.json')
const { Client, WebhookClient } = require('discord.js')
const parts = webhook.split('/')
if (parts.length !== 7) {
  console.log(`Invalid webhook format!`)
  console.log(webhook)
  process.exit(1)
}
const bot = new Client({
  messageSweepInterval: 60,
  messageCacheMaxSize: 10,
  messageCacheLifetime: 10,
  messageEditHistoryMaxSize: 1
})
const hook = new WebhookClient(parts[5], parts[6])

bot.on('ready', () => {
  console.log(`${bot.user.tag} ready!`)
})

bot.on('message', msg => {
  if (msg.channel.type === 'dm') {
    hook.send(`**NEW MESSAGE**
**From** ${msg.author.tag} (${msg.author.id})
**Message** \n${msg.content || 'Embed message, can\'t create message'}`).catch(e => {
      console.log(`Failed to send webhook: ${e.message}`)
    })
  }
})

bot.login(token).catch(e => {
  console.log(`Something wrong with the token: ${e.message}`)
})