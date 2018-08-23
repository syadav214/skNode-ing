class LinkChecker {
  constructor(fileName) {
    this.company = fileName.split('.')[0];
  }

  getLinkClasses() {
    let className = '';
    switch (this.company) {
      case 'coca-cola':
        className = 'a';
        break;
      case 'stack-overflow':
        className = 'li.- item a';
        break;
    }
    return className;
  }
}

module.exports = LinkChecker;
