import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

export default class Card {
  public name = "";
  protected roundModalMapping: { round: string; action: Function }[] = [];

  constructor() {
    this.roundModalMapping.push(
      {
        round: "daybreaks",
        action: (data: any) => {
          RoundService.showModal(RoundModal.DayBreaks, data);
        }
      },
      {
        round: "gameover",
        action: (data: any) => {
          RoundService.showModal(RoundModal.GameOver, data);
        }
      }
    );
  }

  public onRound(round: string, data = {}) {
    if (!this.hasActionInRound(round)) {
      RoundService.clearModal();
      return;
    }
    this.doActionInRound(round, data);
  }

  protected hasActionInRound(round: String): boolean {
    return !!this.roundModalMapping.find(x => x.round === round);
  }

  protected doActionInRound(round: String, data = {}): boolean {
    return this.roundModalMapping.find(x => x.round === round)!.action(data);
  }
}
