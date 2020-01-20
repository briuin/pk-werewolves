<template>
  <v-container></v-container>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Game extends Vue {
  id;
  name;
}
</script>
