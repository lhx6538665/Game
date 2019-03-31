window.__require=function t(e,i,o){function a(n,r){if(!i[n]){if(!e[n]){var c=n.split("/");if(c=c[c.length-1],!e[c]){var l="function"==typeof __require&&__require;if(!r&&l)return l(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+n+"'")}}var h=i[n]={exports:{}};e[n][0].call(h.exports,function(t){return a(e[n][1][t]||t)},h,h.exports,t,e,i,o)}return i[n].exports}for(var s="function"==typeof __require&&__require,n=0;n<o.length;n++)a(o[n]);return a}({main:[function(t,e,i){"use strict";cc._RF.push(e,"ef122C6K/BNma3VlGHbiYFR","main"),cc.Class({extends:cc.Component,properties:{elementPrefab:cc.Prefab,mapNode:cc.Node,scoreLabel:cc.Label,stageLabel:cc.Label,elementSpriteFrames:[cc.SpriteFrame]},onLoad:function(){this.score=0,this.stage=0,this.gameLoop()},gameLoop:function(){this.stage+=1,this.stageLabel.string="\u5173\u5361 "+this.stage;var t=2+2*this.stage,e=4+2*parseInt(t/10);this.startGame({x:t,y:e})},startGame:function(t){var e={x:4,y:4,totalElement:this.elementSpriteFrames.length,elementWidth:74,elementHeight:89,mapMaxWidth:950,mapMaxHeight:450};(t=Object.assign(e,t)).x>21&&(t.x=21),t.y>8&&(t.y=8),this.setting=t;for(var i=[],o=0;o<t.totalElement;o++)i[o]=o;for(var a=0;a<t.totalElement;a++){var s=parseInt(Math.random()*t.totalElement),n=i[a];i[a]=i[s],i[s]=n}for(var r=[],c=0;c<t.x*t.y/4;c++)for(var l=0;l<4;l++)r[4*c+l]=i[c];for(var h=0;h<t.x*t.y;h++){var m=parseInt(Math.random()*t.x*t.y),g=r[h];r[h]=r[m],r[m]=g}var d=t.x*t.elementWidth,f=t.y*t.elementHeight;(d>t.mapMaxWidth||f>t.mapMaxHeight)&&(this.mapNode.scaleX=this.mapNode.scaleY=Math.min(t.mapMaxWidth/d,t.mapMaxHeight/f)),this.map=[],this.selectedElement=null;for(var x=0;x<t.y;x++)for(var y=0;y<t.x;y++){this.map[y]||(this.map[y]=[]),this.map[y][x]=r[y*t.y+x];var v=cc.instantiate(this.elementPrefab);v.name=y+"-"+x,v.x=t.elementWidth*y-d/2,v.y=t.elementHeight*x-f/2,v.getComponent(cc.Sprite).spriteFrame=this.elementSpriteFrames[this.map[y][x]],v.code=this.map[y][x],v.location=cc.v2(y,x),v.on(cc.Node.EventType.TOUCH_START,this.elementTouchStart,this),v.on(cc.Node.EventType.TOUCH_MOVE,this.elementTouchMove,this),v.on(cc.Node.EventType.TOUCH_END,this.elementTouchEnd,this),v.on(cc.Node.EventType.TOUCH_CANCEL,this.elementTouchEnd,this),v.parent=this.mapNode}},elementTouchStart:function(t){var e=this;if(t.target==this.selectedElement)return this.selectedElement.color=(new cc.Color).fromHEX("#D6D6D6"),void(this.selectedElement=null);if(this.selectedElement){var i=!0;if(this.selectedElement.code!=t.target.code||this.selectedElement.location.x!=t.target.location.x&&this.selectedElement.location.y!=t.target.location.y)i=!1;else{if(this.selectedElement.location.x==t.target.location.x)for(var o=Math.min(this.selectedElement.location.y,t.target.location.y)+1;o<Math.max(this.selectedElement.location.y,t.target.location.y);o++)this.map[this.selectedElement.location.x][o]>=0&&(i=!1);if(this.selectedElement.location.y==t.target.location.y)for(var a=Math.min(this.selectedElement.location.x,t.target.location.x)+1;a<Math.max(this.selectedElement.location.x,t.target.location.x);a++)this.map[a][this.selectedElement.location.y]>=0&&(i=!1)}if(i){t.target.color=(new cc.Color).fromHEX("#FFFFFF"),t.target.setSiblingIndex(1e4),this.selectedElement.setSiblingIndex(1e4),this.map[t.target.location.x][t.target.location.y]=-1,this.map[this.selectedElement.location.x][this.selectedElement.location.y]=-1;var s=[t.target,this.selectedElement];setTimeout(function(){e.score+=10,e.scoreLabel.string="\u5206\u6570 "+e.score,s.forEach(function(t){return t.destroy()})},600);var n=cc.spawn(cc.moveTo(1,this.scoreLabel.node.x,this.scoreLabel.node.y).easing(cc.easeOut(3)),cc.scaleTo(1,0,0).easing(cc.easeOut(3)));t.target.runAction(n),this.selectedElement.runAction(n.clone()),0==this.map.filter(function(t){return t.filter(function(t){return t>=0}).length>0}).length&&this.gameLoop()}else this.selectedElement.color=(new cc.Color).fromHEX("#D6D6D6");this.selectedElement=null}else t.target.color=(new cc.Color).fromHEX("#FFFFFF"),this.selectedElement=t.target},elementTouchMove:function(t){var e=this,i=t.touch.getDelta();if(t.target.moveX||t.target.moveY){if(t.target.moveX){for(var o=this.targetNodes.reduce(function(t,e){return t.location.x>e.location.x?e:t},this.targetNodes[0]),a=0-this.setting.x*this.setting.elementWidth/2,s=o.location.x-1;s>=0;s--)if(this.map[s][o.location.y]>=0){a+=(s+1)*this.setting.elementWidth;break}for(var n=this.targetNodes.reduce(function(t,e){return t.location.x<e.location.x?e:t},this.targetNodes[0]),r=this.setting.x*this.setting.elementWidth/2-this.setting.elementWidth,c=n.location.x+1;c<this.setting.x;c++)if(this.map[c][o.location.y]>=0){r-=(this.setting.x-c)*this.setting.elementWidth;break}i.x<0&&o.x>a?(i.x+o.x<a&&(i.x=a-o.x),this.targetNodes.forEach(function(e){t.target.moveX&&(e.x+=i.x)})):i.x>0&&n.x<r&&(i.x+n.x>r&&(i.x=r-n.x),this.targetNodes.forEach(function(e){t.target.moveX&&(e.x+=i.x)}))}else if(t.target.moveY){for(var l=this.targetNodes.reduce(function(t,e){return t.location.y>e.location.y?e:t},this.targetNodes[0]),h=0-this.setting.y*this.setting.elementHeight/2,m=l.location.y-1;m>=0;m--)if(this.map[l.location.x][m]>=0){h+=(m+1)*this.setting.elementHeight;break}for(var g=this.targetNodes.reduce(function(t,e){return t.location.y<e.location.y?e:t},this.targetNodes[0]),d=this.setting.y*this.setting.elementHeight/2-this.setting.elementHeight,f=g.location.y+1;f<this.setting.y;f++)if(this.map[l.location.x][f]>=0){d-=(this.setting.y-f)*this.setting.elementHeight;break}i.y<0&&l.y>h?(i.y+l.y<h&&(i.y=h-l.y),this.targetNodes.forEach(function(e){t.target.moveY&&(e.y+=i.y)})):i.y>0&&g.y<d&&(i.y+g.y>d&&(i.y=d-g.y),this.targetNodes.forEach(function(e){t.target.moveY&&(e.y+=i.y)}))}(this.moveNodes[0].x==this.targetNodes[0].x&&Math.abs((this.moveNodes[0].y-this.targetNodes[0].y)%this.setting.elementHeight)<30||Math.abs((this.moveNodes[0].y-this.targetNodes[0].y)%this.setting.elementHeight)>this.setting.elementHeight-30||this.moveNodes[0].y==this.targetNodes[0].y&&Math.abs((this.moveNodes[0].x-this.targetNodes[0].x)%this.setting.elementWidth)<30||Math.abs((this.moveNodes[0].x-this.targetNodes[0].x)%this.setting.elementWidth)>this.setting.elementWidth-30)&&Math.abs(this.moveNodes[0].x-this.targetNodes[0].x+this.moveNodes[0].y-this.targetNodes[0].y)>=30?this.targetNodes.forEach(function(t){t.color=(new cc.Color).fromHEX("#FFFFFF"),t.canDrop=!0}):this.targetNodes.forEach(function(t){t.color=(new cc.Color).fromHEX("#D6D6D6"),t.canDrop=!1})}else{t.target.delta||(t.target.delta=cc.v2()),t.target.delta.x+=i.x,t.target.delta.y+=i.y;var x=[];if(Math.abs(t.target.delta.x)>10){x=[t.target];for(var y=t.target.location.x-1;y>=0;y--){if(this.map[y][t.target.location.y]<0){t.target.moveX=!0;break}x.unshift(this.mapNode.getChildByName(y+"-"+t.target.location.y))}for(var v=t.target.location.x+1;v<this.setting.x;v++){if(this.map[v][t.target.location.y]<0){t.target.moveX=!0;break}x.push(this.mapNode.getChildByName(v+"-"+t.target.location.y))}}else if(Math.abs(t.target.delta.y)>10){x=[t.target];for(var u=t.target.location.y-1;u>=0;u--){if(this.map[t.target.location.x][u]<0){t.target.moveY=!0;break}x.push(this.mapNode.getChildByName(t.target.location.x+"-"+u))}for(var p=t.target.location.y+1;p<this.setting.y;p++){if(this.map[t.target.location.x][p]<0){t.target.moveY=!0;break}x.unshift(this.mapNode.getChildByName(t.target.location.x+"-"+p))}}if(t.target.moveX||t.target.moveY){this.selectedElement&&(this.selectedElement.color=(new cc.Color).fromHEX("#D6D6D6"),this.selectedElement=null),this.targetNodes=[];var N=x.reduce(function(t,e){return t.location.x==e.location.x?t.location.y>e.location.y?t:e:t.location.x>e.location.x?t:e},x[0]).getSiblingIndex()+1;x.forEach(function(t){var i=cc.instantiate(t);i.location=cc.v2(t.location),i.parent=e.mapNode,i.setSiblingIndex(N),e.targetNodes.push(i),t.opacity=100}),this.moveNodes=x}}},elementTouchEnd:function(t){var e=this;if(!!this.moveNodes){if(this.targetNodes[0].canDrop){var i=Math.round((this.targetNodes[0].x-this.moveNodes[0].x)/this.setting.elementWidth),o=Math.round((this.targetNodes[0].y-this.moveNodes[0].y)/this.setting.elementHeight);this.moveNodes.forEach(function(t){e.map[t.location.x][t.location.y]=-1}),this.moveNodes.forEach(function(t){t.x+=i*e.setting.elementWidth,t.y+=o*e.setting.elementHeight,t.location=cc.v2(t.location.x+i,t.location.y+o),e.map[t.location.x][t.location.y]=t.code,t.name=t.location.x+"-"+t.location.y}),this.score-=1,this.scoreLabel.string="\u5206\u6570 "+this.score;for(var a=0;a<this.setting.y;a++)for(var s=0;s<this.setting.x;s++){var n=this.mapNode.getChildByName(s+"-"+a);n&&n.setSiblingIndex(1e4)}}this.moveNodes.forEach(function(t){t.opacity=255}),delete this.moveNodes,this.targetNodes.forEach(function(t){t.destroy()}),delete this.targetNodes,delete t.target.delta,delete t.target.moveX,delete t.target.moveY}}}),cc._RF.pop()},{}]},{},["main"]);