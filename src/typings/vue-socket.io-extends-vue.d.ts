import Vue from 'vue';
import SocketIO from "socket.io";

interface SocketNamespace {
	[thingName: string]: SocketIO.Server
}

interface SocketSubscriptions {
  subscribe: (event: string, response: Function) => any;
  unsubscribe: (event: string, response: Function) => any;
}

interface SocketSubscriptionsNamespace {
  [thingName: string]: SocketSubscriptions
}

declare module 'vue/types/vue' {
  interface Vue {
	sockets: SocketSubscriptionsNamespace;
	$socket: SocketNamespace;
  }
}

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		socket?: any;
	}
}
