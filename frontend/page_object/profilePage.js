function ProfilePage () {
  this.url = 'https://waesworks.bitbucket.io/app/profile';
  this.title = 'Your Profile';

  this.userListTable = element(by.id('users_list_table'));


  // GETTERS //

  ProfilePage.prototype.getUrl = function(){
      return this.url;
  };

  ProfilePage.prototype.getTitle = function(){
      return this.title;
  };

  ProfilePage.prototype.getUserListTable = function(){
    return this.userListTable;
};

}

module.exports = ProfilePage;