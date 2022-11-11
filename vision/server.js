const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const rooms = {};

io.on('connection', currSocket => {
    /*
        If a peer is initiator, he will create a new room
        otherwise if peer is receiver he will join the room
    */
    currSocket.on('join room', roomId => {
        console.log("Join room emitted");
        if (rooms[roomId]) {
            // Receiving peer joins the room
            rooms[roomId].push(currSocket.id);
        } else {
            // Initiating peer create a new room
            rooms[roomId] = [currSocket.id];
        }
        /*
            If both initiating and receiving peer joins the room,
            we will get the other user details.
            For initiating peer it would be receiving peer and vice versa.
        */
        const otherUser = rooms[roomId].find(id => id !== currSocket.id);
        if(otherUser){
            currSocket.emit("other user", otherUser);
            currSocket.to(otherUser).emit("user joined", currSocket.id);
        }
    })

    /*
        The initiating peer offers a connection
    */
   currSocket.on('offer', payload => {
        console.log("offer emmitted");
        io.to(payload.target).emit('offer', payload);
   });

   /*
        The receiving peer answers (accepts) the offer
    */
    currSocket.on('answer', payload => {
        console.log("answer emmitted");
        io.to(payload.target).emit('answer', payload);
    });

    currSocket.on('ice-candidate', incoming => {
        console.log("ice-candidate emmitted");
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    })
});

server.listen(9000, () => console.log("Server is up and running on Port 9000"));