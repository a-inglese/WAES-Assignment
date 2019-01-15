function NewUserPage () {
    this.url = 'https://waesworks.bitbucket.io/app/newUser';
    this.title = 'Your Profile';
    this.titleContainer = $('.view-module--view--3wzVy').$('h1');
    this.welcomeMessageContainer = $('.view-module--view--3wzVy').$('p')
  
  
    // GETTERS //
  
    NewUserPage.prototype.getUrl = function(){
        return this.url;
    };
  
    NewUserPage.prototype.getTitle = function(){
        return this.title;
    };

    NewUserPage.prototype.getTitleContainer = function(){
        return this.titleContainer;
    };

    NewUserPage.prototype.getWelcomeMessageContainer = function(){
        return this.welcomeMessageContainer;
    };
  
  }
  
  module.exports = NewUserPage;