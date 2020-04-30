import { BehaviorSubject } from 'rxjs';
import GameState from '@/states/game';
import Card from '@/models/card';
import CardFactory from '@/models/card-factory';
import PlayerService from '@/services/player';
const game = GameState.get();

class GameService {
  public games$ = new BehaviorSubject<any[]>(game.games);
  public card$ = new BehaviorSubject<Card>(game.card);
  public isAlive$ = new BehaviorSubject<boolean>(game.isAlive);
  public isStarted$ = new BehaviorSubject<boolean>(game.isStarted);
  public seatNo$ = new BehaviorSubject<number>(game.seatNo);
  public isOwner$ = new BehaviorSubject<boolean>(game.isOwner);
  public seats$ = new BehaviorSubject<any[]>(game.seats);
  public players$ = new BehaviorSubject<any[]>(game.players);
  public seatedPlayers$ = new BehaviorSubject<any[]>(game.seatedPlayers);
  public assignedCards$ = new BehaviorSubject<any[]>(game.assignedCards);
  public time$ = new BehaviorSubject<number>(game.time);
  public title$ = new BehaviorSubject<string>(game.title);

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

  public start() {
    this.isStarted$.next(true);
  }

  public peerCard(seatNo = 0, card = '') {
    this.card$.next(CardFactory.create(card));
    this.seatNo$.next(seatNo);
  }

  public reset() {
    this.isStarted$.next(game.isStarted);
    this.isAlive$.next(game.isAlive);
    this.seatNo$.next(game.seatNo);
  }
}

const service = new GameService();

export default service;
