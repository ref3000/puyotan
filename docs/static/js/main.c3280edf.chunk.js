(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(t,e,a){t.exports=a(36)},16:function(t,e,a){},18:function(t,e,a){},20:function(t,e,a){},34:function(t,e,a){},36:function(t,e,a){"use strict";a.r(e);var i=a(0),s=a.n(i),n=a(7),o=(a(16),a(18),function(){return s.a.createElement("div",{className:"AppHeader"},s.a.createElement("div",{className:"AppHeader-title"},"\u3077\u3088\u305f\u3093\u03b2"),s.a.createElement("div",{className:"AppHeader-version"},"v0.1"))}),r=a(1),c=a(2),l=a(9),u=a(8),h=a(10),d=(a(20),function(){function t(e){Object(r.a)(this,t),this.y=null==e?2147483647*Math.random():e}return Object(c.a)(t,[{key:"setSeed",value:function(t){this.y=t}},{key:"next",value:function(){return this.y=this.y^this.y<<13,this.y=this.y^this.y>>17,this.y=this.y^this.y<<15,this.y>>>0}},{key:"nextInt",value:function(t){return Math.abs(this.next())%t}}]),t}()),m={BRANK:0,RED:1,GREEN:2,BLUE:3,YELLOW:4,PURPLE:5,IRON:6,OJAMA:7,WALL:8,PEKE:9},f=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m.BRANK,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m.BRANK;Object(r.a)(this,t),this.axis=e,this.sub=a},y=function(){function t(e){Object(r.a)(this,t),this.init(e)}return Object(c.a)(t,[{key:"init",value:function(t){null==t&&(t=new d),this._random=t,this._size=1e3,this._puyos=[];for(var e=0;e<this._size;e++)this._puyos.push(new f(this._nextKind(),this._nextKind()))}},{key:"size",value:function(){return this._size}},{key:"get",value:function(t){return this._puyos[t%this._size]}},{key:"edit",value:function(t,e,a){t>=this._size||t<0||(a?this._puyos[t].axis=e:this._puyos[t].sub=e)}},{key:"_nextKind",value:function(){switch(this._random.nextInt(4)){case 0:return m.RED;case 1:return m.GREEN;case 2:return m.BLUE;case 3:return m.YELLOW;default:throw new Error("unexpected error")}}}]),t}(),v=function t(e,a){Object(r.a)(this,t),this.x=isNaN(e)?0:e,this.y=isNaN(a)?0:a},p=function(){function t(){Object(r.a)(this,t),this.height=13,this.width=6,this._field=[];for(var e=0;e<this.height+1;e++){for(var a=[],i=0;i<this.width;i++)a.push(m.BRANK);this._field.push(a)}}return Object(c.a)(t,[{key:"isBrank",value:function(t){return this.get(t)===m.BRANK}},{key:"get",value:function(t){return t.y<1||t.x<1||t.x>this.width?m.WALL:t.y>this.height?m.BRANK:this._field[t.y-1][t.x-1]}},{key:"set",value:function(t,e){t.y<1||t.y>this.height+1||t.x<1||t.x>this.width||(this._field[t.y-1][t.x-1]=e)}},{key:"setAndFall",value:function(t,e){if(t<1||t>this.width)throw RangeError("out of field.");this.isBrank(new v(t,13))&&(this.set(new v(t,13),e),this.fall())}},{key:"fall",value:function(){for(var t=!1,e=1;e<=this.width;e++)for(var a=1,i=1;i<=this.height+1;i++){var s=this.get(new v(e,i));s!==m.BRANK&&(s!==m.WALL?(this.set(new v(e,i),this.get(new v(e,a))),this.set(new v(e,a),s),a!==i&&(t=!0),a++):a=i+1)}for(var n=1;n<=this.width;n++)this.set(new v(n,14),m.BRANK);return t}},{key:"canFall",value:function(){for(var t=1;t<=this.width;t++)for(var e=2;e<=this.height;e++)if(this.isBrank(new v(t,e-1))&&!this.isBrank(new v(t,e))&&this.get(new v(t,e))!==m.WALL)return!0;return!1}},{key:"_countConnection",value:function(t,e,a){return this.get(t)===m.IRON?0:this.get(t)===m.PEKE?0:this.get(t)===m.WALL?0:this.get(t)===m.BRANK?0:this.get(t)===m.OJAMA?0:this.get(t)!==e?0:a.get(t)!==m.BRANK?0:t.y>=13?0:(a.set(t,e),this._countConnection(new v(t.x,t.y+1),e,a)+this._countConnection(new v(t.x+1,t.y),e,a)+this._countConnection(new v(t.x,t.y-1),e,a)+this._countConnection(new v(t.x-1,t.y),e,a)+1)}},{key:"countConnection",value:function(e){return this._countConnection(e,this.get(e),new t)}},{key:"_deleteConnection",value:function(t,e){return this.get(t)===m.BRANK?0:this.get(t)===m.OJAMA?(this.set(t,m.BRANK),0):this.get(t)!==e?0:t.y>=13?0:(this.set(t,m.BRANK),this._deleteConnection(new v(t.x,t.y+1),e)+this._deleteConnection(new v(t.x+1,t.y),e)+this._deleteConnection(new v(t.x,t.y-1),e)+this._deleteConnection(new v(t.x-1,t.y),e)+1)}},{key:"deleteConnection",value:function(t){return this._deleteConnection(t,this.get(t))}},{key:"canFire",value:function(){for(var e=new t,a=1;a<this.height;a++)for(var i=1;i<=this.width;i++){var s=new v(i,a);if(this._countConnection(s,this.get(s),e)>=4)return!0}return!1}},{key:"stepFire",value:function(){for(var e=new function t(){Object(r.a)(this,t),this.num=0,this.connections=[],this.color=0},a=new t,i={},s=1;s<this.height;s++)for(var n=1;n<=this.width;n++){var o=new v(n,s),c=this.get(o),l=this._countConnection(o,c,a);l>=4&&(this.deleteConnection(o),e.num+=l,e.connections.push(l),i[c]=!0)}return e.color=Object.keys(i).length,e}},{key:"Height",value:function(){return this.height}},{key:"Width",value:function(){return this.width}},{key:"copy",value:function(){for(var e=new t,a=1;a<=this.height;a++)for(var i=1;i<=this.width;i++){var s=new v(i,a);e.set(s,this.get(s))}return e}},{key:"equal",value:function(t){for(var e=1;e<=this.height;e++)for(var a=1;a<=this.width;a++){var i=new v(a,e);if(this.get(i)!==t.get(i))return!1}return!0}},{key:"isAllClear",value:function(){for(var t=1;t<=this.height;t++)for(var e=1;e<=this.width;e++){var a=new v(e,t);if(this.get(a)!==m.BRANK)return!1}return!0}},{key:"map",value:function(t){for(var e=[],a=1;a<=this.height;a++)for(var i=1;i<=this.width;i++){var s=new v(i,a),n=this.get(s);e.push(t(s,n))}return e}},{key:"toString",value:function(){var t=this.copy()._field;return t.reverse(),t.map(function(t){return t.join(",")}).join("\n")}}]),t}(),P={Kind:m,Pos:v,Next:y,Field:p,PuyoPair:f},A={PASS:0,PUT:1,CHAIN:2,CHAIN_FALL:3,OJAMA:4},g=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A.PASS,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;Object(r.a)(this,t),this.type=e,this.x=a,this.dir=i},w=function t(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(r.a)(this,t),this.action=e,this.remainingFrame=a},k=function(){function t(e){Object(r.a)(this,t),this.field=new P.Field,this.actionHistories=[],this.activeNextPos=0,this.score=0,this.usedScore=0,this.nonActiveOjama=0,this.activeOjama=0,this.chain=0,this.random=e}return Object(c.a)(t,[{key:"fallOjama",value:function(t){for(;t>0;)if(t>=6){for(var e=1;e<=6;e++)this.field.setAndFall(e,P.Kind.OJAMA);t-=6}else{for(var a=[!1,!1,!1,!1,!1,!1],i=0;i<t;i++)for(var s=this.random.nextInt(6-i),n=0,o=0;o<6;o++)a[o]||n++===s&&(a[o]=!0);for(var r=1;r<=6;r++)a[r-1]&&this.field.setAndFall(r,P.Kind.OJAMA);t=0}}}]),t}(),x={Puyotan:function(){function t(e){Object(r.a)(this,t),this.random=new d(e),this.next=new P.Next(this.random),this.players=[new k(this.random),new k(this.random)],this.frame=0,this.gameStatusText="\u5f85\u6a5f\u4e2d"}return Object(c.a)(t,[{key:"getPlayer",value:function(t){return this.players[t]}},{key:"start",value:function(){0===this.frame&&(this.frame++,this.gameStatusText="\u5bfe\u6226\u4e2d")}},{key:"setAction",value:function(t,e){if(this.frame<=0)return!1;if(null==this.players[t].actionHistories[this.frame])switch(e.type){case A.PASS:return this.players[t].actionHistories[this.frame]=new w(e,0),!0;case A.PUT:return this.players[t].actionHistories[this.frame]=new w(e,1),!0;default:throw new Error("unsupported action type.")}return!1}},{key:"canStepNextFrame",value:function(){var t=this;return!(this.frame<=0)&&this.players.every(function(e){return null!=e.actionHistories[t.frame]})}},{key:"stepNextFrame",value:function(){var t=this;if(!this.canStepNextFrame())return console.error("can not step next frame.");this.players.forEach(function(e,a){var i=e.actionHistories[t.frame];i.remainingFrame>0&&(e.actionHistories[t.frame+1]=new w(i.action,i.remainingFrame-1))}),this.players.forEach(function(e,a){var i=e.actionHistories[t.frame];if(0===i.remainingFrame)switch(i.action.type){case A.PASS:break;case A.PUT:var s=t.next.get(e.activeNextPos),n=i.action.x,o=i.action.dir;switch(o){case 0:e.field.setAndFall(n,s.axis),e.field.setAndFall(n,s.sub);break;case 1:e.field.setAndFall(n,s.axis),e.field.setAndFall(n+1,s.sub);break;case 2:e.field.setAndFall(n,s.sub),e.field.setAndFall(n,s.axis);break;case 3:e.field.setAndFall(n,s.axis),e.field.setAndFall(n-1,s.sub);break;default:throw Error("unsupported direction range or type. ".concat(o))}e.field.canFire()&&(e.chain=0,e.actionHistories[t.frame+1]=new w(new g(A.CHAIN),1));break;case A.CHAIN:var r=e.field.stepFire();e.chain++,e.score+=t.calcScore(r.num,r.color,r.connections,e.chain);var c=Math.floor((e.score-e.usedScore)/70);if(e.usedScore+=70*c,e.nonActiveOjama>0){var l=Math.min(c,e.nonActiveOjama);e.nonActiveOjama-=l,c-=l}if(e.activeOjama>0){var u=Math.min(c,e.activeOjama);e.activeOjama-=u,c-=u}c>0&&t.sendOjama(a,c),e.field.isAllClear()&&(e.score+=2100),e.field.canFall()?e.actionHistories[t.frame+1]=new w(new g(A.CHAIN_FALL),0):t.activeOjama(a);break;case A.CHAIN_FALL:if(!e.field.canFall())throw new Error("failed to fall puyo.");e.field.fall(),e.field.canFire()?e.actionHistories[t.frame+1]=new w(new g(A.CHAIN),1):t.activeOjama(a);break;case A.OJAMA:if(e.activeOjama<=0)throw new Error("failed to fall ojama.");var h=Math.min(e.activeOjama,30);e.activeOjama-=h,e.fallOjama(h);break;default:throw new Error("unsupported action type.")}});var e=0,a=0;this.players.forEach(function(i,s){null==i.actionHistories[t.frame+1]&&i.field.get(new P.Pos(3,12))!==P.Kind.BRANK||(e++,a=s)}),0===e&&(this.gameStatusText="\u5f15\u304d\u5206\u3051\u2026"),1===e&&(this.gameStatusText="Player ".concat(a+1," \u306e\u52dd\u5229\uff01")),this.players.forEach(function(e,a){e.actionHistories[t.frame].action.type!==A.OJAMA&&null==e.actionHistories[t.frame+1]&&e.activeOjama>0&&(e.actionHistories[t.frame+1]=new w(new g(A.OJAMA),0))}),this.players.forEach(function(e,a){var i=e.actionHistories[t.frame],s=e.actionHistories[t.frame+1];i.action.type!==A.PASS&&null==s&&e.activeNextPos++}),this.frame++}},{key:"calcScore",value:function(t,e,a,i){var s=[0,2,3,4,5,6,7,10],n=10*t,o=[0,8,16,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512][i-1];void 0===o&&(o=512),o+=[0,3,6,12,24][e-1];for(var r=0;r<a.length;r++){var c=a[r];o+=c>11?10:s[c-4]}return 0===o&&(o=1),n*o}},{key:"sendOjama",value:function(t,e){this.players.forEach(function(a,i){i!==t&&(a.nonActiveOjama+=e)})}},{key:"activeOjama",value:function(t){this.players.forEach(function(e,a){a!==t&&(e.activeOjama+=e.nonActiveOjama,e.nonActiveOjama=0)})}},{key:"getViewModel",value:function(){var t=this;return{frame:this.frame,players:this.players.map(function(e){return{activePair:0===t.frame?new P.PuyoPair:t.next.get(e.activeNextPos),next1:0===t.frame?t.next.get(0):t.next.get(e.activeNextPos+1),next2:0===t.frame?t.next.get(1):t.next.get(e.activeNextPos+2),field:e.field,actionHistories:e.actionHistories,chain:e.chain,score:e.score,usedScore:e.usedScore,nonActiveOjama:e.nonActiveOjama,activeOjama:e.activeOjama}}),gameStatusText:this.gameStatusText}}}]),t}(),Action:g,ActionType:A,Player:k},N=a(4),b=a.n(N);a(29);b.a.initializeApp({apiKey:"AIzaSyDNckvdwFU9B-Xg3YPY-tgsrj09kg0MTxE",authDomain:"puyotan-be458.firebaseapp.com",databaseURL:"https://puyotan-be458.firebaseio.com",projectId:"puyotan-be458",storageBucket:"puyotan-be458.appspot.com",messagingSenderId:"1067679324903"});var E=b.a.firestore();E.settings({timestampsInSnapshots:!0});var C=function(t){function e(t){var a,i,s;return Object(r.a)(this,e),(a=Object(l.a)(this,Object(u.a)(e).call(this,t))).puyotan=new x.Puyotan,a.state={activePair1:new P.PuyoPair,activePair2:new P.PuyoPair,field1:new P.Field,field2:new P.Field,next11:new P.PuyoPair,next12:new P.PuyoPair,next21:new P.PuyoPair,next22:new P.PuyoPair,frame:0,actionHistories1:[],actionHistories2:[],chain1:0,chain2:0,score1:0,score2:0,usedScore1:0,usedScore2:0,nonActiveOjama1:0,nonActiveOjama2:0,activeOjama1:0,activeOjama2:0,gameStatusText:"\u521d\u671f\u5316\u5f85\u3061",controledPos1:0,controledDir1:0,controledPos2:0,controledDir2:0,isControlledPlayer1:!1,isControlledPlayer2:!1,seed:0,displayedSeed:0},a.isControllable=!0,window.addEventListener("keydown",function(t){if(a.isControllable)switch(t.keyCode){case 37:return t.preventDefault(),void a.moveLeft();case 39:return t.preventDefault(),void a.moveRight();case 38:return void t.preventDefault();case 40:return t.preventDefault(),void a.putPuyo();case 49:return void a.toggleControlledPlayer1();case 50:return void a.toggleControlledPlayer2();case 51:case 52:case 53:case 54:case 55:case 56:return;case 88:return void a.turnRight();case 90:return void a.turnLeft();case 67:case 68:case 69:return;case 78:return void a.stepNextFrame();case 80:return void a.pass();case 82:return void a.sendInit(Number(a.state.seed)+1);case 83:case 84:default:return}}),a.dbActions0=[],a.dbActions1=[],E.collection("puyotan").doc("info").onSnapshot(function(t){var e=t.data();null!=e&&(a.dbActions0=[],a.dbActions1=[],a.initPuyotan(e.seed),null!=i&&i(),i=E.collection("puyotan/actions/".concat(e.seed,"/ids/0")).onSnapshot({includeMetadataChanges:!0},function(t){var e=[];t.forEach(function(t){var a=t.data();t.metadata.hasPendingWrites||(e[t.id]={type:a.type,x:a.x,dir:a.dir})}),a.dbActions0=e,a.applyActions()}),null!=s&&s(),s=E.collection("puyotan/actions/".concat(e.seed,"/ids/1")).onSnapshot({includeMetadataChanges:!0},function(t){var e=[];t.forEach(function(t){var a=t.data();t.metadata.hasPendingWrites||(e[t.id]={type:a.type,x:a.x,dir:a.dir})}),a.dbActions1=e,a.applyActions()}))}),a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement("div",{className:"Game"},s.a.createElement("div",{className:"Game-pos-chain1"},this.state.chain1," CHAIN"),s.a.createElement("div",{className:"Game-pos-chain2"},this.state.chain2," CHAIN"),s.a.createElement("div",{className:"Game-pos-score1"},this.state.score1," \u70b9"),s.a.createElement("div",{className:"Game-pos-score2"},this.state.score2," \u70b9"),s.a.createElement("div",{className:"Game-pos-usedScore1"},this.state.usedScore1," \u70b9"),s.a.createElement("div",{className:"Game-pos-usedScore2"},this.state.usedScore2," \u70b9"),s.a.createElement("div",{className:"Game-pos-activeOjama1"},"\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.activeOjama1," \u500b"),s.a.createElement("div",{className:"Game-pos-activeOjama2"},"\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.activeOjama2," \u500b"),s.a.createElement("div",{className:"Game-pos-nonActiveOjama1"},"\u975e\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.nonActiveOjama1," \u500b"),s.a.createElement("div",{className:"Game-pos-nonActiveOjama2"},"\u975e\u30a2\u30af\u30c6\u30a3\u30d6\u304a\u3058\u3083\u307e ",this.state.nonActiveOjama2," \u500b"),s.a.createElement("div",{className:"Game-pos-frame"},"frame: ",this.state.frame),s.a.createElement("div",{className:"Game-pos-gameStatusText"},"statusText: ",this.state.gameStatusText),s.a.createElement("div",{className:"Game-history Game-pos-history1"},this.actionHistoriesToElements(this.state.actionHistories1)),s.a.createElement("div",{className:"Game-history Game-pos-history2"},this.actionHistoriesToElements(this.state.actionHistories2)),s.a.createElement("div",{className:"Game-field Game-pos-field1"+(this.state.isControlledPlayer1?" Game-field-active":"")},this.fieldToElements(this.state.field1),s.a.createElement("div",{style:{top:32*(10-this.getSubPos1().y),left:32*(this.getSubPos1().x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair1.sub)," ").concat(null==this.state.actionHistories1[this.state.frame]&&this.state.isControlledPlayer1?"":"hidden")}),s.a.createElement("div",{style:{top:32*(10-this.getAxisPos1().y),left:32*(this.getAxisPos1().x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair1.axis)," ").concat(null==this.state.actionHistories1[this.state.frame]&&this.state.isControlledPlayer1?"":"hidden")})),s.a.createElement("div",{className:"Game-field Game-pos-field2"+(this.state.isControlledPlayer2?" Game-field-active":"")},this.fieldToElements(this.state.field2),s.a.createElement("div",{style:{top:32*(10-this.getSubPos2().y),left:32*(this.getSubPos2().x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair2.sub)," ").concat(null==this.state.actionHistories2[this.state.frame]&&this.state.isControlledPlayer2?"":"hidden")}),s.a.createElement("div",{style:{top:32*(10-this.getAxisPos2().y),left:32*(this.getAxisPos2().x-1)},className:"Game-puyo ".concat(this.kindToClassName(this.state.activePair2.axis)," ").concat(null==this.state.actionHistories2[this.state.frame]&&this.state.isControlledPlayer2?"":"hidden")})),s.a.createElement("div",{className:"Game-next Game-pos-next11"},this.nextToElements(this.state.next11)),s.a.createElement("div",{className:"Game-next Game-pos-next12"},this.nextToElements(this.state.next12)),s.a.createElement("div",{className:"Game-next Game-pos-next21"},this.nextToElements(this.state.next21)),s.a.createElement("div",{className:"Game-next Game-pos-next22"},this.nextToElements(this.state.next22)),s.a.createElement("input",{type:"button",value:this.state.isControlledPlayer1?"[1P] \u96e2\u5e2d":"[1P] \u7740\u5e2d",onClick:function(e){return t.toggleControlledPlayer1()},className:"Game-button Game-size-onoff Game-pos-onoff1"}),s.a.createElement("input",{type:"button",value:this.state.isControlledPlayer2?"[2P] \u96e2\u5e2d":"[2P] \u7740\u5e2d",onClick:function(e){return t.toggleControlledPlayer2()},className:"Game-button Game-size-onoff Game-pos-onoff2"}),s.a.createElement("input",{type:"button",value:"\u21e6",onClick:function(e){return t.moveLeft()},className:"Game-button Game-size-button Game-pos-leftmove"}),s.a.createElement("input",{type:"button",value:"\u21e8",onClick:function(e){return t.moveRight()},className:"Game-button Game-size-button Game-pos-rightmove"}),s.a.createElement("input",{type:"button",value:"L",onClick:function(e){return t.turnLeft()},className:"Game-button Game-size-button Game-pos-leftturn"}),s.a.createElement("input",{type:"button",value:"R",onClick:function(e){return t.turnRight()},className:"Game-button Game-size-button Game-pos-rightturn"}),s.a.createElement("input",{type:"button",value:"\u21e9",onClick:function(e){return t.putPuyo()},className:"Game-button Game-size-button2 Game-pos-put"}),s.a.createElement("input",{type:"button",value:"Reset",onClick:function(e){return t.sendInit(Number(t.state.seed)+1)},className:"Game-button Game-size-reset Game-pos-reset"}),s.a.createElement("input",{type:"number",value:this.state.displayedSeed,onChange:function(e){return t.setState({displayedSeed:e.target.value})},className:"Game-input-seed"}),s.a.createElement("input",{type:"button",value:"GO",onClick:function(e){return t.sendInit(t.state.displayedSeed)},className:"Game-button Game-size-go Game-pos-go"}))}},{key:"actionHistoriesToElements",value:function(t){for(var e=[],a=this.state.frame;a>=1;a--){var i=t[a],n="";if(null!=i){switch(i.action.type){case x.ActionType.PASS:n="PASS";break;case x.ActionType.PUT:n="PUT(".concat(i.action.x,", ").concat(i.action.dir,")");break;case x.ActionType.CHAIN:n="CHAIN";break;case x.ActionType.CHAIN_FALL:n="CHAIN_FALL";break;case x.ActionType.OJAMA:n="OJAMA";break;default:n="unknown type"}n="".concat(n," ").concat(i.remainingFrame)}var o={top:32*(this.state.frame-a)};e.push(s.a.createElement("div",{key:a,style:o,className:"Game-history-tile"},a,":",n))}return e}},{key:"fieldToElements",value:function(t){var e=this;return t.map(function(t,a){var i={left:32*(t.x-1),top:32*(13-t.y)},n=e.kindToClassName(a);return s.a.createElement("div",{key:"".concat(t.x,"_").concat(t.y),style:i,className:"Game-puyo ".concat(n)})})}},{key:"nextToElements",value:function(t){return[s.a.createElement("div",{key:"sub",className:"Game-puyo ".concat(this.kindToClassName(t.sub))}),s.a.createElement("div",{key:"axs",className:"Game-puyo ".concat(this.kindToClassName(t.axis)),style:{top:32}})]}},{key:"kindToClassName",value:function(t){switch(t){case P.Kind.RED:return"Game-puyo-kind-red";case P.Kind.BLUE:return"Game-puyo-kind-blue";case P.Kind.GREEN:return"Game-puyo-kind-green";case P.Kind.YELLOW:return"Game-puyo-kind-yellow";case P.Kind.OJAMA:return"Game-puyo-kind-ojama";default:return"Game-puyo-kind-blank"}}},{key:"toggleControlledPlayer1",value:function(){this.setState({isControlledPlayer1:!this.state.isControlledPlayer1})}},{key:"toggleControlledPlayer2",value:function(){this.setState({isControlledPlayer2:!this.state.isControlledPlayer2})}},{key:"reflectPuyotanView",value:function(t){this.setState(this.puyotanViewModelToStateObject(t))}},{key:"moveLeft",value:function(){this.state.isControlledPlayer1&&(this.state.controledPos1>2||2===this.state.controledPos1&&3!==this.state.controledDir1)&&this.setState({controledPos1:this.state.controledPos1-1}),this.state.isControlledPlayer2&&(this.state.controledPos2>2||2===this.state.controledPos2&&3!==this.state.controledDir2)&&this.setState({controledPos2:this.state.controledPos2-1})}},{key:"moveRight",value:function(){this.state.isControlledPlayer1&&(this.state.controledPos1<5||5===this.state.controledPos1&&1!==this.state.controledDir1)&&this.setState({controledPos1:this.state.controledPos1+1}),this.state.isControlledPlayer2&&(this.state.controledPos2<5||5===this.state.controledPos2&&1!==this.state.controledDir2)&&this.setState({controledPos2:this.state.controledPos2+1})}},{key:"turnLeft",value:function(){if(this.state.isControlledPlayer1){var t=0;1===this.state.controledPos1&&0===this.state.controledDir1&&(t=1),6===this.state.controledPos1&&2===this.state.controledDir1&&(t=-1),this.setState({controledDir1:(this.state.controledDir1+3)%4,controledPos1:this.state.controledPos1+t})}if(this.state.isControlledPlayer2){var e=0;1===this.state.controledPos2&&0===this.state.controledDir2&&(e=1),6===this.state.controledPos2&&2===this.state.controledDir2&&(e=-1),this.setState({controledDir2:(this.state.controledDir2+3)%4,controledPos2:this.state.controledPos2+e})}}},{key:"turnRight",value:function(){if(this.state.isControlledPlayer1){var t=0;1===this.state.controledPos1&&2===this.state.controledDir1&&(t=1),6===this.state.controledPos1&&0===this.state.controledDir1&&(t=-1),this.setState({controledDir1:(this.state.controledDir1+1)%4,controledPos1:this.state.controledPos1+t})}if(this.state.isControlledPlayer2){var e=0;1===this.state.controledPos2&&2===this.state.controledDir2&&(e=1),6===this.state.controledPos2&&0===this.state.controledDir2&&(e=-1),this.setState({controledDir2:(this.state.controledDir2+1)%4,controledPos2:this.state.controledPos2+e})}}},{key:"putPuyo",value:function(){this.state.isControlledPlayer1&&this.sendAction(0,this.state.frame,new x.Action(x.ActionType.PUT,this.state.controledPos1,this.state.controledDir1)),this.state.isControlledPlayer2&&this.sendAction(1,this.state.frame,new x.Action(x.ActionType.PUT,this.state.controledPos2,this.state.controledDir2))}},{key:"pass",value:function(){this.state.isControlledPlayer1&&this.sendAction(0,this.state.frame,new x.Action(x.ActionType.PASS)),this.state.isControlledPlayer2&&this.sendAction(1,this.state.frame,new x.Action(x.ActionType.PASS))}},{key:"getAxisPos1",value:function(){return new P.Pos(this.state.controledPos1,12)}},{key:"getAxisPos2",value:function(){return new P.Pos(this.state.controledPos2,12)}},{key:"getSubPos1",value:function(){switch(this.state.controledDir1){case 0:return new P.Pos(this.state.controledPos1,13);case 1:return new P.Pos(this.state.controledPos1+1,12);case 2:return new P.Pos(this.state.controledPos1,11);case 3:return new P.Pos(this.state.controledPos1-1,12);default:throw Error("unsupported dir ".concat(this.state.controledDir1))}}},{key:"getSubPos2",value:function(){switch(this.state.controledDir2){case 0:return new P.Pos(this.state.controledPos2,13);case 1:return new P.Pos(this.state.controledPos2+1,12);case 2:return new P.Pos(this.state.controledPos2,11);case 3:return new P.Pos(this.state.controledPos2-1,12);default:throw Error("unsupported dir ".concat(this.state.controledDir2))}}},{key:"stepNextFrame",value:function(){var t=this;if(this.puyotan.canStepNextFrame()){this.puyotan.stepNextFrame();var e=this.puyotan.getViewModel();this.reflectPuyotanView(e),null!=e.players[0].actionHistories[e.frame]&&null!=e.players[1].actionHistories[e.frame]?(this.isControllable=!1,setTimeout(function(){t.stepNextFrame()},500)):(this.isControllable=!0,this.applyActions(500))}}},{key:"puyotanViewModelToStateObject",value:function(t){return{activePair1:t.players[0].activePair,activePair2:t.players[1].activePair,field1:t.players[0].field,field2:t.players[1].field,next11:t.players[0].next1,next12:t.players[0].next2,next21:t.players[1].next1,next22:t.players[1].next2,frame:t.frame,actionHistories1:t.players[0].actionHistories,actionHistories2:t.players[1].actionHistories,chain1:t.players[0].chain,chain2:t.players[1].chain,score1:t.players[0].score,score2:t.players[1].score,usedScore1:t.players[0].usedScore,usedScore2:t.players[1].usedScore,nonActiveOjama1:t.players[0].nonActiveOjama,nonActiveOjama2:t.players[1].nonActiveOjama,activeOjama1:t.players[0].activeOjama,activeOjama2:t.players[1].activeOjama,gameStatusText:t.gameStatusText}}},{key:"sendAction",value:function(t,e,a){E.collection("puyotan/actions/".concat(this.state.seed,"/ids/").concat(t)).doc(String(e)).set({type:a.type,x:a.x,dir:a.dir}).then(function(){console.log("Document successfully written!")}).catch(function(t){console.error(t)})}},{key:"setAction",value:function(t,e,a){console.log("setAction(id, frame, action)",t,e,a),this.puyotan.frame===e&&this.puyotan.setAction(t,a)&&(0===t?this.setState({controledPos1:3,controledDir1:0}):this.setState({controledPos2:3,controledDir2:0}),this.stepNextFrame())}},{key:"applyActions",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=this.state.frame,i=this.dbActions0[a],s=this.dbActions1[a];console.log("applyActions(frame, action0, action1)",a,i,s),null==i&&null==s||(e<=0?(null!=i&&this.setAction(0,a,i),null!=s&&this.setAction(1,a,s)):(this.isControllable=!1,setTimeout(function(){null!=i&&t.setAction(0,a,i),null!=s&&t.setAction(1,a,s),t.isControllable=!0},e)))}},{key:"sendInit",value:function(t){null==t&&(t=Math.floor(Math.random()*Math.floor(9999))),E.collection("puyotan").doc("info").set({seed:t}).then(function(){console.log("Document successfully written!")}).catch(function(t){console.error(t)})}},{key:"initPuyotan",value:function(t){console.log("initPuyotan",t),this.puyotan=new x.Puyotan(t),this.puyotan.start();var e=this.puyotan.getViewModel();this.reflectPuyotanView(e),this.setState({seed:t,displayedSeed:t,controledPos1:3,controledDir1:0,controledPos2:3,controledDir2:0})}}]),e}(s.a.Component),O=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(o,null),s.a.createElement(C,null))};a(34);Object(n.render)(s.a.createElement(O,null),document.getElementById("root"))}},[[11,2,1]]]);
//# sourceMappingURL=main.c3280edf.chunk.js.map