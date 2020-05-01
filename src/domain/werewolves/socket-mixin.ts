import { Component, Vue } from 'vue-property-decorator';
import GameService from '@/services/game';

@Component({})
export default class SocketMixin extends Vue {
  protected created() {
    this.sockets.werewolves.subscribe('games', (games: any) => {
      GameService.games$.next(games);
    });

    this.sockets.werewolves.subscribe('goto', (gameId: any) => {
      this.$router.push(`/game/${gameId}`);
    });

    this.sockets.werewolves.subscribe('newgame', () => {
      GameService.reset();
    });

    this.sockets.werewolves.subscribe('dead', (data: any) => {
      GameService.beKilled();
    });

    this.sockets.werewolves.subscribe('cards', (data: any) => {
      GameService.setCards(data.cards);
    });

    this.sockets.werewolves.subscribe('gamedetails', (data: any) => {
      if (data.error) {
        this.$router.push('/');
        return;
      }
      if (data.isStarted) {
        GameService.start();
      }
      GameService.peerCard(data.seatNo, data.card);
      GameService.setOwner(data.owner);
      GameService.setCards(data.cards);
    });

    this.sockets.werewolves.subscribe('peercard', (data: any) => {
      GameService.peerCard(data.seatNo, data.card);
    });

    this.sockets.werewolves.subscribe('start', (data: any) => {
      GameService.start();
    });

    this.sockets.werewolves.subscribe('players', (data: any) => {
      GameService.updatePlayers({
        seatedPlayers: data.seatedPlayers,
        players: data.players,
      });
    });

    this.sockets.werewolves.subscribe('round', (data: any) => {
      GameService.card$.value.onRound(data.name, data);
    });

    this.sockets.werewolves.subscribe('info', (data: any) => {
      GameService.title$.next(data.title);
      GameService.time$.next(data.time);
    });
  }
}
