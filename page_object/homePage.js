
function HomePage () {
    this.url = 'https://waesworks.bitbucket.io/';
    this.title = 'WAES Tester Assignment';

    this.titleElement = $('.view-module--view--3wzVy').$('h1');
  
    // GETTERS //
  
    HomePage.prototype.getUrl = function(){
        return this.url;
    };

    HomePage.prototype.getTitle = function(){
        return this.title;
    };

    HomePage.prototype.getTitleElement = function(){
        return this.titleElement;
    };
  
  }
  
  module.exports = HomePage;