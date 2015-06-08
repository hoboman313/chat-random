import Em from 'ember';

export default Em.Component.extend({
  isChatting: false,
  isReadyToChat: false,

  userName: null,
  chateeUserName: null,

  socket: null,

  classNames: ['centered-form'],

  message: null,
  historyMessage: null,

  endOfChat: false,

  actions: {
    readyToChat: function (userName) {
      this.setProperties({
        'isReadyToChat': true,
        'userName': userName
      });

      this.get('socket').emit('newUser', userName);
    },

    sendMessage: function(message){
      this.set('historyMessage', {message: message, userName: 'Me', className: 'user-row'});
      this.get('socket').emit('message', message);
    }
  },

  didInsertElement: function(){
    var socket = io(), self = this;
    this.set('socket', socket);

    socket
      .on('startChat', function(chateeUserName){
        self.setProperties({
          'isChatting': true,
          'chateeUserName': chateeUserName
        });
      })
      .on('message', function(message){
        self.setProperties({
          'message': message,
          'historyMessage': {message: message, userName: self.get('chateeUserName'), className: 'chatee-row'}
        });
      })
      .on('userDisconnected', function(){
        self.setProperties({
          'historyMessage': {userName: self.get('chateeUserName'), className: 'dc-row', isLeaveMsg: true},
          endOfChat: true
      });
      });
  }
});
