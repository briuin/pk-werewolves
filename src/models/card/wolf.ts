import Card from "../card";
import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

export default class Wolf extends Card {
  constructor() {
    super();
    this.name = "wolf";
    this.roundActionMapping.push({
      round: "roundwolf",
      action: (data: any) => {
        RoundService.showModal(RoundModal.WolfVote, data);
      }
    });
  }
}
