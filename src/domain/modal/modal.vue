<template>
  <sweet-modal
    ref="modal"
    :blocking="!_overlayCanceled"
    :overlay-theme="_overlayTheme"
    hide-close-button
    :enable-mobile-fullscreen="false"
  >
    <i class="close-btn icon-close" @click="$refs.modal.close()"></i>
  </sweet-modal>
</template>

<script lang="ts">
import { SweetModal } from "sweet-modal-vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    SweetModal,
  },
})
export default class Modal extends Vue {
  private _overlayTheme = "dark";
  private _width = "500px";
  private _overlayCanceled = false;

  setOverlayTheme(theme: "light" | "dark" = "dark") {
    this._overlayTheme = theme;
  }

  setWidth(width: string = "500px") {
    this._width = width;
  }

  setOverlayCanceling(isCanceled: boolean = false) {
    this._overlayCanceled = isCanceled;
  }
}
</script>
<style scoped lang="scss">
.close-btn {
  position: absolute;
  top: -15px;
  right: 10px;
  z-index: 1;
  cursor: pointer;
  width: 34px;
  height: 34px;
  font-size: 34px;
  color: #ccc;
}
</style>
<style>
#app .sweet-modal {
  border-radius: 0;
  max-width: 500px;
}

#app .sweet-modal.sweet-modal {
  width: auto;
}

#app .sweet-modal-overlay.theme-dark {
  background: rgba(0, 0, 0, 0.6);
}

#app .sweet-modal.is-alert .sweet-content {
  padding: 0;
}
</style>
