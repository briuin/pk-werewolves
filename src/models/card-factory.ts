import Wolf from "./card/wolf";
import Card from "./card";
import Folk from "./card/folk";
import Seer from "./card/seer";
import Witch from "./card/witch";
import Hunter from "./card/hunter";

export default class CardFactory {
  static create(card: string) {
    switch (card) {
      case "wolf":
        return new Wolf();
      case "seer":
        return new Seer();
      case "witch":
        return new Witch();
      case "hunter":
        return new Hunter();
      case "folk":
        return new Folk();
      default:
        return new Card();
    }
  }
}
