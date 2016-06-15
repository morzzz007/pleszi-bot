if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
} else {
  console.log('Running!');
}

const Botkit = require('botkit');
const _ = require('lodash');

const controller = Botkit.slackbot({
  debug: false,
});

const bot = controller.spawn({
  token: process.env.token
}).startRTM();

const names = {
  'U0WRVC9DY': 'marci',
  'U0WU38WGP': 'karcsika',
  'U0WTSCMMX': 'attila',
  'U0WSEJZU5': 'adri',
  'U0WT9MWQ4': 'dubo',
  'U0WGR1C5Q': 'buzi',
  'U0WTADL3W': 'nandi',
}

const bullshit = [
  'még serkenő bajszú piarista voltam, amikor először lépett az életembe a hiperszuper git tag feature',
  'már akkor éreztem, hogy ez a találkozás nagyobb lesz, mint Kóka János önbizalma',
  'már a hétvégére gondolva elkezdtem etetőanyagot gyűjteni a Virtuoso bugfix event alkalmából összegyűlt tömegben',
  'mindig élmény látni, ahogy Kovács László nevére melegíteni kezdenek a főállású tüntetők, vagy mint amikor Budai Gyula piros tooltipről akarja megtanulni a virtuoso irányítását',
  'a Virtuoso backend updatelés a szekértáborhívők Sziget fesztiválja, az sem lenne meglepőbb, ha Horn Gábor Áder Jánossá operáltatná magát nyaktól fölfelé',
  'angular app fejlesztésére javascript developert keres a Lensa',
  'a pozíció egy másfél éves múltú Angular alkalmazas frontend fejlesztéséről szól',
  'második frontendesként csatlakoznál, egy 3 backendes, egy dedikált tesztelő és egy frontendesből álló csapathoz',
  'a fejlesztés ES6-ban történik, és a saját kódod teszttelését is magában foglalja',
  'ES6', 'AngularJS', 'React', 'babel', 'webpack', 'gulp', 'unity',
  'fejlesztőbarát szemlélet, cél a minőségi fejlesztés',
  'a Lensa egy 15 éve a piacon levő cég, többek között a piacvezető karrier portál, a Profession.hu megalkotója',
  'budapesti irodánkban 30-an dolgozunk, ebből 21 fejlesztő.',
  'szerintem a backenden lesz valami, vagy nem tudom'
]

const epam = [
  'epam? jövőhéten ott kezdek!',
  'az epamban csak legjobbak dolgoznak, én is jelentkeztem',
  'beadtam a CV-m az epamhoz, várom a visszajelzést!'
]

controller.hears(['\\bhello\\b', '[^a-zA-Z\'-](hi)+\\b[^\'-]\\b\\s*', '[^a-zA-Z\'-](re)+\\b[^\'-]\\b\\s*'], ['message_received', 'direct_message', 'direct_mention', 'ambient'], function(bot, message) {
  if (names[message.user] && message.user != 'U0WTSCMMX') {
    bot.reply(message, `csá ${names[message.user]}`);
  } else if (message.user === 'U0WTSCMMX') {
    bot.reply(message, `helló főnök, örülök, hogy lassan veled dolgozhatok!`); 
  }
});

controller.hears(['epam'], ['message_received', 'direct_message', 'direct_mention', 'ambient'], function(bot, message) {
  bot.reply(message, _.sample(epam)); 
});

controller.hears(['pleszi', 'plészi'], ['message_received', 'direct_message', 'direct_mention', 'ambient'], function(bot, message) {
  bot.reply(message, _.sample(bullshit)); 
});

controller.on('message_received', function(bot, message) {
  console.log(message.user, message);
});
