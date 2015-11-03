
//Use keyMirror to create values equal to the key
var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    PICK_TYPE: null,
    SUBMIT_SEARCH: null,
    LOGIN: null
    GET_HOME: null
    GET_ARTICLE: null
  })
};
