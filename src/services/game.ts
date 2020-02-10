import { BehaviorSubject } from "rxjs";
import GameState from "@/states/game";
import Card from "@/models/card";
import CardFactory from "@/models/card-factory";
const game = GameState.get();

class PlayerService {
  public card$ = new BehaviorSubject<Card>(game.card);
  public isAlive$ = new BehaviorSubject<boolean>(game.isAlive);
  public isStarted$ = new BehaviorSubject<boolean>(game.isStarted);

  public beKilled() {
    this.isAlive$.next(false);
  }

  public start(card = "") {
    this.isStarted$.next(true);
    this.card$.next(CardFactory.create(card));
  }

  public reset() {
    this.isStarted$.next(game.isStarted);
    this.isAlive$.next(game.isAlive);
  }
}

const service = new PlayerService();

export default service;
