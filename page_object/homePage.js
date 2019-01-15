
function HomePage () {
    this.url = 'https://waesworks.bitbucket.io/';
    this.title = 'WAES Tester Assignment';
  
    // GETTERS //
  
    HomePage.prototype.getUrl = function(){
        return this.url;
    };

    HomePage.prototype.getTitle = function(){
        return this.title;
    };
  
  }
  
  module.exports = HomePage;