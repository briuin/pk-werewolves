import Wolf from "./card/wolf";
import Card from "./card";
import Folk from "./card/folk";
import Seer from "./card/seer";
import Witch from "./card/witch";

export default class CardFactory {
  static create(card: string) {
    switch (card) {
      case "wolf":
        return new Wolf();
      case "seer":
        return new Seer();
      case "witch":
        return new Witch();
      case "folk":
        return new Folk();
      default:
        return new Card();
    }
  }
}
