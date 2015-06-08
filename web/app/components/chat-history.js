import Em from 'ember';

export default Em.Component.extend({
  chateeUserName: null,

  historyMessages: [],

  historyMessage: null,

  onHistoryMessageChange: function(){
    this.get('historyMessages').pushObject(this.get('historyMessage'));
    Em.run.later(this, function(){
      Em.$('ul').scrollTop($('ul').prop('scrollHeight'));
    }, 10);
  }.observes('historyMessage')
});
