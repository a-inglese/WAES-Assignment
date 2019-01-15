function ProfilePage () {
  this.url = 'https://waesworks.bitbucket.io/app/profile';
  this.title = 'Your Profile';


  // GETTERS //

  ProfilePage.prototype.getUrl = function(){
      return this.url;
  };

  ProfilePage.prototype.getTitle = function(){
      return this.title;
  };

}

module.exports = ProfilePage;