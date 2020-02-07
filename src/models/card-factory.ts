import Wolf from "./card/wolf";
import Card from "./card";
import Folk from "./card/folk";

export default class CardFactory {
  static create(card: string) {
    switch (card) {
      case "wolf":
        return new Wolf();
      case "folk":
        return new Folk();
      default:
        return new Card();
    }
  }
}
