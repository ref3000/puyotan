(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(36)},16:function(e,t,a){},18:function(e,t,a){},20:function(e,t,a){},34:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(7),o=(a(16),a(18),function(){return i.a.createElement("div",{className:"AppHeader"},i.a.createElement("div",{className:"AppHeader-title"},"\u3077\u3088\u305f\u3093\u03b2"),i.a.createElement("div",{className:"AppHeader-version"},"v0.1"))}),r=a(1),c=a(2),l=a(9),u=a(8),h=a(10),d=(a(20),function(){function e(t){Object(r.a)(this,e),this.y=null==t?2147483647*Math.random():t}return Object(c.a)(e,[{key:"setSeed",value:function(e){this.y=e}},{key:"next",value:function(){return this.y=this.y^this.y<<13,this.y=this.y^this.y>>17,this.y=this.y^this.y<<15,this.y>>>0}},{key:"nextInt",value:function(e){return Math.abs(this.next())%e}}]),e}()),m={BRANK:0,RED:1,GREEN:2,BLUE:3,YELLOW:4,PURPLE:5,IRON:6,OJAMA:7,WALL:8,PEKE:9},f=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m.BRANK,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m.BRANK;Object(r.a)(this,e),this.axis=t,this.sub=a},y=function(){function e(t){Object(r.a)(this,e),this.init(t)}return Object(c.a)(e,[{key:"init",value:function(e){null==e&&(e=new d),this._random=e,this._size=1e3,this._puyos=[];for(var t=0;t<this._size;t++)this._puyos.push(new f(this._nextKind(),this._nextKind()))}},{key:"size",value:function(){return this._size}},{key:"get",value:function(e){return this._puyos[e%this._size]}},{key:"edit",value:function(e,t,a){e>=this._size||e<0||(a?this._puyos[e].axis=t:this._puyos[e].sub=t)}},{key:"_nextKind",value:function(){switch(this._random.nextInt(4)){case 0:return m.RED;case 1:return m.GREEN;case 2:return m.BLUE;case 3:return m.YELLOW;default:throw new Error("unexpected error")}}}]),e}(),v=function e(t,a){Object(r.a)(this,e),this.x=isNaN(t)?0:t,this.y=isNaN(a)?0:a},p=function(){function e(){Object(r.a)(this,e),this.height=13,this.width=6,this._field=[];for(var t=0;t<this.height+1;t++){for(var a=[],n=0;n<this.width;n++)a.push(m.BRANK);this._field.push(a)}}return Object(c.a)(e,[{key:"isBrank",value:function(e){return this.get(e)===m.BRANK}},{key:"get",value:function(e){return e.y<1||e.x<1||e.x>this.width?m.WALL:e.y>this.height?m.BRANK:this._field[e.y-1][e.x-1]}},{key:"set",value:function(e,t){e.y<1||e.y>this.height+1||e.x<1||e.x>this.width||(this._field[e.y-1][e.x-1]=t)}},{key:"setAndFall",value:function(e,t){if(e<1||e>this.width)throw RangeError("out of field.");this.isBrank(new v(e,13))&&(this.set(new v(e,13),t),this.fall())}},{key:"fall",value:function(){for(var e=!1,t=1;t<=this.width;t++)for(var a=1,n=1;n<=this.height+1;n++){var i=this.get(new v(t,n));i!==m.BRANK&&(i!==m.WALL?(this.set(new v(t,n),this.get(new v(t,a))),this.set(new v(t,a),i),a!==n&&(e=!0),a++):a=n+1)}for(var s=1;s<=this.width;s++)this.set(new v(s,14),m.BRANK);return e}},{key:"canFall",value:function(){for(var e=1;e<=this.width;e++)for(var t=2;t<=this.height;t++)if(this.isBrank(new v(e,t-1))&&!this.isBrank(new v(e,t))&&this.get(new v(e,t))!==m.WALL)return!0;return!1}},{key:"_countConnection",value:function(e,t,a){return this.get(e)===m.IRON?0:this.get(e)===m.PEKE?0:this.get(e)===m.WALL?0:this.get(e)===m.BRANK?0:this.get(e)===m.OJAMA?0:this.get(e)!==t?0:a.get(e)!==m.BRANK?0:e.y>=13?0:(a.set(e,t),this._countConnection(new v(e.x,e.y+1),t,a)+this._countConnection(new v(e.x+1,e.y),t,a)+this._countConnection(new v(e.x,e.y-1),t,a)+this._countConnection(new v(e.x-1,e.y),t,a)+1)}},{key:"countConnection",value:function(t){return this._countConnection(t,this.get(t),new e)}},{key:"_deleteConnection",value:function(e,t){return this.get(e)===m.BRANK?0:this.get(e)===m.OJAMA?(this.set(e,m.BRANK),0):this.get(e)!==t?0:e.y>=13?0:(this.set(e,m.BRANK),this._deleteConnection(new v(e.x,e.y+1),t)+this._deleteConnection(new v(e.x+1,e.y),t)+this._deleteConnection(new v(e.x,e.y-1),t)+this._deleteConnection(new v(e.x-1,e.y),t)+1)}},{key:"deleteConnection",value:function(e){return this._deleteConnection(e,this.get(e))}},{key:"canFire",value:function(){for(var t=new e,a=1;a<this.height;a++)for(var n=1;n<=this.width;n++){var i=new v(n,a);if(this._countConnection(i,this.get(i),t)>=4)return!0}return!1}},{key:"stepFire",value:function(){for(var t=new function e(){Object(r.a)(this,e),this.num=0,this.connections=[],this.color=0},a=new e,n={},i=1;i<this.height;i++)for(var s=1;s<=this.width;s++){var o=new v(s,i),c=this.get(o),l=this._countConnection(o,c,a);l>=4&&(this.deleteConnection(o),t.num+=l,t.connections.push(l),n[c]=!0)}return t.color=Object.keys(n).length,t}},{key:"Height",value:function(){return this.height}},{key:"Width",value:function(){return this.width}},{key:"copy",value:function(){for(var t=new e,a=1;a<=this.height;a++)for(var n=1;n<=this.width;n++){var i=new v(n,a);t.set(i,this.get(i))}return t}},{key:"equal",value:function(e){for(var t=1;t<=this.height;t++)for(var a=1;a<=this.width;a++){var n=new v(a,t);if(this.get(n)!==e.get(n))return!1}return!0}},{key:"isAllClear",value:function(){for(var e=1;e<=this.height;e++)for(var t=1;t<=this.width;t++){var a=new v(t,e);if(this.get(a)!==m.BRANK)return!1}return!0}},{key:"map",value:function(e){for(var t=[],a=1;a<=this.height;a++)for(var n=1;n<=this.width;n++){var i=new v(n,a),s=this.get(i);t.push(e(i,s))}return t}},{key:"toString",value:function(){var e=this.copy()._field;return e.reverse(),e.map(function(e){return e.join(",")}).join("\n")}}]),e}(),P={Kind:m,Pos:v,Next:y,Field:p,PuyoPair:f},A={PASS:0,PUT:1,CHAIN:2,CHAIN_FALL:3,OJAMA:4},w=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A.PASS,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;Object(r.a)(this,e),this.type=t,this.x=a,this.dir=n},g=function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(r.a)(this,e),this.action=t,this.remainingFrame=a},x=function(){function e(t){Object(r.a)(this,e),this.field=new P.Field,this.actionHistories=[],this.activeNextPos=0,this.score=0,this.usedScore=0,this.nonActiveOjama=0,this.activeOjama=0,this.chain=0,this.random=t}return Object(c.a)(e,[{key:"fallOjama",value:function(e){for(;e>0;)if(e>=6){for(var t=1;t<=6;t++)this.field.setAndFall(t,P.Kind.OJAMA);e-=6}else{for(var a=[!1,!1,!1,!1,!1,!1],n=0;n<e;n++)for(var i=this.random.nextInt(6-n),s=0,o=0;o<6;o++)a[o]||s++===i&&(a[o]=!0);for(var r=1;r<=6;r++)a[r-1]&&this.field.setAndFall(r,P.Kind.OJAMA);e=0}}}]),e}(),k={Puyotan:function(){function e(t){Object(r.a)(this,e),this.random=new d(t),this.next=new P.Next(this.random),this.players=[new x(this.random),new x(this.random)],this.frame=0,this.gameStatusText="\u5f85\u6a5f\u4e2d"}return Object(c.a)(e,[{key:"getPlayer",value:function(e){return this.players[e]}},{key:"start",value:function(){0===this.frame&&(this.frame++,this.gameStatusText="\u5bfe\u6226\u4e2d")}},{key:"setAction",value:function(e,t){if(this.frame<=0)return!1;if(null==this.players[e].actionHistories[this.frame])switch(t.type){case A.PASS:return this.players[e].actionHistories[this.frame]=new g(t,0),!0;case A.PUT:return this.players[e].actionHistories[this.frame]=new g(t,1),!0;default:throw new Error("unsupported action type.")}return!1}},{key:"canStepNextFrame",value:function(){var e=this;return!(this.frame<=0)&&this.players.every(function(t){return null!=t.actionHistories[e.frame]})}},{key:"stepNextFrame",value:function(){var e=this;if(!this.canStepNextFrame())return console.error("can not step next frame.");this.players.forEach(function(t,a){var n=t.actionHistories[e.frame];n.remainingFrame>0&&(t.actionHistories[e.frame+1]=new g(n.action,n.remainingFrame-1))}),this.players.forEach(function(t,a){var n=t.actionHistories[e.frame];if(0===n.remainingFrame)switch(n.action.type){case A.PASS:break;case A.PUT:var i=e.next.get(t.activeNextPos),s=n.action.x,o=n.action.dir;switch(o){case 0:t.field.setAndFall(s,i.axis),t.field.setAndFall(s,i.sub);break;case 1:t.field.setAndFall(s,i.axis),t.field.setAndFall(s+1,i.sub);break;case 2:t.field.setAndFall(s,i.sub),t.field.setAndFall(s,i.axis);break;case 3:t.field.setAndFall(s,i.axis),t.field.setAndFall(s-1,i.sub);break;default:throw Error("unsupported direction range or type. ".concat(o))}t.field.canFire()&&(t.chain=0,t.actionHistories[e.frame+1]=new g(new w(A.CHAIN),1));break;case A.CHAIN:var r=t.field.stepFire();t.chain++,t.score+=e.calcScore(r.num,r.color,r.connections,t.chain);var c=Math.floor((t.score-t.usedScore)/70);if(t.usedScore+=70*c,t.nonActiveOjama>0){var l=Math.min(c,t.nonActiveOjama);t.nonActiveOjama-=l,c-=l}if(t.activeOjama>0){var u=Math.min(c,t.activeOjama);t.activeOjama-=u,c-=u}c>0&&e.sendOjama(a,c),t.field.isAllClear()&&(t.score+=2100),t.field.canFall()?t.actionHistories[e.frame+1]=new g(new w(A.CHAIN_FALL),0):e.activeOjama(a);break;case A.CHAIN_FALL:if(!t.field.canFall())throw new Error("failed to fall puyo.");t.field.fall(),t.field.canFire()?t.actionHistories[e.frame+1]=new g(new w(A.CHAIN),1):e.activeOjama(a);break;case A.OJAMA:if(t.activeOjama<=0)throw new Error("failed to fall ojama.");var h=Math.min(t.activeOjama,30);t.activeOjama-=h,t.fallOjama(h);break;default:throw new Error("unsupported action type.")}});var t=0,a=0;this.players.forEach(function(n,i){null==n.actionHistories[e.frame+1]&&n.field.get(new P.Pos(3,12))!==P.Kind.BRANK||(t++,a=i)}),0===t&&(this.gameStatusText="\u5f15\u304d\u5206\u3051\u2026"),1===t&&(this.gameStatusText="Player ".concat(a+1," \u306e\u52dd\u5229\uff01")),this.players.forEach(function(t,a){t.actionHistories[e.frame].action.type!==A.OJAMA&&null==t.actionHistories[e.frame+1]&&t.activeOjama>0&&(t.actionHistories[e.frame+1]=new g(new w(A.OJAMA),0))}),this.players.forEach(function(t,a){var n=t.actionHistories[e.frame],i=t.actionHistories[e.frame+1];n.action.type!==A.PASS&&null==i&&t.activeNextPos++}),this.frame++}},{key:"calcScore",value:function(e,t,a,n){var i=[0,2,3,4,5,6,7,10],s=10*e,o=[0,8,16,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512][n-1];void 0===o&&(o=512),o+=[0,3,6,12,24][t-1];for(var r=0;r<a.length;r++){var c=a[r];o+=c>11?10:i[c-4]}return 0===o&&(o=1),s*o}},{key:"sendOjama",value:function(e,t){this.players.forEach(function(a,n){n!==e&&(a.nonActiveOjama+=t)})}},{key:"activeOjama",value:function(e){this.players.forEach(function(t,a){a!==e&&(t.activeOjama+=t.nonActiveOjama,t.nonActiveOjama=0)})}},{key:"getViewModel",value:function(){var e=this;return{frame:this.frame,players:this.players.map(function(t){return{activePair:0===e.frame?new P.PuyoPair:e.next.get(t.activeNextPos),next1:0===e.frame?e.next.get(0):e.next.get(t.activeNextPos+1),next2:0===e.frame?e.next.get(1):e.next.get(t.activeNextPos+2),field:t.field,actionHistories:t.actionHistories,chain:t.chain,score:t.score,usedScore:t.usedScore,nonActiveOjama:t.nonActiveOjama,activeOjama:t.activeOjama}}),gameStatusText:this.gameStatusText}}}]),e}(),Action:w,ActionType:A,Player:x},b=a(4),N=a.n(b);a(29);N.a.initializeApp({apiKey:"AIzaSyDNckvdwFU9B-Xg3YPY-tgsrj09kg0MTxE",authDomain:"puyotan-be458.firebaseapp.com",databaseURL:"https://puyotan-be458.firebaseio.com",projectId:"puyotan-be458",storageBucket:"puyotan-be458.appspot.com",messagingSenderId:"1067679324903"});var E=N.a.firestore();E.settings({timestampsInSnapshots:!0});var C=function(e){function t(e){var a,n,i;Object(r.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).puyotan=new k.Puyotan,a.state={activePair1:new P.PuyoPair,activePair2:new P.PuyoPair,field1:new P.Field,field2:new P.Field,next11:new P.PuyoPair,next12:new P.PuyoPair,next21:new P.PuyoPair,next22:new P.PuyoPair,frame:0,actionHistories1:[],actionHistories2:[],chain1:0,chain2:0,score1:0,score2:0,usedScore1:0,usedScore2:0,nonActiveOjama1:0,nonActiveOjama2:0,activeOjama1:0,activeOjama2:0,gameStatusText:"\u521d\u671f\u5316\u5f85\u3061",controledPos1:0,controledDir1:0,controledPos2:0,controledDir2:0,isControlledPlayer1:!1,isControlledPlayer2:!1,seed:0,displayedSeed:0,isDebug:!1},a.isControllable=!0,window.addEventListener("keydown",function(e){if(a.isControllable)switch(e.keyCode){case 37:return e.preventDefault(),void a.moveLeft();case 39:return e.preventDefault(),void a.moveRight();case 38:return void e.preventDefault();case 40:return e.preventDefault(),void a.putPuyo();case 49:return void a.toggleControlledPlayer1();case 50:return void a.toggleControlledPlayer2();case 51:case 52:case 53:case 54:case 55:case 56:return;case 88:return void a.turnRight();case 90:return void a.turnLeft();case 67:case 68:case 69:return;case 78:return void a.stepNextFrame();case 80:return void a.pass();case 82:return void a.sendInit(Number(a.state.seed)+1);case 83:case 84:default:return}}),a.dbActions0=[],a.dbActions1=[],E.collection("puyotan").doc("info").onSnapshot(function(e){var t=e.data();if(null!=t){a.dbActions0=[],a.dbActions1=[],a.initPuyotan(t.seed),console.log(t.seed),null!=n&&n();try{n=E.collection("puyotan/actions/".concat(t.seed,"/ids/0")).onSnapshot({includeMetadataChanges:!0},function(e){var t=[];e.forEach(function(e){var a=e.data();e.metadata.hasPendingWrites||(t[e.id]={type:a.type,x:a.x,dir:a.dir})}),a.dbActions0=t,a.applyActions()})}catch(s){console.error(s)}null!=i&&i();try{i=E.collection("puyotan/actions/".concat(t.seed,"/ids/1")).onSnapshot({includeMetadataChanges:!0},function(e){var t=[];e.forEach(function(e){var a=e.data();e.metadata.hasPendingWrites||(t[e.id]={type:a.type,x:a.x,dir:a.dir})}),a.dbActions1=t,a.applyActions()})}catch(s){console.error(s)}}}),window.enableDebug=function(){a.setState({isDebug:!0})},window.disableDebug=function(){a.setState({isDebug:!1})};var s=function(e){var t=e.indexOf("/");if(-1!==t){var a=e.substring(t+1).split("/");switch(a[0]){case"rooms":console.log("rooms!",a[1]);break;case"replays":console.log("replays!",a[1])}}};return s(window.location.hash),window.addEventListener("hashchange",function(e){s(window.location.hash)}),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.actionHistories1[this.state.frame-1],a=null==t?new k.Action:t.action;null!=t&&1!==t.remainingFrame&&a.type===k.ActionType.PUT&&(a=new k.Action(k.ActionType.PUT,3,0));var n=this.state.actionHistories2[this.state.frame-1],s=null==n?new k.Action:n.action;null!=n&&1!==n.remainingFrame&&s.type===k.ActionType.PUT&&(s=new k.Action(k.ActionType.PUT,3,0));var o=this.state.actionHistories1[this.state.frame],r=this.state.actionHistories2[this.state.frame],c=this.state.controledDir1,l=this.state.controledDir2,u=new P.Pos(this.state.controledPos1,12),h=new P.Pos(this.state.controledPos2,12),d=this.state.isControlledPlayer1&&null==o,m=this.state.isControlledPlayer2&&null==r;null!=o&&o.action.type===k.ActionType.PUT&&0===o.remainingFrame?(c=o.action.dir,u=new P.Pos(o.action.x,12),d=!0):null!=o&&o.action.type===k.ActionType.PUT&&1===o.remainingFrame?(this.state.isControlledPlayer1?(c=o.action.dir,u=new P.Pos(o.action.x,12)):(c=0,u=new P.Pos(3,12)),d=!0):null!=o&&o.action.type===k.ActionType.PASS?(c=0,u=new P.Pos(3,12),d=!0):null!=o||this.state.isControlledPlayer1||(c=0,u=new P.Pos(3,12),d=!0),null!=r&&r.action.type===k.ActionType.PUT&&0===r.remainingFrame?(l=r.action.dir,h=new P.Pos(r.action.x,12),m=!0):null!=r&&r.action.type===k.ActionType.PUT&&1===r.remainingFrame?(this.state.isControlledPlayer2?(l=r.action.dir,h=new P.Pos(r.action.x,12)):(l=0,h=new P.Pos(3,12)),m=!0):null!=r&&r.action.type===k.ActionType.PASS?(l=0,h=new P.Pos(3,12),m=!0):null!=r||this.state.isControlledPlayer2||(l=0,h=new P.Pos(3,12),m=!0);var f=this.getSubPos(u,c),y=this.getSubPos(h,l);return i.a.createElement("div",{className:"Game"},i.a.createElement("div",{className:"Game-pos-chain1"},this.state.chain1," \u9023\u9396"),i.a.createElement("div",{className:"Game-pos-chain2"},this.state.chain2," \u9023\u9396"),i.a.createElement("div",{className:"Game-pos-score1"},this.state.score1," \u70b9"),i.a.createElement("div",{className:"Game-pos-score2"},this.state.score2," \u70b9"),i.a.createElement("div",{className:"Game-pos-usedScore1"},this.state.usedScore1," \u70b9"),i.a.createElement("div",{className:"Game-pos-usedScore2"},this.state.usedScore2," \u70b9"),i.a.createElement("div",{className:"Game-pos-activeOjama1"},"\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.activeOjama1," \u500b"),i.a.createElement("div",{className:"Game-pos-activeOjama2"},"\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.activeOjama2," \u500b"),i.a.createElement("div",{className:"Game-pos-nonActiveOjama1"},"\u975e\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.nonActiveOjama1," \u500b"),i.a.createElement("div",{className:"Game-pos-nonActiveOjama2"},"\u975e\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.nonActiveOjama2," \u500b"),i.a.createElement("div",{className:"Game-pos-frame"},"frame: ",this.state.frame),i.a.createElement("div",{className:"Game-pos-gameStatusText"},"statusText: ",this.state.gameStatusText),i.a.createElement("div",{className:"Game-history Game-pos-history1"},this.actionHistoriesToElements(this.state.actionHistories1)),i.a.createElement("div",{className:"Game-history Game-pos-history2"},this.actionHistoriesToElements(this.state.actionHistories2)),i.a.createElement("div",{className:"Game-field Game-pos-field1"+(this.state.isControlledPlayer1?" Game-field-active":"")},this.fieldToElements(this.state.field1),i.a.createElement("div",{style:{top:32*(10-f.y),left:32*(f.x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair1.sub)," ").concat(d?"":"hidden")}),i.a.createElement("div",{style:{top:32*(10-u.y),left:32*(u.x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair1.axis)," ").concat(d?"":"hidden")})),i.a.createElement("div",{className:"Game-field Game-pos-field2"+(this.state.isControlledPlayer2?" Game-field-active":"")},this.fieldToElements(this.state.field2),i.a.createElement("div",{style:{top:32*(10-y.y),left:32*(y.x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair2.sub)," ").concat(m?"":"hidden")}),i.a.createElement("div",{style:{top:32*(10-h.y),left:32*(h.x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair2.axis)," ").concat(m?"":"hidden")})),i.a.createElement("div",{className:"Game-next Game-pos-next11"},this.nextToElements(this.state.next11)),i.a.createElement("div",{className:"Game-next Game-pos-next12"},this.nextToElements(this.state.next12)),i.a.createElement("div",{className:"Game-next Game-pos-next21"},this.nextToElements(this.state.next21)),i.a.createElement("div",{className:"Game-next Game-pos-next22"},this.nextToElements(this.state.next22)),i.a.createElement("input",{type:"button",value:this.state.isControlledPlayer1?"[1P] \u96e2\u5e2d":"[1P] \u7740\u5e2d",onClick:function(t){return e.toggleControlledPlayer1()},className:"Game-button Game-size-onoff Game-pos-onoff1"}),i.a.createElement("input",{type:"button",value:this.state.isControlledPlayer2?"[2P] \u96e2\u5e2d":"[2P] \u7740\u5e2d",onClick:function(t){return e.toggleControlledPlayer2()},className:"Game-button Game-size-onoff Game-pos-onoff2"}),i.a.createElement("input",{type:"button",value:"\u21e6",onClick:function(t){return e.moveLeft()},className:"Game-button Game-size-button Game-pos-leftmove"}),i.a.createElement("input",{type:"button",value:"\u21e8",onClick:function(t){return e.moveRight()},className:"Game-button Game-size-button Game-pos-rightmove"}),i.a.createElement("input",{type:"button",value:"L",onClick:function(t){return e.turnLeft()},className:"Game-button Game-size-button Game-pos-leftturn"}),i.a.createElement("input",{type:"button",value:"R",onClick:function(t){return e.turnRight()},className:"Game-button Game-size-button Game-pos-rightturn"}),i.a.createElement("input",{type:"button",value:"\u21e9",onClick:function(t){return e.putPuyo()},className:"Game-button Game-size-button2 Game-pos-put"}),i.a.createElement("input",{type:"button",value:"Reset",onClick:function(t){return e.sendInit(Number(e.state.seed)+1)},className:"Game-button Game-size-reset Game-pos-reset"}),i.a.createElement("input",{type:"number",value:this.state.displayedSeed,onChange:function(t){return e.setState({displayedSeed:t.target.value})},className:"Game-input-seed"}),i.a.createElement("input",{type:"button",value:"GO",onClick:function(t){return e.sendInit(e.state.displayedSeed)},className:"Game-button Game-size-go Game-pos-go"}))}},{key:"getSubPos",value:function(e,t){switch(t){case 0:return new P.Pos(e.x,e.y+1);case 1:return new P.Pos(e.x+1,e.y);case 2:return new P.Pos(e.x,e.y-1);case 3:return new P.Pos(e.x-1,e.y);default:throw Error("unsupported dir ".concat(this.state.controledDir1))}}},{key:"actionHistoriesToElements",value:function(e){if(!this.state.isDebug)return[];for(var t=[],a=this.state.frame;a>=1;a--){var n=e[a],s="";if(null!=n){switch(n.action.type){case k.ActionType.PASS:s="PASS";break;case k.ActionType.PUT:s="PUT(".concat(n.action.x,", ").concat(n.action.dir,")");break;case k.ActionType.CHAIN:s="CHAIN";break;case k.ActionType.CHAIN_FALL:s="CHAIN_FALL";break;case k.ActionType.OJAMA:s="OJAMA";break;default:s="unknown type"}s="".concat(s," ").concat(n.remainingFrame)}var o={top:32*(this.state.frame-a)};t.push(i.a.createElement("div",{key:a,style:o,className:"Game-history-tile"},a,":",s))}return t}},{key:"fieldToElements",value:function(e){var t=this;return e.map(function(e,a){var n={left:32*(e.x-1),top:32*(13-e.y)},s=t.kindToClassName(a);return i.a.createElement("div",{key:"".concat(e.x,"_").concat(e.y),style:n,className:"Game-puyo ".concat(s)})})}},{key:"nextToElements",value:function(e){return[i.a.createElement("div",{key:"sub",className:"Game-puyo ".concat(this.kindToClassName(e.sub))}),i.a.createElement("div",{key:"axs",className:"Game-puyo ".concat(this.kindToClassName(e.axis)),style:{top:32}})]}},{key:"kindToClassName",value:function(e){switch(e){case P.Kind.RED:return"Game-puyo-kind-red";case P.Kind.BLUE:return"Game-puyo-kind-blue";case P.Kind.GREEN:return"Game-puyo-kind-green";case P.Kind.YELLOW:return"Game-puyo-kind-yellow";case P.Kind.OJAMA:return"Game-puyo-kind-ojama";default:return"Game-puyo-kind-blank"}}},{key:"toggleControlledPlayer1",value:function(){this.setState({isControlledPlayer1:!this.state.isControlledPlayer1})}},{key:"toggleControlledPlayer2",value:function(){this.setState({isControlledPlayer2:!this.state.isControlledPlayer2})}},{key:"reflectPuyotanView",value:function(e){this.setState(this.puyotanViewModelToStateObject(e))}},{key:"moveLeft",value:function(){this.state.isControlledPlayer1&&(this.state.controledPos1>2||2===this.state.controledPos1&&3!==this.state.controledDir1)&&this.setState({controledPos1:this.state.controledPos1-1}),this.state.isControlledPlayer2&&(this.state.controledPos2>2||2===this.state.controledPos2&&3!==this.state.controledDir2)&&this.setState({controledPos2:this.state.controledPos2-1})}},{key:"moveRight",value:function(){this.state.isControlledPlayer1&&(this.state.controledPos1<5||5===this.state.controledPos1&&1!==this.state.controledDir1)&&this.setState({controledPos1:this.state.controledPos1+1}),this.state.isControlledPlayer2&&(this.state.controledPos2<5||5===this.state.controledPos2&&1!==this.state.controledDir2)&&this.setState({controledPos2:this.state.controledPos2+1})}},{key:"turnLeft",value:function(){if(this.state.isControlledPlayer1){var e=0;1===this.state.controledPos1&&0===this.state.controledDir1&&(e=1),6===this.state.controledPos1&&2===this.state.controledDir1&&(e=-1),this.setState({controledDir1:(this.state.controledDir1+3)%4,controledPos1:this.state.controledPos1+e})}if(this.state.isControlledPlayer2){var t=0;1===this.state.controledPos2&&0===this.state.controledDir2&&(t=1),6===this.state.controledPos2&&2===this.state.controledDir2&&(t=-1),this.setState({controledDir2:(this.state.controledDir2+3)%4,controledPos2:this.state.controledPos2+t})}}},{key:"turnRight",value:function(){if(this.state.isControlledPlayer1){var e=0;1===this.state.controledPos1&&2===this.state.controledDir1&&(e=1),6===this.state.controledPos1&&0===this.state.controledDir1&&(e=-1),this.setState({controledDir1:(this.state.controledDir1+1)%4,controledPos1:this.state.controledPos1+e})}if(this.state.isControlledPlayer2){var t=0;1===this.state.controledPos2&&2===this.state.controledDir2&&(t=1),6===this.state.controledPos2&&0===this.state.controledDir2&&(t=-1),this.setState({controledDir2:(this.state.controledDir2+1)%4,controledPos2:this.state.controledPos2+t})}}},{key:"putPuyo",value:function(){this.state.isControlledPlayer1&&this.sendAction(0,this.state.frame,new k.Action(k.ActionType.PUT,this.state.controledPos1,this.state.controledDir1)),this.state.isControlledPlayer2&&this.sendAction(1,this.state.frame,new k.Action(k.ActionType.PUT,this.state.controledPos2,this.state.controledDir2))}},{key:"pass",value:function(){this.state.isControlledPlayer1&&this.sendAction(0,this.state.frame,new k.Action(k.ActionType.PASS)),this.state.isControlledPlayer2&&this.sendAction(1,this.state.frame,new k.Action(k.ActionType.PASS))}},{key:"stepNextFrame",value:function(){var e=this;if(this.puyotan.canStepNextFrame()){this.puyotan.stepNextFrame();var t=this.puyotan.getViewModel();this.reflectPuyotanView(t),null!=t.players[0].actionHistories[t.frame]&&null!=t.players[1].actionHistories[t.frame]?(this.isControllable=!1,setTimeout(function(){e.stepNextFrame()},500)):(this.isControllable=!0,this.applyActions(500))}}},{key:"puyotanViewModelToStateObject",value:function(e){return{activePair1:e.players[0].activePair,activePair2:e.players[1].activePair,field1:e.players[0].field,field2:e.players[1].field,next11:e.players[0].next1,next12:e.players[0].next2,next21:e.players[1].next1,next22:e.players[1].next2,frame:e.frame,actionHistories1:e.players[0].actionHistories,actionHistories2:e.players[1].actionHistories,chain1:e.players[0].chain,chain2:e.players[1].chain,score1:e.players[0].score,score2:e.players[1].score,usedScore1:e.players[0].usedScore,usedScore2:e.players[1].usedScore,nonActiveOjama1:e.players[0].nonActiveOjama,nonActiveOjama2:e.players[1].nonActiveOjama,activeOjama1:e.players[0].activeOjama,activeOjama2:e.players[1].activeOjama,gameStatusText:e.gameStatusText}}},{key:"sendAction",value:function(e,t,a){E.collection("puyotan/actions/".concat(this.state.seed,"/ids/").concat(e)).doc(String(t)).set({type:a.type,x:a.x,dir:a.dir}).then(function(){console.log("Document successfully written!")}).catch(function(e){console.error(e)})}},{key:"setAction",value:function(e,t,a){console.log("setAction(id, frame, action)",e,t,a),this.puyotan.frame===t&&this.puyotan.setAction(e,a)&&(0===e?this.setState({controledPos1:3,controledDir1:0}):this.setState({controledPos2:3,controledDir2:0}),this.stepNextFrame())}},{key:"applyActions",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=this.state.frame,n=this.dbActions0[a],i=this.dbActions1[a];console.log("applyActions(frame, action0, action1)",a,n,i),null==n&&null==i||(t<=0?(null!=n&&this.setAction(0,a,n),null!=i&&this.setAction(1,a,i)):(this.isControllable=!1,setTimeout(function(){null!=n&&e.setAction(0,a,n),null!=i&&e.setAction(1,a,i),e.isControllable=!0},t)))}},{key:"sendInit",value:function(e){null==e&&(e=Math.floor(Math.random()*Math.floor(9999))),E.collection("puyotan").doc("info").set({seed:e}).then(function(){console.log("Document successfully written!")}).catch(function(e){console.error(e)})}},{key:"initPuyotan",value:function(e){console.log("initPuyotan",e),this.puyotan=new k.Puyotan(e),this.puyotan.start();var t=this.puyotan.getViewModel();this.reflectPuyotanView(t),this.setState({seed:e,displayedSeed:e,controledPos1:3,controledDir1:0,controledPos2:3,controledDir2:0})}}]),t}(i.a.Component),O=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(o,null),i.a.createElement(C,null))};a(34);Object(s.render)(i.a.createElement(O,null),document.getElementById("root"))}},[[11,2,1]]]);
//# sourceMappingURL=main.7e15cab4.chunk.js.map