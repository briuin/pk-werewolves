import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

export default class Card {
  public name = "";
  protected roundActionMapping: { round: string; action: Function }[] = [];

  constructor() {
    this.roundActionMapping.push(
      {
        round: "peercard",
        action: (data: any) => {
          RoundService.showModal(RoundModal.PeerCard, data);
        }
      },
      {
        round: "daybreaks",
        action: (data: any) => {
          RoundService.showModal(RoundModal.DayBreaks, data);
        }
      },
      {
        round: "opinion",
        action: (data: any) => {
          RoundService.showModal(RoundModal.Opinion, data);
        }
      },
      {
        round: "publicvote",
        action: (data: any) => {
          RoundService.showModal(RoundModal.PublicVote, data);
        }
      },
      {
        round: "publicvoteresult",
        action: (data: any) => {
          RoundService.showModal(RoundModal.PublicVoteResult, data);
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
    return !!this.roundActionMapping.find(x => x.round === round);
  }

  protected doActionInRound(round: String, data = {}): boolean {
    return this.roundActionMapping.find(x => x.round === round)!.action(data);
  }
}
