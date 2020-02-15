<template>
  <div class="action-group">
    <Sit />
    <Stand />
    <Ready />
    <Start />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Sit from "@/components/join-action-group/Sit.vue";
import Stand from "@/components/join-action-group/Stand.vue";
import Ready from "@/components/join-action-group/Ready.vue";
import Start from "@/components/join-action-group/Start.vue";

@Component({
  components: {
    Sit,
    Stand,
    Ready,
    Start
  }
})
export default class JoinActionGroup extends Vue {}
</script>

<style lang="scss" scoped>
.action-group {
  > * {
    margin: 0px 5px;
  }
}
</style>
