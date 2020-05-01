<template>
  <div class="overlay">
    <v-form>
      <v-container class="modal-container">
        <v-row justify="center">
          <v-col cols="12">
            <h4>請確認身份</h4>
          </v-col>
          <v-col>
            <h1>{{ $t(`card.${card}`) }}</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/models/card';

@Component
export default class PeerCard extends Vue {
  @Prop() card!: string;
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
    width: 280px;
    background: white;
    padding: 20px 35px;
    text-align: center;
  }
}
</style>
