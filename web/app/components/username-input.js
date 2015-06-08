import Em from 'ember';

export default Em.Component.extend({
  userName: null,

  didInsertElement: function(){
    var self = this;

    Em.$('input')
      .keydown(function(event) {
      var key = event.which;
      // user pressed the 'enter' key
      if(key === 13){
        var userName = self.get('userName');
        if(!Em.isNone(userName) || userName.trim().length > 0){
          self.sendAction('enterUsername', userName);
        }
      }
    })
    .focus();
  }
});
