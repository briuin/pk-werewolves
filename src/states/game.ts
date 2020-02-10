import Card from "@/models/card";

const state = {
  isStarted: false,
  isAlive: true,
  card: new Card()
};

const service = {
  get() {
    return state;
  }
};

export default service;
