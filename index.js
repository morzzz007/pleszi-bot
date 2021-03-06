if (!process.env.token || !process.env.deploy_filename) {
  console.log('Error: Specify token/deploy_filename in environment');
  process.exit(1);
} else {
  console.log('Running!');
}

const Botkit = require('botkit');
const _ = require('lodash');
var fs = require('fs');

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
  'U1G5N5AJF': 'kata',
  'U1JNWQL2H': 'niki',
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
  'szerintem a backenden lesz valami, vagy nem tudom',
  'tegnap küldtem egy verziót ami még nem volt jó'
]

const epam = [
  'epam? jövőhéten ott kezdek!',
  'az epamban csak legjobbak dolgoznak, én is jelentkeztem',
  'beadtam a CV-m az epamhoz, várom a visszajelzést!'
]

controller.hears(['^hello$|^hello\s|\shello\s|\shello$', '^hi$|^hi\s|\shi\s|\shi$', '^re$|^re\s|\sre\s|\sre$'], ['message_received', 'direct_message', 'direct_mention', 'ambient'], function(bot, message) {
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

// .deploy password
controller.on('direct_message',function(bot, message) {
  if (names[message.user] && message.text.match(/.deploy .+/g)) {
    pw = message.text.split(/.deploy(.+)?/)[1].trim();
    fs.writeFile(process.env.deploy_filename, message.user+"###"+pw, function(err) {});
    process.exit(0);
  } else {
    bot.reply(message, 'pong');
  }
});
