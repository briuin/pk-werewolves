<template>
  <v-chip class="ma-2 seat-chip" :color="getColor" :text-color="getTextColor" :outlined="outlined">
    <v-avatar left v-if="no">{{ no }}</v-avatar>
    {{ name }}
  </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SeatChip extends Vue {
  @Prop() no!: number;
  @Prop() name!: string;
  @Prop() wolf!: boolean;

  get getColor() {
    return this.wolf ? 'pink' : 'primary';
  }

  get getTextColor() {
    return this.wolf ? 'white' : 'primary';
  }

  get outlined() {
    return !this.wolf;
  }
}
</script>

<style lang="scss">
@media (max-width: 768px) {
  .seat-chip.v-chip .v-chip__content {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 2;
  }
}
</style>
