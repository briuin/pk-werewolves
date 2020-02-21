<template>
  <div class="card-details">
    <v-card-text class="card-slider" v-for="card in cardsToDisplay" :key="`count${card.name}`">
      <v-slider
        :dark="dark"
        v-if="isOwner"
        v-model="card.count"
        append-icon="mdi-plus"
        prepend-icon="mdi-minus"
        @click:append="addCount(card)"
        @click:prepend="minusCount(card)"
        readonly
        :thumb-size="24"
        thumb-label="always"
        :max="card.max"
        :label="card.name"
      ></v-slider>
      <v-slider
        v-else
        :dark="dark"
        v-model="card.count"
        readonly
        :thumb-size="24"
        thumb-label="always"
        :max="card.max"
        :label="card.name"
      ></v-slider>
    </v-card-text>
    <div class="card-content">
      <div class="card-action">
        <v-btn v-if="isOwner" @click="$socket.werewolves.emit('addBot')">新增電腦</v-btn>
        <div>就坐人數： {{ seats.length }}</div>
        <div :class="{ notequal: seats.length !== cardLength }">身份卡數： {{ cardLength }}</div>
      </div>
      <div class="card-pagination">
        <v-btn @click="previousCards" class="mx-2" fab small color="#f5f5f5">
          <v-icon>mdi-less-than</v-icon>
        </v-btn>
        <v-btn @click="nextCards" class="mx-2" fab small color="#f5f5f5">
          <v-icon>mdi-greater-than</v-icon>
        </v-btn>
      </div>
      <div v-if="false" class="card-seat">
        <p class="seat" v-for="(seat, i) in seats" :key="`seat${i}`">{{ i + 1 }} : {{ seat.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameService from "@/services/game";
import PlayerService from "@/services/player";
import { tap } from "rxjs/operators";

@Component({
  subscriptions() {
    return {
      isOwner: GameService.isOwner$,
      seats: GameService.seats$,
      cards: GameService.assignedCards$.pipe(
        tap(cards => {
          (this as any).cards = cards;
          (this as any).cardsCount.forEach((x: any) => {
            const count = cards.filter((c: any) => c === x.name).length;
            x.count = count;
          });
          if ((this as any).cardsCount.length > 0) {
            (this as any).cardsToDisplay = (this as any).cardsCount.slice(0, 3);
          }
        })
      )
    };
  }
})
export default class CardDetails extends Vue {
  @Prop() dark!: boolean;
  seats: any[] = [];
  cardsCount = [
    { name: "wolf", count: 0, max: 10 },
    { name: "folk", count: 0, max: 10 },
    { name: "seer", count: 0, max: 1 },
    { name: "witch", count: 0, max: 1 }
  ];
  currentCardPageStartIndex = 0;

  cardsToDisplay: any[] = [];

  get cardLength() {
    return this.cardsCount.reduce((x, y) => x + y.count, 0);
  }

  addCount(card: any) {
    card.count++;
    this.$socket.werewolves.emit("updateCards", { cards: this.cardsCount });
    this.updateCards();
  }

  minusCount(card: any) {
    card.count--;
    this.$socket.werewolves.emit("updateCards", { cards: this.cardsCount });
    this.updateCards();
  }

  previousCards() {
    if (this.currentCardPageStartIndex <= 0) {
      return;
    }
    this.cardsToDisplay = this.cardsCount.slice(
      this.currentCardPageStartIndex - 3,
      3
    );
    this.currentCardPageStartIndex -= 3;
  }

  nextCards() {
    if (this.cardsCount.length <= this.currentCardPageStartIndex + 3) {
      return;
    }
    this.cardsToDisplay = this.cardsCount.slice(
      this.currentCardPageStartIndex + 3,
      this.currentCardPageStartIndex + 6
    );
    this.currentCardPageStartIndex += 3;
  }

  private updateCards() {
    const cards: string[] = [];
    this.cardsCount.forEach(x => {
      for (let i = 0; i < x.count; i++) {
        cards.push(x.name);
      }
    });

    GameService.setCards(cards);
  }
}
</script>

<style lang="scss">
.card-details {
  padding-top: 24px;
  .card-slider {
    padding: 0px;
  }
  .theme--dark {
    .v-slider__thumb-label span {
      color: #020024;
    }
  }
  .card-seat {
    display: none;
  }

  .card-action {
    .notequal {
      color: red;
    }
  }

  .card-pagination {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  .card-content {
    display: flex;
    flex-direction: row;
  }

  .v-btn {
    margin-bottom: 10px;
  }
  @media (min-width: 769px) {
    color: white;
  }
}

@media (max-width: 768px) {
  .card-details {
    padding-top: 24px;
    .card-slider {
      padding: 0px;
    }

    .card-content {
      display: flex;
      flex-direction: row;
      > * {
        flex-basis: 50%;
        padding: 5px;
      }
      .card-action {
        display: flex;
        flex-direction: column;
      }
      .card-seat {
        display: none;
        flex-direction: column;
        overflow: scroll;
        max-height: 160px;
        .seat {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
