import { Subject } from "rxjs";
import Vue from "vue";
import { CombinedVueInstance } from "vue/types/vue";
import { SweetModal } from "sweet-modal-vue";

// tslint:disable-next-line:max-line-length
type ComponentInstance = CombinedVueInstance<
  Record<never, any> & Vue,
  object,
  object,
  object,
  Record<never, any>
>;

class ModalRef {
  private closedSubject = new Subject();
  constructor(private instance: ComponentInstance) {}

  get closed$() {
    return this.closedSubject.asObservable();
  }
  private get modal() {
    return this.instance.$refs.modal as SweetModal;
  }

  private get modalBody() {
    return this.modal.$refs.content as Vue;
  }

  close() {
    this.modal.close();
    this.closedSubject.next();
  }

  on(event: string, callback: (...param: any) => void = () => {}) {
    this.modalBody.$on(event, callback);
  }
}

export default ModalRef;
