/**************************************
 * X, O, Blank Types
 * ************************************/
function Type(type) {
  this.type = type || 'blank';
}

Type.prototype = {
  getType: function() {
    return this.type;
  },

  setType: function(type) {
    this.type = type;
  },

  isBlank: function() {
    return this.type === 'blank';
  },

  toString: function() {
    return this.type === 'blank' ? "|" : this.type;
  }
};

module.exports = Type;
