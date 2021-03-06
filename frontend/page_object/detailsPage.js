function DetailsPage () {
  this.titleContainer = $('.view-module--view--3wzVy').$('h1');
  this.nameContainer = $('.view-module--view--3wzVy').$('ul').$$('li').first();
  this.mailContainer = $('.view-module--view--3wzVy').$('ul').$$('li').last();
  this.url = 'https://waesworks.bitbucket.io/app/details';
  this.title = 'Your Details';


  // GETTERS //

  DetailsPage.prototype.getUrl = function(){
      return this.url;
  };

  DetailsPage.prototype.getTitleContainer = function(){
    return this.titleContainer;
  };

  DetailsPage.prototype.getNameContainer = function(){
    return this.nameContainer;
  };

  DetailsPage.prototype.getMailContainer = function(){
    return this.mailContainer;
  }

  DetailsPage.prototype.getTitle = function(){
      return this.title;
  };

}

module.exports = DetailsPage;