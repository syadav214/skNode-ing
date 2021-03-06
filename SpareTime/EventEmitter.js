let events = {};

const EventEmitter = {
  dispatch: (event, data) => {
    if (!events[event]) return;
    events[event].forEach(callback => callback(data));
  },
  subscribe: (event, callback) => {
    if (!events[event]) events[event] = [];
    events[event].push(callback);
  }
};

export default EventEmitter;

// EventEmitter.subscribe('onGetLatestTaskCount', () => this.getTaskCount());
// <button id='test' onClick={() => EventEmitter.dispatch('onGetLatestTaskCount')}  >  Test   </button>
