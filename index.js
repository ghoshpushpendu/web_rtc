
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
var pusher = new Pusher({
    appId: '971021',
    key: '3dd160eeb6d0d82a3fbd',
    secret: '4ffe4315b8bf125121bb',
    cluster: 'ap2',
    encrypted: true
  });


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        var presenceData = {
            user_id: Math.random().toString(36).slice(2) + Date.now()
        }
        const auth = pusher.authenticate(socketId, channel, presenceData);
        res.send(auth);
});

const PORT = process.env.PORT || 3000;

//listen on the app
app.listen(PORT, () => {
    return console.log('Server is up on 3000')
});
