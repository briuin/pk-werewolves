export interface ModalEvent {
  cancelable: boolean;
  showCloseButton?: boolean;
  body?: ModalBody;
}

export interface ModalBody {
  titles?: string[] | string;
  contents?: string[] | string;
  button?: ModalButton;
  extra?: any;
}

export interface ModalButton {
  text?: string;
}
