function ProfilePage () {
  this.url = 'profile';
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