import { BehaviorSubject } from "rxjs";
import PlayerState from "@/states/player";
const player = PlayerState.get();

class PlayerService {
  public name$ = new BehaviorSubject<string>(player.name);

  constructor() {}

  public setName(name: string) {
    localStorage.setItem("werewolvesname", name);
    this.name$.next(name);
  }
}

const service = new PlayerService();

export default service;
