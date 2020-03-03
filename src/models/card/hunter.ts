import Card from "../card";
import RoundService from "@/services/round";
import { RoundModal } from "@/enums/round-modal";

export default class Hunter extends Card {
  constructor() {
    super();
    this.name = "hunter";
    this.roundActionMapping.push({
      round: "huntershot",
      action: (data: any) => {
        RoundService.showModal(RoundModal.HunterShot, data);
      }
    });
  }
}
