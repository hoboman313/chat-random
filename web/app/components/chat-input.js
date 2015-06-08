import Ember from 'ember';

export default Ember.Component.extend({
  inputText: null,

  endOfChat: false,

  classNames: ['chat-input'],

  didInsertElement: function(){
    var self = this;

    Em.$('input')
      .keydown(function(event) {
      var key = event.which;
      // user pressed the 'enter' key
      if(key === 13){
        var inputText = self.get('inputText');
        if(!Em.isNone(inputText) || inputText.trim().length > 0){
          self.sendAction('enterInputText', inputText);
          self.set('inputText', null);
        }
      }
    })
      .focus();;
  }
});
