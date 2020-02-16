import Card from "../card";
import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

export default class Witch extends Card {
  constructor() {
    super();
    this.name = "witch";
    this.roundActionMapping.push({
      round: "witch",
      action: (data: any) => {
        RoundService.showModal(RoundModal.WitchWork, data);
      }
    });
  }
}
