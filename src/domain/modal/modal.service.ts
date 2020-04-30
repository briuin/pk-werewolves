import Modal from './modal.vue';
import { Component } from 'vue';
import { Vue } from 'vue-property-decorator';
import { CombinedVueInstance } from 'vue/types/vue';
import ModalOptions from './modal-option';
import ModalRef from './modal-ref';
import { SweetModal } from 'sweet-modal-vue';

type ComponentInstance = CombinedVueInstance<Record<never, any> & Vue, object, object, object, Record<never, any>>;

class ModalService {
  private openedModal: ModalRef[] = [];
  private vueInstanceOptions: any = {};
  private container!: Element;

  open<T>(modal: Component, options: ModalOptions<T> = {}): ModalRef {
    if (!this.container) {
      throw Error();
    }
    const modalInstance = this.mountModalComponent(options) as SweetModal;
    const contentInstance = this.mountModalContentComponent(modal, options);

    modalInstance.$el.querySelector('.sweet-content')!.appendChild(contentInstance.$el);
    this.container.appendChild(modalInstance.$el);
    const ref = modalInstance.$refs.modal as SweetModal;
    ref.$once('close', () => this.close(modalInstance));
    ref.open();
    contentInstance.$once('close', () => ref.close());
    const modalRef = new ModalRef(modalInstance);
    this.openedModal.push(modalRef);
    return modalRef;
  }

  setContainer(container: Element, options: any) {
    this.container = container;
    this.vueInstanceOptions = options;
  }

  private close(instance: ComponentInstance) {
    this.openedModal.filter((x) => x !== instance);
  }

  private mountModalComponent<T>(options: ModalOptions<T>): ComponentInstance {
    const ModalComponent = Vue.extend(Modal);
    const modalInstance = new ModalComponent();
    (modalInstance as any).setOverlayTheme(options.overlayTheme);
    (modalInstance as any).setWidth(options.width);
    (modalInstance as any).setOverlayCanceling(options.overlayCanceling);
    modalInstance.$mount();

    return modalInstance;
  }

  private mountModalContentComponent<T>(modal: Component, options: any): ComponentInstance {
    const ModalContentComponent = Vue.extend(modal as any);
    const contentInstance = new ModalContentComponent(this.vueInstanceOptions);
    contentInstance.$mount();
    (contentInstance as any).data = options.data || {};

    return contentInstance;
  }
}

const service = new ModalService();

export default service;
