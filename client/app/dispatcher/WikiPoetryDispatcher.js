var Dispatcher = require('flux').Dispatcher;

var WikiDispatcher = new Dispatcher;

// // Convenience method to handle dispatch requests
// WikiDispatcher.handleAction = function(action) {
//   this.dispatch({
//     source: 'VIEW_ACTION',
//     action: action
//   });
// }

module.exports = WikiDispatcher;
