const moment = require('moment');
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

require('dotenv').config();

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'dont_let_it_slip_bot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'soccer',
    results: 1
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

//Listen for comments
comments.on('comment', (comment) => {
    //time now
    const now = moment();
    //console.log(now.format('MMM Do, YYYY H:mm'));

    //time stevie g slipped
    const slipDate = moment('2014-04-27 14:58');

    const time = Math.floor(moment.duration(moment(now).diff(moment(slipDate))).asMinutes()).toLocaleString();

    if (comment.body.includes('slipp') && comment.author.name !== 'dont_let_it_slip_bot') {
        console.log(`author: ${comment.author.name}, comment: ${comment.body}`);
        comment.reply(`It's been ${time} minutes since Stevie G slipped, but who's counting?`);
    }
});

console.log('dont_let_it_slip_bot is listening');