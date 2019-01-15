function PageObjectHelper () {
}
  
  PageObjectHelper.prototype.getContainerText = function(container) {
    return container.getText();
  };

  PageObjectHelper.prototype.isFieldRequired = function(element) {
    expect(element.getAttribute('required')).toBeDefined();
  }

module.exports = PageObjectHelper;