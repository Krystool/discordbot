//#region------------------CONSTANTES DU BOT------------------\\

const Discord = require('discord.js')
const bot = new Discord.Client()
const client = new Discord.Client()
const config = require("./config.json")
const prefix = config.prefix
//#endregion

//#region------------------LANCEMENT DU BOT------------------\\

bot.on('ready', function () {
 bot.channels.get('526924546339766296').send("Je suis connecté.")
})
//Message de connection

bot.on('ready', () => {
  bot.user.setActivity("?help pour les commandes !")
})
//Activité

//#endregion

//#region------------------COMMANDES INUTILES------------------\\

bot.on('message', message => {
   if (message.content === prefix + 'ping') {
   message.channel.send("Pong ! `" + bot.ping + "ms`")
   .catch((err) => {
   console.error(err)})
  }
})
//Commande ?ping

//#endregion

//#region------------------MODERATION------------------\\


client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu par {$message.author.username} :white_check_mark:')
    }
});


client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni par {$message.author.username} :white_check_mark:')
    }
});


//#region------------------COMMANDES DIVERSES------------------\\

bot.on('message', message => {
 if (message.content === prefix + 'credit') {
 var credits_embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Les développeurs du ${bot.user.username}`)
                    .setThumbnail(`${bot.user.avatarURL}`)
                    .addBlankField(true)
                    .addField("Les développeurs :","Anderlaxe : Codeur et manager du bot.")
                    .addBlankField(true)
                    .addField("Version :","Le bot est actuellement en version 1.0.0")
                    .addBlankField(true)
                    .addField("Mentions légales :","Tout droits réservés à Raidencrystal#9449, toute réutilisation de ce bot est interdite.\nSCP-FR Bot est sous liscence MIT.")
                    .setFooter(bot.user.username)
                    .setTimestamp()
             message.channel.send(credits_embed)
 }
})
//Commande ?credit

bot.on('message', message => {
 if (message.content === prefix + 'server info') {
 var sinfo_embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Les infos de ${message.guild.name}`)
                    .setThumbnail(`${bot.user.avatarURL}`)
                    .addBlankField(true)
                    .addField("ID du Serveur :", message.guild.id)
                    .addField("Propriétaire :", message.guild.owner)
                    .addField("Nombre de membres :", message.guild.memberCount)
                    .addField("Nombre d'Humains : ", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
                    .addField("Nombre de Bots : ", message.guild.members.filter(m => m.user.bot).size, true)
                    .addField("Nombre de rôles :", message.guild.roles.size, true)
                    .addField("Nombre d'émojis :", message.guild.emojis.size, true)
                    .addField("Serveur créé le :", message.guild.createdAt)
                    .addField("La région du serveur :", message.guild.region)
                    .addField("L'URL de l'icône du serveur :", message.guild.iconURL)
                    .setFooter(bot.user.username)
                    .setTimestamp()
             message.channel.send(sinfo_embed)
 }
})
//Commande ?server info

bot.on('message', message => {
 if (message.content === prefix + 'help') {
 var help_embed = new Discord.RichEmbed()
                .setColor('#C11C17')
                .setTitle(`Les commandes disponibles du bot ${bot.user.username}`)
                .setDescription(`Le prefixe du bot est: "?" `)
                .setThumbnail(`${bot.user.avatarURL}`)
                .addBlankField(true)
                .addField(":paperclip: Autres","`\"?help\"` => Affiche ce message.\n`\"?ping\"` => Teste le bot, il répond \"!Pong !\" si il est up.\n`\"?credit\"` => Affiche les créateurs du bot.\n`\"?comment ça marche\"` => Affiche comment le bot à été créé et comment il fonctionne.\n`\"?changelog\"` => Affiche la dernière mise à jour, ses changements et la version du bot.\n`\"?server info\"` => Donne des informations sur le serveur.\n`\"?explications\"` => Donne les explications du serveur pour les nouveaux.")
                .addBlankField(true)
                .addField(":punch: Intéractions entre utilisateurs","`\"?slap @user\"` => Donne une gifle à un joueur.\n`\"?punch @user\"` => Donne un coup de poing à un joueur.\n`\"?kiss @user\"` => Donne un bisous à un joueur.\n`\"?shoot @user\"` => Pour tirer sur les joueurs.\n`\"?pat @user\"` => Donnez une caresse à un joueur.\n `\"?suck\"` => Faites une magnifique pipe au joueur choisi.\n`\"?fuck\"` Pour #### le joueur choisi.\n**Vous devez être un joueur RP X pour utiliser les commandes NSFW !**")
                .addBlankField(true)
                .addField(":question: Commandes diverses", "`\"?liste\"` => Affiche la liste des réactions et réponses automatiques disponible.\n`\"?je participe\"` => Confirme votre participation au prochain RP.\n`\"?je participe plus\"` => Annule votre participation au prochain RP.")
                .addBlankField(true)
                .addField(":newspaper: Recrutements", "`\"?recrutez-moi\"` => Active votre recrutement pour un rôle RP.\n`\"?fin-recrutement\"` => Marque la fin de votre recrutement une fois que vous l'avez passé.\n`\"?tests\"` => Vous donne tout les rôles disponibles pour les recrutements.")
                .addBlankField(true)
                .addField(":hammer: Modération (Commandes uniquement utilisables par le staff !)", "`\"?help-staff\"` => Vous donne les commandes de staff disponibles\n **Rôles autorisés :** Owner; Administrateur.")
                .setFooter(bot.user.username)
                .setTimestamp()
            message.author.send(help_embed)
            message.channel.send('Les commandes disponibles vous ont été envoyées en MP '+ message.author +'.')
            message.delete()
            .catch((err) => {
            console.error(err)})
 }
})
//Commande ?help

bot.on('message', message => {
 if (message.content === prefix + 'help-staff') {
 let staffRole = message.guild.roles.find("name", "Staff")
 if(message.member.roles.has(staffRole.id)){
                var helpstaff_embed = new Discord.RichEmbed()
                .setColor('#C11C17')
                .setTitle(`Les commandes de modération disponibles du bot ${bot.user.username}`)
                .setDescription(`Le prefixe du bot est: "?" `)
                .setThumbnail(`${bot.user.avatarURL}`)
                .addBlankField(true)
                .addField(":hammer: Modération", "Le bot ne dispose pour l'instant d'aucune commande de modération, mais elles arrivent vite, promis ! :kiss:")
                .addBlankField(true)
                .addField(":performing_arts: Roleplay" ,"`\"!fin-rp\"` => Démarque la fin d'une action RP, à utiliser seulement à la fin des RP.\n**Rôles autorisés :** Owner; Maître du Roleplay")
                .setFooter(bot.user.username)
                .setTimestamp()
                message.author.send(helpstaff_embed)
                message.delete()}
        else message.channel.send('Hmm... Vous n\'avez pas le droit d\'utiliser ça' + message.author +'.'); message.react('❌')
        .catch((err) => {
        console.error(err)})
 }
})
//Commande ?help-staff {Staff}

//#endregion

//#region------------------BOT LOGIN-----------------\\

bot.login(process.env.TOKEN)
//#endregion
