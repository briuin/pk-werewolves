(function(e){function t(t){for(var n,o,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(d.length)d.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],n=!0,o=1;o<a.length;o++){var i=a[o];0!==s[i]&&(n=!1)}n&&(r.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},o={app:0},s={app:0},r=[];function i(e){return c.p+"js/"+({about:"about",game:"game"}[e]||e)+"."+{about:"d5f5c169",game:"13a67281"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={game:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=new Promise((function(t,a){for(var n="css/"+({about:"about",game:"game"}[e]||e)+"."+{about:"31d6cfe0",game:"7068c2ef"}[e]+".css",s=c.p+n,r=document.getElementsByTagName("link"),i=0;i<r.length;i++){var l=r[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===s))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],u=l.getAttribute("data-href");if(u===n||u===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||s,r=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=n,delete o[e],f.parentNode.removeChild(f),a(r)},f.href=s;var v=document.getElementsByTagName("head")[0];v.appendChild(f)})).then((function(){o[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,a){n=s[e]=[t,a]}));t.push(n[2]=r);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var a=s[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",d.name="ChunkLoadError",d.type=n,d.request=o,a[1](d)}s[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"05c8":function(e,t,a){"use strict";var n=a("7a10"),o=a.n(n);o.a},"0880":function(e,t,a){"use strict";var n=a("146c"),o=a.n(n);o.a},"09b2":function(e,t,a){},"146c":function(e,t,a){},"1fb8":function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e[e["Unknown"]=0]="Unknown",e[e["PeerCard"]=1]="PeerCard",e[e["WolfVote"]=2]="WolfVote",e[e["SeerCheck"]=3]="SeerCheck",e[e["WitchWork"]=4]="WitchWork",e[e["DayBreaks"]=5]="DayBreaks",e[e["Opinion"]=6]="Opinion",e[e["PublicVote"]=7]="PublicVote",e[e["PublicVoteResult"]=8]="PublicVoteResult",e[e["GameOver"]=9]="GameOver"}(n||(n={}))},"2c4a":function(e,t,a){},"33ce":function(e,t,a){"use strict";var n=a("34b3"),o=a.n(n);o.a},"34b3":function(e,t,a){},"3c39":function(e,t,a){"use strict";var n=a("7f3d"),o=a.n(n);o.a},"3ef8":function(e,t,a){},"486e":function(e,t,a){"use strict";var n=a("ddac"),o=a.n(n);o.a},"5c64":function(e,t,a){"use strict";var n=a("dfa5"),o=a.n(n);o.a},"605e":function(e,t,a){},"6bb7":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-form",[a("v-container",{staticClass:"modal-container"},[a("h1",[e._v("狼人請殺人")]),a("v-row",{attrs:{justify:"center"}},[e._l(e.voteOptions,(function(t,n){return a("div",{key:"vote"+n,staticClass:"vote-option",on:{click:function(a){return e.vote(t.no)}}},[e.isWolf(t.no)?a("v-chip",{staticClass:"ma-2",attrs:{color:"pink","text-color":"white"}},[a("v-avatar",{attrs:{left:""}},[e._v(e._s(t.no))]),e._v(" "+e._s(t.player.name)+" ")],1):a("v-chip",{staticClass:"ma-2",attrs:{color:"primary","text-color":"primary",outlined:""}},[a("v-avatar",{attrs:{left:""}},[e._v(e._s(t.no))]),e._v(" "+e._s(t.player.name)+" ")],1),a("span",[e._v(e._s(e.getSeatVoteTexts(t.no)))])],1)})),a("v-col",{ref:"chats",staticClass:"chat-group",attrs:{cols:"12"}},e._l(e.chats,(function(t,n){return a("p",{key:"chat"+n,staticClass:"wolf-chat"},[e._v(e._s(t))])})),0),a("v-col",{staticStyle:{padding:"0"},attrs:{cols:"12"}},[a("v-text-field",{attrs:{"append-outer-icon":"mdi-send",filled:"","clear-icon":"mdi-close-circle",clearable:"",label:"Message",type:"text"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),t.stopPropagation(),e.sendMessage(t))},"click:append-outer":e.sendMessage,"click:clear":e.clearMessage},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}})],1)],2)],1)],1)],1)},o=[],s=(a("4de4"),a("7db0"),a("a15b"),a("d81d"),a("d4ec")),r=a("bee2"),i=a("99de"),c=a("7e84"),l=a("262e"),u=a("9ab4"),d=a("60a3"),f=function(e){function t(){var e;return Object(s["a"])(this,t),e=Object(i["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.wolfVotes=[],e.chats=[],e.message="",e}return Object(l["a"])(t,e),Object(r["a"])(t,[{key:"getSeatVoteTexts",value:function(e){return this.wolfVotes.map((function(e,t){return{wolfNo:t,targetNo:e}})).filter((function(t){return t.targetNo===e})).map((function(e){return e.wolfNo})).join(",")}},{key:"sendMessage",value:function(){this.message&&(this.$socket.werewolves.emit("sendwolftalk",{message:this.message}),this.clearMessage())}},{key:"clearMessage",value:function(){this.message=""}},{key:"isWolf",value:function(e){return this.wolves.find((function(t){return t.no===e}))}},{key:"vote",value:function(e){this.$socket.werewolves.emit("wolfvote",{seatNo:e})}},{key:"created",value:function(){var e=this;this.sockets.werewolves.subscribe("wolfvote",(function(t){e.$set(e.wolfVotes,t.wolfSeatNo,t.targetSeatNo)})),this.sockets.werewolves.subscribe("wolftalk",(function(t){e.chats=t.messages,d["c"].nextTick((function(){e.chatElement&&(e.chatElement.scrollTop=e.chatElement.scrollHeight)}))}))}},{key:"voteOptions",get:function(){return this.seats||[{no:1,player:{name:"2fwafaw22"}},{player:{name:"222gwa"}},{player:{name:"22gwa2"}}]}},{key:"chatElement",get:function(){return this.$refs.chats}},{key:"wolfOptions",get:function(){return this.wolves||[]}}]),t}(d["c"]);u["a"]([Object(d["b"])()],f.prototype,"seats",void 0),u["a"]([Object(d["b"])({default:function(){return[]}})],f.prototype,"wolves",void 0),f=u["a"]([d["a"]],f);var v=f,h=v,m=(a("486e"),a("f669"),a("2877")),p=a("6544"),b=a.n(p),y=a("8212"),g=a("cc20"),w=a("62ad"),k=a("a523"),O=a("4bd4"),_=a("0fd9"),j=a("8654"),C=Object(m["a"])(h,n,o,!1,null,"42dbd48e",null);t["a"]=C.exports;b()(C,{VAvatar:y["a"],VChip:g["a"],VCol:w["a"],VContainer:k["a"],VForm:O["a"],VRow:_["a"],VTextField:j["a"]})},"747c":function(e,t,a){"use strict";var n=a("09b2"),o=a.n(n);o.a},7997:function(e,t,a){"use strict";var n=a("fe3b"),o=a.n(n);o.a},"7a10":function(e,t,a){},"7ee0":function(e,t,a){"use strict";var n=a("3ef8"),o=a.n(n);o.a},"7f3d":function(e,t,a){},"94ea":function(e,t,a){"use strict";var n=a("ccc8"),o=a.n(n);o.a},"9f2a":function(e,t,a){"use strict";a("b0c0");var n=a("d4ec"),o=a("bee2"),s=a("dba1"),r={name:localStorage.getItem("werewolvesname")||""},i={get:function(){return r}},c=i,l=c.get(),u=function(){function e(){Object(n["a"])(this,e),this.name$=new s["a"](l.name)}return Object(o["a"])(e,[{key:"setName",value:function(e){localStorage.setItem("werewolvesname",e),this.name$.next(e)}},{key:"getName",value:function(){return this.name$.value}}]),e}(),d=new u;t["a"]=d},a2d1:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("v-card",{staticClass:"mx-auto",attrs:{tile:""}},[a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.$emit("close")}}},[e._v("Close")])],1),a("v-list",{attrs:{flat:""}},[a("v-subheader",[e._v("遊戲結束: "+e._s(e.title))]),a("v-list-item-group",{attrs:{color:"primary"}},e._l(e.seats,(function(t,n){return a("v-list-item",{key:n},[a("v-list-item-icon",[a("v-icon",{domProps:{textContent:e._s(t.seatNo)}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:e._s(t.seatNo+"號 "+e.getCardText(t.card)+" "+t.playerName)}})],1)],1)})),1)],1)],1)],1)],1)],1)],1)},o=[],s=a("d4ec"),r=a("bee2"),i=a("99de"),c=a("7e84"),l=a("262e"),u=a("9ab4"),d=a("60a3"),f=function(e){function t(){return Object(s["a"])(this,t),Object(i["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(r["a"])(t,[{key:"getCardText",value:function(e){switch(e){case"wolf":return"狼人";case"folk":return"平民";case"seer":return"預言家";case"witch":return"女巫";default:return""}}},{key:"title",get:function(){return this.gameWin?"好人贏了":"狼人贏了"}}]),t}(d["c"]);u["a"]([Object(d["b"])({default:[]})],f.prototype,"seats",void 0),u["a"]([Object(d["b"])()],f.prototype,"gameWin",void 0),f=u["a"]([d["a"]],f);var v=f,h=v,m=(a("94ea"),a("2877")),p=a("6544"),b=a.n(p),y=a("8336"),g=a("b0af"),w=a("99d9"),k=a("62ad"),O=a("a523"),_=a("132d"),j=a("8860"),C=a("da13"),V=a("5d23"),x=a("1baa"),N=a("34c3"),S=a("0fd9"),$=a("2fa4"),M=a("e0c7"),P=Object(m["a"])(h,n,o,!1,null,"6b4e23d6",null);t["a"]=P.exports;b()(P,{VBtn:y["a"],VCard:g["a"],VCardActions:w["a"],VCol:k["a"],VContainer:O["a"],VIcon:_["a"],VList:j["a"],VListItem:C["a"],VListItemContent:V["a"],VListItemGroup:x["a"],VListItemIcon:N["a"],VListItemTitle:V["c"],VRow:S["a"],VSpacer:$["a"],VSubheader:M["a"]})},bc06:function(e,t,a){"use strict";var n=a("d4ec"),o=a("bee2"),s=a("dba1"),r=a("e758"),i={isStarted:!1,isAlive:!0,card:new r["a"],seatNo:0,isOwner:!1,seats:[],players:[],assignedCards:[]},c={get:function(){return i}},l=c,u=(a("b0c0"),a("99de")),d=a("7e84"),f=a("262e"),v=a("fb1c"),h=a("1fb8"),m=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(u["a"])(this,Object(d["a"])(t).call(this)),e.name="wolf",e.roundActionMapping.push({round:"roundwolf",action:function(e){v["a"].showModal(h["a"].WolfVote,e)}}),e}return Object(f["a"])(t,e),t}(r["a"]),p=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(u["a"])(this,Object(d["a"])(t).call(this)),e.name="folk",e}return Object(f["a"])(t,e),t}(r["a"]),b=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(u["a"])(this,Object(d["a"])(t).call(this)),e.name="seer",e.roundActionMapping.push({round:"seer",action:function(e){v["a"].showModal(h["a"].SeerCheck,e)}}),e}return Object(f["a"])(t,e),t}(r["a"]),y=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(u["a"])(this,Object(d["a"])(t).call(this)),e.name="witch",e.roundActionMapping.push({round:"witch",action:function(e){v["a"].showModal(h["a"].WitchWork,e)}}),e}return Object(f["a"])(t,e),t}(r["a"]),g=function(){function e(){Object(n["a"])(this,e)}return Object(o["a"])(e,null,[{key:"create",value:function(e){switch(e){case"wolf":return new m;case"seer":return new b;case"witch":return new y;case"folk":return new p;default:return new r["a"]}}}]),e}(),w=a("9f2a"),k=l.get(),O=function(){function e(){Object(n["a"])(this,e),this.card$=new s["a"](k.card),this.isAlive$=new s["a"](k.isAlive),this.isStarted$=new s["a"](k.isStarted),this.seatNo$=new s["a"](k.seatNo),this.isOwner$=new s["a"](k.isOwner),this.seats$=new s["a"](k.seats),this.players$=new s["a"](k.players),this.assignedCards$=new s["a"](k.assignedCards)}return Object(o["a"])(e,[{key:"beKilled",value:function(){this.isAlive$.next(!1)}},{key:"updatePlayers",value:function(e){var t=e.seatedPlayers,a=e.players;this.seats$.next(t),this.players$.next(a)}},{key:"setOwner",value:function(e){this.isOwner$.next(w["a"].getName()===e)}},{key:"setCards",value:function(e){this.assignedCards$.next(e)}},{key:"start",value:function(){this.isStarted$.next(!0)}},{key:"peerCard",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.card$.next(g.create(t)),this.seatNo$.next(e)}},{key:"reset",value:function(){this.isStarted$.next(k.isStarted),this.isAlive$.next(k.isAlive),this.seatNo$.next(k.seatNo)}}]),e}(),_=new O;t["a"]=_},bc39:function(e,t,a){},ccc8:function(e,t,a){},cd49:function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[e.isGameStarted&&!e.isPlayerAlive?a("v-app-bar",{attrs:{app:"",color:"red",dark:""}},[a("div",{staticClass:"d-flex align-center margin-auto",on:{click:function(t){e.isShowCard=!e.isShowCard}}},[e.isShowCard?a("span",[e.seatNo>0?[e._v(" "+e._s(e.seatNo)+"號 "),e.isShowCard?a("v-icon",[e._v("mdi-eye")]):a("v-icon",[e._v("mdi-eye-off")])]:e._e(),e._v(" "+e._s(e.card.name)+" ")],2):a("span",[e.seatNo>0?[e._v(" "+e._s(e.seatNo)+"號 "),e.isShowCard?a("v-icon",[e._v("mdi-eye")]):a("v-icon",[e._v("mdi-eye-off")])]:e._e(),e._v(" 陣亡 ")],2)])]):e.isGameStarted?a("v-app-bar",{attrs:{app:"",color:"#020024",dark:""}},[a("div",{staticClass:"d-flex align-center margin-auto",on:{click:function(t){e.isShowCard=!e.isShowCard}}},[e.isShowCard?a("span",[e.seatNo>0?[e._v(" "+e._s(e.seatNo)+"號 "),e.isShowCard?a("v-icon",[e._v("mdi-eye")]):a("v-icon",[e._v("mdi-eye-off")])]:e._e(),e._v(" "+e._s(e.card.name)+" ")],2):a("span",[e.seatNo>0?[e._v(" "+e._s(e.seatNo)+"號 "),e.isShowCard?a("v-icon",[e._v("mdi-eye")]):a("v-icon",[e._v("mdi-eye-off")])]:e._e(),e._v(" "+e._s(e.playerName)+" ")],2)])]):a("v-app-bar",{attrs:{app:"",color:"#020024",dark:""}},[a("div",{staticClass:"d-flex align-center"},[a("span",{on:{click:function(t){return e.goToHome()}}},[e._v("狼人殺")])]),a("v-spacer"),e.isHomePage?[e.isGameStarted?a("v-btn",{attrs:{text:""}},[a("span",{staticClass:"mr-2"},[e._v(e._s(e.playerName))])]):a("v-btn",{attrs:{text:""},on:{click:function(t){return e.showCancelableDialog()}}},[a("span",{staticClass:"mr-2"},[e._v(e._s(e.playerName))]),a("v-icon",[e._v("mdi-account-edit")])],1)]:[e.isGameStarted?e._e():a("v-btn",{attrs:{color:"red",text:""},on:{click:function(t){return e.leaveGame()}}},[a("span",{staticClass:"mr-2"},[e._v("退出")])])]],2),a("v-content",[a("router-view")],1),e.showNameDialog?a("NameDialog",{attrs:{options:e.nameDialogOptions},on:{confirm:function(t){return e.setName(t)},cancel:function(t){e.showNameDialog=!1}}}):e._e(),a("Round")],1)},s=[],r=(a("b0c0"),a("d4ec")),i=a("bee2"),c=a("99de"),l=a("7e84"),u=a("262e"),d=a("9ab4"),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-form",[a("v-container",{staticClass:"modal-container"},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-text-field",{attrs:{label:"Your Name",outlined:"","hide-details":""},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.confirm()}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1)],1),a("v-row",[a("v-btn",{staticClass:"ma-2",attrs:{loading:!1,disabled:!1,color:"info"},on:{click:function(t){return e.confirm()}},scopedSlots:e._u([{key:"loader",fn:function(){return[a("span",{staticClass:"custom-loader"},[a("v-icon",{attrs:{light:""}},[e._v("cached")])],1)]},proxy:!0}])},[e._v(" Confirm ")]),e.options.cancelable?a("v-btn",{staticClass:"ma-2",attrs:{loading:!1,disabled:!1,color:"error"},on:{click:function(t){return e.$emit("cancel")}},scopedSlots:e._u([{key:"loader",fn:function(){return[a("span",{staticClass:"custom-loader"},[a("v-icon",{attrs:{light:""}},[e._v("cached")])],1)]},proxy:!0}],null,!1,344498462)},[e._v(" Cancel ")]):e._e()],1)],1)],1)],1)},v=[],h=a("60a3"),m=a("9f2a"),p=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.name=m["a"].getName(),e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"confirm",value:function(){!this.name&&this.name.length>30||this.$emit("confirm",this.name)}}]),t}(h["c"]);d["a"]([Object(h["b"])()],p.prototype,"options",void 0),p=d["a"]([h["a"]],p);var b=p,y=b,g=(a("7997"),a("2877")),w=a("6544"),k=a.n(w),O=a("8336"),_=a("62ad"),j=a("a523"),C=a("4bd4"),V=a("132d"),x=a("0fd9"),N=a("8654"),S=Object(g["a"])(y,f,v,!1,null,"1039f4dc",null),$=S.exports;k()(S,{VBtn:O["a"],VCol:_["a"],VContainer:j["a"],VForm:C["a"],VIcon:V["a"],VRow:x["a"],VTextField:N["a"]});var M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.shouldShow(e.RoundModal.PeerCard)?a("PeerCard",{attrs:{card:e.data.card}}):e._e(),e.shouldShow(e.RoundModal.WolfVote)?a("Wolf",{attrs:{seats:e.data.seats,wolves:e.data.wolves}}):e._e(),e.shouldShow(e.RoundModal.SeerCheck)?a("Seer",{attrs:{seats:e.data.seats}}):e._e(),e.shouldShow(e.RoundModal.GameOver)?a("GameOver",{attrs:{seats:e.data.seats,gameWin:e.data.gameWin},on:{close:function(t){return e.end()}}}):e._e(),e.shouldShow(e.RoundModal.DayBreaks)?a("DayBreaks",{attrs:{diedPlayers:e.data.seatsNo}}):e._e(),e.shouldShow(e.RoundModal.Opinion)?a("Opinion"):e._e(),e.shouldShow(e.RoundModal.PublicVote)?a("PublicVote",{attrs:{seats:e.data.seats}}):e._e(),e.shouldShow(e.RoundModal.PublicVoteResult)?a("PublicVoteResult",{attrs:{diedSeatNos:e.data.diedSeatNos}}):e._e()],1)},P=[],G=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-form",[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("h4",[e._v("請確認身份")])]),a("v-col",[a("h1",[e._v(e._s(e.getCardText()))])])],1)],1)],1)],1)},A=[],R=function(e){function t(){return Object(r["a"])(this,t),Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"getCardText",value:function(){switch(this.card){case"wolf":return"狼人";case"folk":return"平民";case"seer":return"預言家";case"witch":return"女巫";default:return""}}}]),t}(h["c"]);d["a"]([Object(h["b"])()],R.prototype,"card",void 0),R=d["a"]([h["a"]],R);var E=R,T=E,D=(a("747c"),Object(g["a"])(T,G,A,!1,null,"311b71b9",null)),I=D.exports;k()(D,{VCol:_["a"],VContainer:j["a"],VForm:C["a"],VRow:x["a"]});var W=a("6bb7"),B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("h1",[e._v("預言家請查驗")])]),a("br"),e._l(e.seats,(function(t,n){return a("div",{key:"seat"+n,staticClass:"option",class:{selected:e.selectedNo===t.no},on:{click:function(a){return e.check(t.no)}}},[a("v-chip",{staticClass:"ma-2",attrs:{color:"primary","text-color":"primary",outlined:""}},[a("v-avatar",{attrs:{left:""}},[e._v(e._s(t.no))]),e._v(" "+e._s(t.player.name)+" ")],1)],1)})),a("v-col",{attrs:{cols:"12"}},[e._v(e._s(e.result))])],2)],1)],1)},L=[],F=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.text="seer check",e.selectedNo=-1,e.result="",e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"check",value:function(e){-1===this.selectedNo&&(this.selectedNo=e,this.$socket.werewolves.emit("seercheck",{seatNo:e}))}},{key:"created",value:function(){var e=this;this.sockets.werewolves.subscribe("seercheckresult",(function(t){e.result="good"===t.result?"好人":"壞人"}))}}]),t}(h["c"]);d["a"]([Object(h["b"])({default:[]})],F.prototype,"seats",void 0),F=d["a"]([h["a"]],F);var H=F,U=H,q=(a("f5d7"),a("8212")),J=a("cc20"),K=Object(g["a"])(U,B,L,!1,null,"498d945d",null),Y=K.exports;k()(K,{VAvatar:q["a"],VChip:J["a"],VCol:_["a"],VContainer:j["a"],VRow:x["a"]});var z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("h1",[e._v("請發表言論")])]),a("v-col",{ref:"opinions",staticClass:"opinion-group",attrs:{cols:"12"}},e._l(e.myOpinions,(function(t,n){return a("p",{key:"opinion"+n,staticClass:"player-opinion"},[e._v(e._s(t))])})),0),a("v-col",{staticStyle:{padding:"0"},attrs:{cols:"12"}},[a("v-text-field",{attrs:{"append-outer-icon":"mdi-send",filled:"","clear-icon":"mdi-close-circle",clearable:"",label:"Message",type:"text"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),t.stopPropagation(),e.sendMessage(t))},"click:append-outer":e.sendMessage,"click:clear":e.clearMessage},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}})],1),a("v-btn",{on:{click:function(t){return e.skip()}}},[e._v("跳過")])],1)],1)],1)},Q=[],X=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.message="",e.myOpinions=[],e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"skip",value:function(){this.$socket.werewolves.emit("skipopinion")}},{key:"sendMessage",value:function(){this.message&&(this.$socket.werewolves.emit("sendopinion",{message:this.message}),this.clearMessage())}},{key:"clearMessage",value:function(){this.message=""}},{key:"created",value:function(){var e=this;this.sockets.werewolves.subscribe("myopinion",(function(t){e.myOpinions=t.messages,h["c"].nextTick((function(){e.opinions&&(e.opinions.scrollTop=e.opinions.scrollHeight)}))}))}},{key:"opinions",get:function(){return this.$refs.opinions}}]),t}(h["c"]);X=d["a"]([h["a"]],X);var Z=X,ee=Z,te=(a("05c8"),Object(g["a"])(ee,z,Q,!1,null,"7ac16453",null)),ae=te.exports;k()(te,{VBtn:O["a"],VCol:_["a"],VContainer:j["a"],VRow:x["a"],VTextField:N["a"]});var ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-form",[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("h1",[e._v("請投票")])]),a("br"),e._l(e.seats,(function(t,n){return a("div",{key:"seat"+n,staticClass:"option",class:{selected:e.selectedNo===t.no},on:{click:function(a){return e.vote(t.no)}}},[a("v-chip",{staticClass:"ma-2",attrs:{color:"primary","text-color":"primary",outlined:""}},[a("v-avatar",{attrs:{left:""}},[e._v(e._s(t.no))]),e._v(" "+e._s(t.player.name)+" ")],1)],1)}))],2)],1)],1)],1)},oe=[],se=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.text="public vote",e.selectedNo=-1,e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"vote",value:function(e){this.selectedNo=e,this.$socket.werewolves.emit("publicvote",{seatNo:e})}}]),t}(h["c"]);d["a"]([Object(h["b"])({default:[]})],se.prototype,"seats",void 0),se=d["a"]([h["a"]],se);var re=se,ie=re,ce=(a("3c39"),Object(g["a"])(ie,ne,oe,!1,null,"05bc50e1",null)),le=ce.exports;k()(ce,{VAvatar:q["a"],VChip:J["a"],VCol:_["a"],VContainer:j["a"],VForm:C["a"],VRow:x["a"]});var ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-form",[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("h1",[e._v("投票結果")])]),a("v-col",{attrs:{cols:"12"}},[0===e.diedSeatNos.length?a("h4",[e._v("全員棄票")]):1===e.diedSeatNos.length?a("h4",[e._v(e._s(e.diedSeatNos[0])+"號 死了")]):a("h4",[e._v(e._s(e.diedSeatNos.map((function(e){return e+"號"})).join(", "))+" 票數一樣，繼續發表言論")])])],1)],1)],1)],1)},de=[],fe=function(e){function t(){return Object(r["a"])(this,t),Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),t}(h["c"]);d["a"]([Object(h["b"])({default:[]})],fe.prototype,"diedSeatNos",void 0),fe=d["a"]([h["a"]],fe);var ve=fe,he=ve,me=(a("0880"),Object(g["a"])(he,ue,de,!1,null,"37257592",null)),pe=me.exports;k()(me,{VCol:_["a"],VContainer:j["a"],VForm:C["a"],VRow:x["a"]});var be=a("a2d1"),ye=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("v-form",[a("v-container",{staticClass:"modal-container"},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("h1",[e._v("天亮了")])]),a("v-col",{attrs:{cols:"12"}},[a("h4",[e._v(e._s(e.diedPlayers.map((function(e){return e+"號"})).join(", "))+" 死了")])])],1)],1)],1)],1)},ge=[],we=function(e){function t(){return Object(r["a"])(this,t),Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),t}(h["c"]);d["a"]([Object(h["b"])({default:[]})],we.prototype,"diedPlayers",void 0),we=d["a"]([h["a"]],we);var ke=we,Oe=ke,_e=(a("33ce"),Object(g["a"])(Oe,ye,ge,!1,null,"9101a5c4",null)),je=_e.exports;k()(_e,{VCol:_["a"],VContainer:j["a"],VForm:C["a"],VRow:x["a"]});var Ce=a("fb1c"),Ve=a("1fb8"),xe=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.RoundModal=Ve["a"],e.modal=Ve["a"].Unknown,e.data={},e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"shouldShow",value:function(e){return this.modal===e}},{key:"end",value:function(){Ce["a"].clearModal()}},{key:"mounted",value:function(){var e=this;Ce["a"].show$.subscribe((function(t){e.modal=t.modal,e.data=t.data}))}}]),t}(h["c"]);xe=d["a"]([Object(h["a"])({components:{PeerCard:I,Wolf:W["a"],Seer:Y,GameOver:be["a"],DayBreaks:je,Opinion:ae,PublicVote:le,PublicVoteResult:pe}})],xe);var Ne=xe,Se=Ne,$e=Object(g["a"])(Se,M,P,!1,null,null,null),Me=$e.exports,Pe=a("bc06"),Ge=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.playerName="",e.showNameDialog=!e.playerName,e.nameDialogOptions={cancelable:!1},e.isShowCard=!1,e.isHomePage=!1,e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"onUrlChange",value:function(e){this.isHomePage="home"===e.name}},{key:"setName",value:function(e){m["a"].setName(e),this.playerName=e,this.showNameDialog=!1}},{key:"showCancelableDialog",value:function(){this.nameDialogOptions.cancelable=!0,this.showNameDialog=!0}},{key:"leaveGame",value:function(){this.$socket.werewolves.emit("leave"),this.goToHome()}},{key:"goToHome",value:function(){"/"!==this.$route.path&&this.$router.push("/")}},{key:"created",value:function(){var e=this;m["a"].name$.subscribe((function(t){e.playerName=t,e.showNameDialog=!t,e.$socket.werewolves.emit("rejoinSession",{name:t})}))}}]),t}(h["c"]);d["a"]([Object(h["d"])("$route",{immediate:!0,deep:!0})],Ge.prototype,"onUrlChange",null),Ge=d["a"]([Object(h["a"])({components:{NameDialog:$,Round:Me},subscriptions:function(){return{isGameStarted:Pe["a"].isStarted$,isPlayerAlive:Pe["a"].isAlive$,card:Pe["a"].card$,seatNo:Pe["a"].seatNo$}}})],Ge);var Ae=Ge,Re=Ae,Ee=(a("7ee0"),a("5c64"),a("7496")),Te=a("40dc"),De=a("a75b"),Ie=a("2fa4"),We=Object(g["a"])(Re,o,s,!1,null,"28a07ac1",null),Be=We.exports;k()(We,{VApp:Ee["a"],VAppBar:Te["a"],VBtn:O["a"],VContent:De["a"],VIcon:V["a"],VSpacer:Ie["a"]});a("d3b7");var Le=a("8c4f"),Fe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-layout",[a("div",{staticClass:"game-menu"},[a("v-btn",{attrs:{color:"success",disabled:e.isCreatingGame,dark:""},on:{click:function(t){return e.createGame()}}},[e._v("新遊戲")]),e.joinedGame?a("v-btn",{attrs:{color:"error",disabled:e.isCreatingGame,dark:""},on:{click:function(t){return e.backToGame()}}},[e._v("回到遊戲")]):e._e()],1)]),a("GameList",{attrs:{games:e.games,joinedGame:e.joinedGame}})],1)},He=[],Ue=(a("7db0"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-simple-table",{attrs:{"fixed-header":"",height:"300px"},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("房號")]),a("th",{staticClass:"text-left"},[e._v("房主")]),a("th",{staticClass:"text-left"},[e._v("遊戲人數 / 總人數")])])]),a("tbody",e._l(e.games,(function(t){return a("tr",{key:t.id,on:{click:function(a){e.selectedGame=t.id}}},[a("td",[e._v(e._s(t.id))]),a("td",[e._v(e._s(t.owner))]),a("td",[e._v(" "+e._s(t.seats.length)+" / "+e._s(t.players.length)+" "),e.selectedGame!==t.id||e.joinedGame?e._e():a("v-btn",{staticClass:"join-button",attrs:{color:"success",fab:"",dark:"","x-small":""},on:{click:function(a){return e.joinGame(t.id)}}},[a("v-icon",[e._v("mdi-arrow-right-bold-circle")])],1)],1)])})),0)]},proxy:!0}])})}),qe=[],Je=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.selectedGame=null,e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"joinGame",value:function(e){this.games.find((function(t){return t.id===e})).players.find((function(e){return e.name===m["a"].getName()}))?this.$router.push("/game/".concat(e)):this.$socket.werewolves.emit("join",{gameId:e,playerName:m["a"].getName()})}}]),t}(h["c"]);d["a"]([Object(h["b"])()],Je.prototype,"games",void 0),d["a"]([Object(h["b"])()],Je.prototype,"joinedGame",void 0),Je=d["a"]([h["a"]],Je);var Ke=Je,Ye=Ke,ze=(a("d14c"),a("1f4f")),Qe=Object(g["a"])(Ye,Ue,qe,!1,null,"5bbf9fee",null),Xe=Qe.exports;k()(Qe,{VBtn:O["a"],VIcon:V["a"],VSimpleTable:ze["a"]});var Ze=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.isCreatingGame=!1,e.playerName="",e.games=[],e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"backToGame",value:function(){this.$router.push("/game/".concat(this.joinedGame.id))}},{key:"createGame",value:function(){this.isCreatingGame=!0,this.$socket.werewolves.emit("create",{playerName:this.playerName}),this.isCreatingGame=!1}},{key:"created",value:function(){var e=this;m["a"].name$.subscribe((function(t){return e.playerName=t})),this.sockets.werewolves.subscribe("games",(function(t){e.games=t})),this.sockets.werewolves.subscribe("goto",(function(t){e.$router.push("/game/".concat(t))})),this.$socket.werewolves.emit("getGames")}},{key:"joinedGame",get:function(){var e=this;return this.games.find((function(t){return t.players.find((function(t){return t.name===e.playerName}))}))}}]),t}(h["c"]);Ze=d["a"]([Object(h["a"])({components:{GameList:Xe}})],Ze);var et=Ze,tt=et,at=(a("fc01"),a("a722")),nt=Object(g["a"])(tt,Fe,He,!1,null,"6506c474",null),ot=nt.exports;k()(nt,{VBtn:O["a"],VContainer:j["a"],VLayout:at["a"]}),n["a"].use(Le["a"]);var st=[{path:"/",name:"home",component:ot},{path:"/about",name:"about",component:function(){return a.e("about").then(a.bind(null,"f820"))}},{path:"/game/:id",name:"game",component:function(){return a.e("game").then(a.bind(null,"7d36"))}}],rt=new Le["a"]({mode:"history",base:"",routes:st}),it=rt,ct=a("5132"),lt=a.n(ct),ut=a("f309");n["a"].use(ut["a"]);var dt=new ut["a"]({}),ft=a("ce19");n["a"].use(ft["a"]),n["a"].config.productionTip=!1,n["a"].use(new lt.a({connection:"https://pk-center.herokuapp.com/werewolves",options:{useConnectionNamespace:!0},debug:!0})),new n["a"]({router:it,vuetify:dt,render:function(e){return e(Be)}}).$mount("#app")},d14c:function(e,t,a){"use strict";var n=a("605e"),o=a.n(n);o.a},d7e6:function(e,t,a){},ddac:function(e,t,a){},dfa5:function(e,t,a){},e758:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("7db0"),a("b0c0");var n=a("d4ec"),o=a("bee2"),s=a("fb1c"),r=a("1fb8"),i=function(){function e(){Object(n["a"])(this,e),this.name="",this.roundActionMapping=[],this.roundActionMapping.push({round:"peercard",action:function(e){s["a"].showModal(r["a"].PeerCard,e)}},{round:"daybreaks",action:function(e){s["a"].showModal(r["a"].DayBreaks,e)}},{round:"opinion",action:function(e){s["a"].showModal(r["a"].Opinion,e)}},{round:"publicvote",action:function(e){s["a"].showModal(r["a"].PublicVote,e)}},{round:"publicvoteresult",action:function(e){s["a"].showModal(r["a"].PublicVoteResult,e)}},{round:"gameover",action:function(e){s["a"].showModal(r["a"].GameOver,e)}})}return Object(o["a"])(e,[{key:"onRound",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.hasActionInRound(e)?this.doActionInRound(e,t):s["a"].clearModal()}},{key:"hasActionInRound",value:function(e){return!!this.roundActionMapping.find((function(t){return t.round===e}))}},{key:"doActionInRound",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.roundActionMapping.find((function(t){return t.round===e})).action(t)}}]),e}()},f5d7:function(e,t,a){"use strict";var n=a("bc39"),o=a.n(n);o.a},f669:function(e,t,a){"use strict";var n=a("d7e6"),o=a.n(n);o.a},fb1c:function(e,t,a){"use strict";var n=a("d4ec"),o=a("bee2"),s=a("dba1"),r={name:""},i={get:function(){return r}},c=i,l=a("1fb8"),u=(c.get(),function(){function e(){Object(n["a"])(this,e),this.show$=new s["a"]({modal:l["a"].Unknown,data:{}})}return Object(o["a"])(e,[{key:"showModal",value:function(e,t){this.show$.next({modal:e,data:t})}},{key:"clearModal",value:function(){this.show$.next({modal:l["a"].Unknown,data:{}})}}]),e}()),d=new u;t["a"]=d},fc01:function(e,t,a){"use strict";var n=a("2c4a"),o=a.n(n);o.a},fe3b:function(e,t,a){}});
//# sourceMappingURL=app.631720b1.js.map