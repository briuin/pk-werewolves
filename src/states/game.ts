import Card from "@/models/card";

const state = {
  isStarted: false,
  isAlive: true,
  card: new Card(),
  seatNo: 0,
  isOwner: false,
  seats: [],
  players: [],
  assignedCards: []
};

const service = {
  get() {
    return state;
  }
};

export default service;