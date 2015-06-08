var io = require('socket.io')();

var userQueue = [], chatRoomUserMap = {};

module.exports = {
    websocketConnect: function (socket) {
        socket
            .on('newUser', function (userName) {
                if(userQueue.length === 0){
                    userQueue.push({socket: this, userName: userName });
                } else {
                    var otherUser = userQueue.pop();
                    this.join(otherUser.socket.id);

                    chatRoomUserMap[this.id] = otherUser.socket;
                    chatRoomUserMap[otherUser.socket.id] = this;

                    otherUser.socket.emit('startChat', userName);
                    this.emit('startChat', otherUser.userName);
                }

                console.log('New user connected with userName: ' + userName + ', id: ' + this.id);
            })
            .on('message', function (message) {
                console.log('Got message ' + message);
                chatRoomUserMap[this.id].emit('message', message);
            })
            .on('disconnect', function () {
                var id = this.id;
                userQueue = userQueue.filter(function(user){return user.socket.id !== id});

                if(chatRoomUserMap[id]){
                    chatRoomUserMap[id].emit('userDisconnected');
                    delete chatRoomUserMap[chatRoomUserMap[id].id];
                    delete chatRoomUserMap[id];
                }

                console.log('User disconnected id: ' + id);
            });
    }
};