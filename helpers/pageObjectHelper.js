function PageObjectHelper () {
}
  
  PageObjectHelper.prototype.getElementText = function(element) {
    return element.getText();
  };

  PageObjectHelper.prototype.isFieldRequired = function(element) {
    expect(element.getAttribute('required')).toBeDefined();
  }

module.exports = PageObjectHelper;