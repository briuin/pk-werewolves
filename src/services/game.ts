import { BehaviorSubject } from "rxjs";
import GameState from "@/states/game";
import Card from "@/models/card";
import CardFactory from "@/models/card-factory";
import PlayerService from "@/services/player";
const game = GameState.get();

class GameService {
  public card$ = new BehaviorSubject<Card>(game.card);
  public isAlive$ = new BehaviorSubject<boolean>(game.isAlive);
  public isStarted$ = new BehaviorSubject<boolean>(game.isStarted);
  public seatNo$ = new BehaviorSubject<number>(game.seatNo);
  public isOwner$ = new BehaviorSubject<boolean>(game.isOwner);
  public seats$ = new BehaviorSubject<any[]>(game.seats);
  public players$ = new BehaviorSubject<any[]>(game.players);
  public assignedCards$ = new BehaviorSubject<any[]>(game.assignedCards);

  public beKilled() {
    this.isAlive$.next(false);
  }

  public updatePlayers({ seatedPlayers, players }: any) {
    this.seats$.next(seatedPlayers);
    this.players$.next(players);
  }

  public setOwner(name: string) {
    this.isOwner$.next(PlayerService.getName() === name);
  }

  public setCards(cards: any[]) {
    this.assignedCards$.next(cards);
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
    this.isOwner$.next(game.isOwner);
    this.seats$.next([]);
  }
}

const service = new GameService();

export default service;
