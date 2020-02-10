import Card from "../card";
import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

export default class Seer extends Card {
  constructor() {
    super();
    this.name = "seer";
    this.roundActionMapping.push({
      round: "seer",
      action: (data: any) => {
        RoundService.showModal(RoundModal.SeerCheck, data);
      }
    });
  }
}
