var express  = require('express');
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var util = require('util')
var fs = require('fs')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dburl = 'mongodb://user:kaileena20@ds129541.mlab.com:29541/nodejs'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})


app.get('/list_messages', function(req, res) {
    util.log("get method for rest call for fetching messages")
    Message.find({}, (err, messages)=>{
        res.send(messages)
    })
})


app.get('/messages', (req, res)=> {
    util.log("get method for fetching messages")
    Message.find({}, (err, messages)=>{
        res.send(messages)
    })
})

app.post('/messages', (req, res)=> {
    console.log(req.body)
    var message = new Message(req.body)

    message.save((err)=>{
        if(err)
            sendStatus(500)

        Message.findOne({message: 'badword'}, (err, censored)=>{
            if(censored){
                console.log("censored words found", censored)
                Message.remove({_id: censored.id}, (err)=>{
                    console.log('removed the censored message')
                })
            }
        })
        // message.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })

    
})

io.on('connection', (socket)=>{
    console.log('a user connected')
})

mongoose.connect(dburl, {useNewUrlParser: true},(err)=>{
    console.log('mongo db connection', err)
})

server = http.listen(3000, ()=> {
    console.log('server is listening on port', server.address().port)
})