<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <v-col cols="12">
            <h1>投票結果</h1>
          </v-col>
          <v-col cols="12">
            <h4 v-if="diedSeatNos.length === 0">全員棄票</h4>
            <h4 v-else-if="diedSeatNos.length === 1">{{ diedSeatNos[0] }}號 淘汰</h4>
            <h4 v-else-if="isSecondVote">{{ diedSeatNos.map(x => `${x}號`).join(", ") }} 淘汰</h4>
            <h4 v-else>{{ diedSeatNos.map(x => `${x}號`).join(", ") }} 票數一樣，繼續發表言論</h4>
          </v-col>
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
  @Prop() isSecondVote!: boolean;
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
    text-align: center;
  }
}
</style>
