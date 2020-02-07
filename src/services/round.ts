import { BehaviorSubject } from "rxjs";
import RoundState from "@/states/round";
import { RoundModal } from "@/enums/round-modal";
const round = RoundState.get();

class RoundService {
  public show$ = new BehaviorSubject<{ modal: RoundModal; data: any }>({
    modal: RoundModal.Unknown,
    data: {}
  });

  public showModal(modal: RoundModal, data: any) {
    this.show$.next({ modal, data });
  }

  public clearModal() {
    this.show$.next({ modal: RoundModal.Unknown, data: {} });
  }
}

const service = new RoundService();

export default service;
