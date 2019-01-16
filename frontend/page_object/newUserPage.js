function NewUserPage () {
    this.url = 'https://waesworks.bitbucket.io/app/newUser';
    this.title = 'Your Profile';
    this.titleElement = $('.view-module--view--3wzVy').$('h1');
    this.welcomeMessageElement = $('.view-module--view--3wzVy').$('p')
  
  
    // GETTERS //
  
    NewUserPage.prototype.getUrl = function(){
        return this.url;
    };
  
    NewUserPage.prototype.getTitle = function(){
        return this.title;
    };

    NewUserPage.prototype.getTitleElement = function(){
        return this.titleElement;
    };

    NewUserPage.prototype.getWelcomeMessageElement = function(){
        return this.welcomeMessageElement;
    };
  
  }
  
  module.exports = NewUserPage;