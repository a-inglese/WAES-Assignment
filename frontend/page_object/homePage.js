
function HomePage () {
    this.url = 'https://waesworks.bitbucket.io/';
    this.title = 'WAES Tester Assignment';

    this.titleElement = $('.view-module--view--3wzVy').$('h1');
    this.downloadLink = $('.view-module--view--3wzVy').$('a');
  
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

    HomePage.prototype.getDownloadLink = function(){
        return this.downloadLink;
    };

    HomePage.prototype.clickDownload = function(){
        this.downloadLink.click();
    };
  
  }
  
  module.exports = HomePage;