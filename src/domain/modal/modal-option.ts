interface ModalOptions<T> {
  data?: T;
  overlayTheme?: "dark" | "light";
  width?: string;
  overlayCanceling?: boolean;
}

export default ModalOptions;
