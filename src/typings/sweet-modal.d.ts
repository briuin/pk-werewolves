declare module "sweet-modal-vue" {
  import Vue from "vue";
  class SweetModal extends Vue {
    open(tab?: string): void;
    close(): void;
  }

  // tslint:disable-next-line:max-classes-per-file
  class SweetModalTab extends Vue {
    open(tab?: string): void;
    close(): void;
  }

  export { SweetModal, SweetModalTab };
}
