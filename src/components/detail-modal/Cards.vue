<template>
  <div class="overlay" @click="$emit('close')">
    <v-form>
      <v-container class="modal-container" @click.prevent.stop>
        <CardDetails />
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CardDetails from "@/components/CardDetails.vue";

@Component({
  components: {
    CardDetails
  }
})
export default class PlayersDetails extends Vue {}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    z-index: 3001;
    width: 300px;
    background: white;
  }
}
</style>
