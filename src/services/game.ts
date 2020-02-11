import { BehaviorSubject } from "rxjs";
import GameState from "@/states/game";
import Card from "@/models/card";
import CardFactory from "@/models/card-factory";
const game = GameState.get();

class PlayerService {
  public card$ = new BehaviorSubject<Card>(game.card);
  public isAlive$ = new BehaviorSubject<boolean>(game.isAlive);
  public isStarted$ = new BehaviorSubject<boolean>(game.isStarted);
  public seatNo$ = new BehaviorSubject<number>(game.seatNo);

  public beKilled() {
    this.isAlive$.next(false);
  }

  public start(seatNo = 0, card = "") {
    this.isStarted$.next(true);
    this.card$.next(CardFactory.create(card));
    this.seatNo$.next(seatNo);
  }

  public reset() {
    this.isStarted$.next(game.isStarted);
    this.isAlive$.next(game.isAlive);
    this.seatNo$.next(game.seatNo);
  }
}

const service = new PlayerService();

export default service;
