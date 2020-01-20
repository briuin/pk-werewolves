const state = {
  name: localStorage.getItem("werewolvesname") || ""
};

const service = {
  get() {
    return state;
  }
};

export default service;
