<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <v-card class="mx-auto" max-width="300" tile>
            {{ text }}
            <br />
            <p v-if="diedSeatNos.length === 0">全員棄票</p>
            <p v-else-if="diedSeatNos.length === 1">{{ diedSeatNos[0] }} 死了</p>
            <p v-else>{{ diedSeatNos.join(", ") }} 票數一樣，繼續發表言論</p>
          </v-card>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PublicVoteResult extends Vue {
  @Prop({ default: [] }) diedSeatNos!: number[];
  text = "public vote result";
}
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
    max-width: 280px;
    background: white;
    padding: 20px 35px;
  }
}
</style>
