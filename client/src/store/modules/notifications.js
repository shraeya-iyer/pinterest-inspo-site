import axios from "axios";

const state = {
  notifications: {
    notifications: [],
    notificationCounter: 0
  },
  pins: [],
  boards: [],
  show: false
};

const mutations = {
  setNotifications(state, notifications) {
    state.notifications.notifications = [];
    notifications.notifications.forEach(n => {
      if (typeof n.data == "undefined") {
        n.pins = true;
        state.notifications.notifications.push(n);
      } else {
        n.pins = false;
        state.notifications.notifications.push(n.data);
      }
    });
    state.notifications.notifications.reverse();
    state.notifications.notificationCounter = notifications.notificationCounter;
  },
  setPins(state, pins) {
    state.pins = pins;
  },
  setBoards(state, boards) {
    state.boards = boards;
  },
  alterShow(state, show) {
    if (show == false) state.show = show;
    else state.show = !state.show;
  }
};

const actions = {
  getNotifications({ commit }) {
    axios
      .get("notifications/me")
      .then(response => {
        commit("setNotifications", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  notifyUser({ dispatch }) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get("me/boardsForYou");
    axios.get("me/pinsForYou");
    axios.get("me/popularPins");
    axios.get("me/pinsRecentActivity");
    dispatch("getNotifications");
  },
  resetCounter({ state }) {
    axios
      .put("me/update-notification-counter")
      .then(() => {
        state.notifications.notificationCounter = 0;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  notifications: state => state.notifications,
  pins: state => state.pins,
  boards: state => state.boards,
  show: state => state.show
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};