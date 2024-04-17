// Garden Gnome Software - Skin
// Pano2VR 5.2.1/15974
// Filename: maybach.ggsk
// Generated Ср сен 6 19:06:24 2017

function pano2vrSkin(player,base) {
	var ggSkinVars = [];
	ggSkinVars['hide'] = false;
	var me=this;
	var flag=false;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=me.player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.preloadImages=function() {
		var preLoadImg=new Image();
		preLoadImg.src=basePath + 'images/vr__o.png';
		preLoadImg.src=basePath + 'images/play__o.png';
		preLoadImg.src=basePath + 'images/pause__o.png';
		preLoadImg.src=basePath + 'images/gyro_off__o.png';
		preLoadImg.src=basePath + 'images/gyro_on__o.png';
		preLoadImg.src=basePath + 'images/fullscreen_off__o.png';
		preLoadImg.src=basePath + 'images/fullscreen_on__o.png';
		preLoadImg.src=basePath + 'images/share__o.png';
		preLoadImg.src=basePath + 'images/hs_on_off__o.png';
		preLoadImg.src=basePath + 'images/share_close__o.png';
		preLoadImg.src=basePath + 'images/b_off__o.png';
		preLoadImg.src=basePath + 'images/b_on__o.png';
		preLoadImg.src=basePath + 'images/f_off__o.png';
		preLoadImg.src=basePath + 'images/f_on__o.png';
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this._toolbar=document.createElement('div');
		this._toolbar.ggId="toolbar";
		this._toolbar.ggLeft=-154;
		this._toolbar.ggTop=-35;
		this._toolbar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._toolbar.ggVisible=true;
		this._toolbar.className='ggskin ggskin_container ';
		this._toolbar.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -154px;';
		hs+='position : absolute;';
		hs+='top : -35px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:none;';
		this._toolbar.setAttribute('style',hs);
		this._toolbar.style[domTransform + 'Origin']='50% 50%';
		me._toolbar.ggIsActive=function() {
			return false;
		}
		me._toolbar.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._toolbar.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._vr=document.createElement('div');
		this._vr__img=document.createElement('img');
		this._vr__img.className='ggskin ggskin_button';
		this._vr__img.setAttribute('src',basePath + 'images/vr.png');
		this._vr__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._vr__img.className='ggskin ggskin_button';
		this._vr__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._vr__img);
		this._vr.appendChild(this._vr__img);
		this._vr.ggId="vr";
		this._vr.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._vr.ggVisible=true;
		this._vr.className='ggskin ggskin_button ';
		this._vr.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 42px;';
		hs+='left : 28px;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 42px;';
		hs+='pointer-events:auto;';
		this._vr.setAttribute('style',hs);
		this._vr.style[domTransform + 'Origin']='50% 50%';
		me._vr.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._vr.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._vr.onclick=function (e) {
			me.player.openUrl("VR\/tour.html","_self");
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._vr.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">ENTER VR MODE<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">ENTER VR MODE<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._vr__img.src=basePath + 'images/vr__o.png';
		}
		this._vr.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._vr__img.src=basePath + 'images/vr.png';
		}
		this._vr.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._vr);
		this._play=document.createElement('div');
		this._play__img=document.createElement('img');
		this._play__img.className='ggskin ggskin_button';
		this._play__img.setAttribute('src',basePath + 'images/play.png');
		this._play__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._play__img.className='ggskin ggskin_button';
		this._play__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._play__img);
		this._play.appendChild(this._play__img);
		this._play.ggId="play";
		this._play.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._play.ggVisible=true;
		this._play.className='ggskin ggskin_button ';
		this._play.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 79px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		this._play.setAttribute('style',hs);
		this._play.style[domTransform + 'Origin']='50% 50%';
		me._play.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._play.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._play.onclick=function (e) {
			me.player.startAutorotate("0.03");
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._play.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">AUTOROTATE ON<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">AUTOROTATE ON<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._play__img.src=basePath + 'images/play__o.png';
		}
		this._play.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._play__img.src=basePath + 'images/play.png';
		}
		me._play.ggCurrentLogicStateVisible = -1;
		this._play.ggUpdateConditionTimer=function () {
			var newLogicStateVisible;
			if (
				(me.player.getIsAutorotating() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._play.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._play.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._play.style[domTransition]='';
				if (me._play.ggCurrentLogicStateVisible == 0) {
					me._play.style.visibility="hidden";
					me._play.ggVisible=false;
				}
				else {
					me._play.style.visibility=(Number(me._play.style.opacity)>0||!me._play.style.opacity)?'inherit':'hidden';
					me._play.ggVisible=true;
				}
			}
		}
		this._play.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._play);
		this._pause=document.createElement('div');
		this._pause__img=document.createElement('img');
		this._pause__img.className='ggskin ggskin_button';
		this._pause__img.setAttribute('src',basePath + 'images/pause.png');
		this._pause__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._pause__img.className='ggskin ggskin_button';
		this._pause__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._pause__img);
		this._pause.appendChild(this._pause__img);
		this._pause.ggId="pause";
		this._pause.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._pause.ggVisible=false;
		this._pause.className='ggskin ggskin_button ';
		this._pause.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 79px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		this._pause.setAttribute('style',hs);
		this._pause.style[domTransform + 'Origin']='50% 50%';
		me._pause.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._pause.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._pause.onclick=function (e) {
			me.player.stopAutorotate();
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._pause.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">AUTOROTATE OFF<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">AUTOROTATE OFF<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._pause__img.src=basePath + 'images/pause__o.png';
		}
		this._pause.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._pause__img.src=basePath + 'images/pause.png';
		}
		me._pause.ggCurrentLogicStateVisible = -1;
		this._pause.ggUpdateConditionTimer=function () {
			var newLogicStateVisible;
			if (
				(me.player.getIsAutorotating() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._pause.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._pause.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._pause.style[domTransition]='';
				if (me._pause.ggCurrentLogicStateVisible == 0) {
					me._pause.style.visibility=(Number(me._pause.style.opacity)>0||!me._pause.style.opacity)?'inherit':'hidden';
					me._pause.ggVisible=true;
				}
				else {
					me._pause.style.visibility="hidden";
					me._pause.ggVisible=false;
				}
			}
		}
		this._pause.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._pause);
		this._gyro_off=document.createElement('div');
		this._gyro_off__img=document.createElement('img');
		this._gyro_off__img.className='ggskin ggskin_button';
		this._gyro_off__img.setAttribute('src',basePath + 'images/gyro_off.png');
		this._gyro_off__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._gyro_off__img.className='ggskin ggskin_button';
		this._gyro_off__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._gyro_off__img);
		this._gyro_off.appendChild(this._gyro_off__img);
		this._gyro_off.ggId="gyro off";
		this._gyro_off.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._gyro_off.ggVisible=false;
		this._gyro_off.className='ggskin ggskin_button ';
		this._gyro_off.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -93px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		this._gyro_off.setAttribute('style',hs);
		this._gyro_off.style[domTransform + 'Origin']='50% 50%';
		me._gyro_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._gyro_off.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._gyro_off.onclick=function (e) {
			gyro.toggle();
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._gyro_off.style[domTransition]='none';
			me._gyro_off.style.opacity='0';
			me._gyro_off.style.visibility='hidden';
			me._gyro_on.style[domTransition]='none';
			me._gyro_on.style.opacity='1';
			me._gyro_on.style.visibility=me._gyro_on.ggVisible?'inherit':'hidden';
		}
		this._gyro_off.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">GYRO CONTROL OFF<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">GYRO CONTROL OFF<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._gyro_off__img.src=basePath + 'images/gyro_off__o.png';
		}
		this._gyro_off.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._gyro_off__img.src=basePath + 'images/gyro_off.png';
		}
		me._gyro_off.ggCurrentLogicStateVisible = -1;
		this._gyro_off.ggUpdateConditionNodeChange=function () {
			var newLogicStateVisible;
			if (
				(me.player.getIsMobile() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._gyro_off.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._gyro_off.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._gyro_off.style[domTransition]='';
				if (me._gyro_off.ggCurrentLogicStateVisible == 0) {
					me._gyro_off.style.visibility=(Number(me._gyro_off.style.opacity)>0||!me._gyro_off.style.opacity)?'inherit':'hidden';
					me._gyro_off.ggVisible=true;
				}
				else {
					me._gyro_off.style.visibility="hidden";
					me._gyro_off.ggVisible=false;
				}
			}
		}
		this._gyro_off.ggUpdatePosition=function (useTransition) {
		}
		this._gyro_off.ggNodeChange=function () {
			me._gyro_off.ggUpdateConditionNodeChange();
		}
		this._toolbar.appendChild(this._gyro_off);
		this._gyro_on=document.createElement('div');
		this._gyro_on__img=document.createElement('img');
		this._gyro_on__img.className='ggskin ggskin_button';
		this._gyro_on__img.setAttribute('src',basePath + 'images/gyro_on.png');
		this._gyro_on__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._gyro_on__img.className='ggskin ggskin_button';
		this._gyro_on__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._gyro_on__img);
		this._gyro_on.appendChild(this._gyro_on__img);
		this._gyro_on.ggId="gyro on";
		this._gyro_on.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._gyro_on.ggVisible=false;
		this._gyro_on.className='ggskin ggskin_button ';
		this._gyro_on.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -93px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		this._gyro_on.setAttribute('style',hs);
		this._gyro_on.style[domTransform + 'Origin']='50% 50%';
		me._gyro_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._gyro_on.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._gyro_on.onclick=function (e) {
			gyro.toggle();
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._gyro_on.style[domTransition]='none';
			me._gyro_on.style.opacity='0';
			me._gyro_on.style.visibility='hidden';
			me._gyro_off.style[domTransition]='none';
			me._gyro_off.style.opacity='1';
			me._gyro_off.style.visibility=me._gyro_off.ggVisible?'inherit':'hidden';
		}
		this._gyro_on.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">GYRO CONTROL ON<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">GYRO CONTROL ON<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._gyro_on__img.src=basePath + 'images/gyro_on__o.png';
		}
		this._gyro_on.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._gyro_on__img.src=basePath + 'images/gyro_on.png';
		}
		me._gyro_on.ggCurrentLogicStateVisible = -1;
		this._gyro_on.ggUpdateConditionNodeChange=function () {
			var newLogicStateVisible;
			if (
				(me.player.getIsMobile() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._gyro_on.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._gyro_on.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._gyro_on.style[domTransition]='';
				if (me._gyro_on.ggCurrentLogicStateVisible == 0) {
					me._gyro_on.style.visibility=(Number(me._gyro_on.style.opacity)>0||!me._gyro_on.style.opacity)?'inherit':'hidden';
					me._gyro_on.ggVisible=true;
				}
				else {
					me._gyro_on.style.visibility="hidden";
					me._gyro_on.ggVisible=false;
				}
			}
		}
		this._gyro_on.ggUpdatePosition=function (useTransition) {
		}
		this._gyro_on.ggNodeChange=function () {
			me._gyro_on.ggUpdateConditionNodeChange();
		}
		this._toolbar.appendChild(this._gyro_on);
		this._fullscreen_off=document.createElement('div');
		this._fullscreen_off__img=document.createElement('img');
		this._fullscreen_off__img.className='ggskin ggskin_button';
		this._fullscreen_off__img.setAttribute('src',basePath + 'images/fullscreen_off.png');
		this._fullscreen_off__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._fullscreen_off__img.className='ggskin ggskin_button';
		this._fullscreen_off__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._fullscreen_off__img);
		this._fullscreen_off.appendChild(this._fullscreen_off__img);
		this._fullscreen_off.ggId="fullscreen off";
		this._fullscreen_off.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen_off.ggVisible=false;
		this._fullscreen_off.className='ggskin ggskin_button ';
		this._fullscreen_off.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 115px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		this._fullscreen_off.setAttribute('style',hs);
		this._fullscreen_off.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._fullscreen_off.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._fullscreen_off.onclick=function (e) {
			me.player.exitFullscreen();
			me._fullscreen_off.style[domTransition]='none';
			me._fullscreen_off.style.visibility='hidden';
			me._fullscreen_off.ggVisible=false;
			me._fullscreen_on.style[domTransition]='none';
			me._fullscreen_on.style.visibility=(Number(me._fullscreen_on.style.opacity)>0||!me._fullscreen_on.style.opacity)?'inherit':'hidden';
			me._fullscreen_on.ggVisible=true;
			me._tooltip_r.style[domTransition]='none';
			me._tooltip_r.style.visibility='hidden';
			me._tooltip_r.ggVisible=false;
		}
		this._fullscreen_off.onmouseover=function (e) {
			me._tooltip_r.style[domTransition]='none';
			me._tooltip_r.style.visibility=(Number(me._tooltip_r.style.opacity)>0||!me._tooltip_r.style.opacity)?'inherit':'hidden';
			me._tooltip_r.ggVisible=true;
			me._tooltip_r.ggText="<b><span style=\"font-family: Copperplate Gothic;\">EXIT FULLSCREEN<\/span><\/b>";
			me._tooltip_r.ggTextDiv.innerHTML=me._tooltip_r.ggText;
			if (me._tooltip_r.ggUpdateText) {
				me._tooltip_r.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">EXIT FULLSCREEN<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip_r.ggUpdatePosition) {
				me._tooltip_r.ggUpdatePosition();
			}
			me._tooltip_r.ggTextDiv.scrollTop = 0;
			me._fullscreen_off__img.src=basePath + 'images/fullscreen_off__o.png';
		}
		this._fullscreen_off.onmouseout=function (e) {
			me._tooltip_r.style[domTransition]='none';
			me._tooltip_r.style.visibility='hidden';
			me._tooltip_r.ggVisible=false;
			me._fullscreen_off__img.src=basePath + 'images/fullscreen_off.png';
		}
		this._fullscreen_off.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._fullscreen_off);
		this._fullscreen_on=document.createElement('div');
		this._fullscreen_on__img=document.createElement('img');
		this._fullscreen_on__img.className='ggskin ggskin_button';
		this._fullscreen_on__img.setAttribute('src',basePath + 'images/fullscreen_on.png');
		this._fullscreen_on__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._fullscreen_on__img.className='ggskin ggskin_button';
		this._fullscreen_on__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._fullscreen_on__img);
		this._fullscreen_on.appendChild(this._fullscreen_on__img);
		this._fullscreen_on.ggId="fullscreen on";
		this._fullscreen_on.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen_on.ggVisible=true;
		this._fullscreen_on.className='ggskin ggskin_button ';
		this._fullscreen_on.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 116px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		this._fullscreen_on.setAttribute('style',hs);
		this._fullscreen_on.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._fullscreen_on.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._fullscreen_on.onclick=function (e) {
			me.player.enterFullscreen();
			me._fullscreen_on.style[domTransition]='none';
			me._fullscreen_on.style.visibility='hidden';
			me._fullscreen_on.ggVisible=false;
			me._fullscreen_off.style[domTransition]='none';
			me._fullscreen_off.style.visibility=(Number(me._fullscreen_off.style.opacity)>0||!me._fullscreen_off.style.opacity)?'inherit':'hidden';
			me._fullscreen_off.ggVisible=true;
			me._tooltip_r.style[domTransition]='none';
			me._tooltip_r.style.visibility='hidden';
			me._tooltip_r.ggVisible=false;
		}
		this._fullscreen_on.onmouseover=function (e) {
			me._tooltip_r.style[domTransition]='none';
			me._tooltip_r.style.visibility=(Number(me._tooltip_r.style.opacity)>0||!me._tooltip_r.style.opacity)?'inherit':'hidden';
			me._tooltip_r.ggVisible=true;
			me._tooltip_r.ggText="<b><span style=\"font-family: Copperplate Gothic;\">ENTER FULLSCREEN<\/span><\/b>";
			me._tooltip_r.ggTextDiv.innerHTML=me._tooltip_r.ggText;
			if (me._tooltip_r.ggUpdateText) {
				me._tooltip_r.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">ENTER FULLSCREEN<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip_r.ggUpdatePosition) {
				me._tooltip_r.ggUpdatePosition();
			}
			me._tooltip_r.ggTextDiv.scrollTop = 0;
			me._fullscreen_on__img.src=basePath + 'images/fullscreen_on__o.png';
		}
		this._fullscreen_on.onmouseout=function (e) {
			me._tooltip_r.style[domTransition]='none';
			me._tooltip_r.style.visibility='hidden';
			me._tooltip_r.ggVisible=false;
			me._fullscreen_on__img.src=basePath + 'images/fullscreen_on.png';
		}
		this._fullscreen_on.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._fullscreen_on);
		this._share=document.createElement('div');
		this._share__img=document.createElement('img');
		this._share__img.className='ggskin ggskin_button';
		this._share__img.setAttribute('src',basePath + 'images/share.png');
		this._share__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._share__img.className='ggskin ggskin_button';
		this._share__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._share__img);
		this._share.appendChild(this._share__img);
		this._share.ggId="share";
		this._share.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._share.ggVisible=true;
		this._share.className='ggskin ggskin_button ';
		this._share.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -12px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		this._share.setAttribute('style',hs);
		this._share.style[domTransform + 'Origin']='50% 50%';
		me._share.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._share.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._share.onclick=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			if (me.player.transitionsDisabled) {
				me._tint.style[domTransition]='none';
			} else {
				me._tint.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._tint.style.opacity='1';
			me._tint.style.visibility=me._tint.ggVisible?'inherit':'hidden';
			me._share_close.style[domTransition]='none';
			me._share_close.style.visibility=(Number(me._share_close.style.opacity)>0||!me._share_close.style.opacity)?'inherit':'hidden';
			me._share_close.ggVisible=true;
			if (me.player.transitionsDisabled) {
				me._share_icons.style[domTransition]='none';
			} else {
				me._share_icons.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._share_icons.style.opacity='1';
			me._share_icons.style.visibility=me._share_icons.ggVisible?'inherit':'hidden';
			me.player.stopAutorotate();
			me._pause.style[domTransition]='none';
			me._pause.style.visibility='hidden';
			me._pause.ggVisible=false;
			me._play.style[domTransition]='none';
			me._play.style.visibility=(Number(me._play.style.opacity)>0||!me._play.style.opacity)?'inherit':'hidden';
			me._play.ggVisible=true;
		}
		this._share.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">SHARE<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">SHARE<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._share__img.src=basePath + 'images/share__o.png';
		}
		this._share.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._share__img.src=basePath + 'images/share.png';
		}
		this._share.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._share);
		this._hs_on_off=document.createElement('div');
		this._hs_on_off__img=document.createElement('img');
		this._hs_on_off__img.className='ggskin ggskin_button';
		this._hs_on_off__img.setAttribute('src',basePath + 'images/hs_on_off.png');
		this._hs_on_off__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._hs_on_off__img.className='ggskin ggskin_button';
		this._hs_on_off__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._hs_on_off__img);
		this._hs_on_off.appendChild(this._hs_on_off__img);
		this._hs_on_off.ggId="hs_on_off";
		this._hs_on_off.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._hs_on_off.ggVisible=true;
		this._hs_on_off.className='ggskin ggskin_button ';
		this._hs_on_off.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 26px;';
		hs+='left : -54px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 37px;';
		hs+='pointer-events:auto;';
		this._hs_on_off.setAttribute('style',hs);
		this._hs_on_off.style[domTransform + 'Origin']='50% 50%';
		me._hs_on_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._hs_on_off.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._hs_on_off.onclick=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			ggSkinVars['hide'] = !ggSkinVars['hide'];
		}
		this._hs_on_off.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">HOTSPOTS ON\/OFF<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">HOTSPOTS ON\/OFF<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me._hs_on_off__img.src=basePath + 'images/hs_on_off__o.png';
		}
		this._hs_on_off.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me._hs_on_off__img.src=basePath + 'images/hs_on_off.png';
		}
		this._hs_on_off.ggUpdatePosition=function (useTransition) {
		}
		this._toolbar.appendChild(this._hs_on_off);
		this.divSkin.appendChild(this._toolbar);
		this._tint=document.createElement('div');
		this._tint.ggId="tint";
		this._tint.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tint.ggVisible=true;
		this._tint.className='ggskin ggskin_rectangle ';
		this._tint.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.823529);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		this._tint.setAttribute('style',hs);
		this._tint.style[domTransform + 'Origin']='50% 50%';
		me._tint.ggIsActive=function() {
			return false;
		}
		me._tint.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._tint.onclick=function (e) {
			me._share_close.style[domTransition]='none';
			me._share_close.style.visibility='hidden';
			me._share_close.ggVisible=false;
			if (me.player.transitionsDisabled) {
				me._tint.style[domTransition]='none';
			} else {
				me._tint.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._tint.style.opacity='0';
			me._tint.style.visibility='hidden';
			me._share_icons.style[domTransition]='none';
			me._share_icons.style.opacity='0';
			me._share_icons.style.visibility='hidden';
		}
		this._tint.ggUpdatePosition=function (useTransition) {
		}
		this.divSkin.appendChild(this._tint);
		this._share_close=document.createElement('div');
		this._share_close__img=document.createElement('img');
		this._share_close__img.className='ggskin ggskin_button';
		this._share_close__img.setAttribute('src',basePath + 'images/share_close.png');
		this._share_close__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._share_close__img.className='ggskin ggskin_button';
		this._share_close__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._share_close__img);
		this._share_close.appendChild(this._share_close__img);
		this._share_close.ggId="share close";
		this._share_close.ggLeft=-45;
		this._share_close.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._share_close.ggVisible=false;
		this._share_close.className='ggskin ggskin_button ';
		this._share_close.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -45px;';
		hs+='position : absolute;';
		hs+='top : 14px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		this._share_close.setAttribute('style',hs);
		this._share_close.style[domTransform + 'Origin']='50% 50%';
		me._share_close.ggIsActive=function() {
			return false;
		}
		me._share_close.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._share_close.onclick=function (e) {
			me._share_close.style[domTransition]='none';
			me._share_close.style.visibility='hidden';
			me._share_close.ggVisible=false;
			if (me.player.transitionsDisabled) {
				me._tint.style[domTransition]='none';
			} else {
				me._tint.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._tint.style.opacity='0';
			me._tint.style.visibility='hidden';
			me._share_icons.style[domTransition]='none';
			me._share_icons.style.opacity='0';
			me._share_icons.style.visibility='hidden';
		}
		this._share_close.onmouseover=function (e) {
			me._share_close__img.src=basePath + 'images/share_close__o.png';
			me.elementMouseOver['share_close']=true;
		}
		this._share_close.onmouseout=function (e) {
			me._share_close__img.src=basePath + 'images/share_close.png';
			me.elementMouseOver['share_close']=false;
		}
		this._share_close.ontouchend=function (e) {
			me.elementMouseOver['share_close']=false;
		}
		me._share_close.ggCurrentLogicStateAngle = -1;
		this._share_close.ggUpdateConditionTimer=function () {
			var newLogicStateAngle;
			if (
				(me.elementMouseOver['share_close'] == true)
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._share_close.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._share_close.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._share_close.style[domTransition]='' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._share_close.ggCurrentLogicStateAngle == 0) {
					me._share_close.ggParameter.a = 90;
					me._share_close.style[domTransform]=parameterToTransform(me._share_close.ggParameter);
				}
				else {
					me._share_close.ggParameter.a = 0;
					me._share_close.style[domTransform]=parameterToTransform(me._share_close.ggParameter);
				}
			}
		}
		this._share_close.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w) + 'px';
			}
		}
		this.divSkin.appendChild(this._share_close);
		this._share_icons=document.createElement('div');
		this._share_icons.ggId="share icons";
		this._share_icons.ggLeft=-98;
		this._share_icons.ggTop=-23;
		this._share_icons.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._share_icons.ggVisible=true;
		this._share_icons.className='ggskin ggskin_container ';
		this._share_icons.ggType='container';
		hs ='';
		hs+='height : 45px;';
		hs+='left : -98px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -23px;';
		hs+='visibility : hidden;';
		hs+='width : 195px;';
		hs+='pointer-events:none;';
		this._share_icons.setAttribute('style',hs);
		this._share_icons.style[domTransform + 'Origin']='50% 50%';
		me._share_icons.ggIsActive=function() {
			return false;
		}
		me._share_icons.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._share_icons.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._google=document.createElement('div');
		this._google__img=document.createElement('img');
		this._google__img.className='ggskin ggskin_button';
		this._google__img.setAttribute('src',basePath + 'images/google.png');
		this._google__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._google__img.className='ggskin ggskin_button';
		this._google__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._google__img);
		this._google.appendChild(this._google__img);
		this._google.ggId="google";
		this._google.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._google.ggVisible=true;
		this._google.className='ggskin ggskin_button ';
		this._google.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 150px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		this._google.setAttribute('style',hs);
		this._google.style[domTransform + 'Origin']='50% 50%';
		me._google.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._google.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._google.onclick=function (e) {
			window.open('https://plusone.google.com/_/+1/confirm?url=' + location.href);
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._google.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">SHARE ON GOOGLE+<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">SHARE ON GOOGLE+<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['google']=true;
		}
		this._google.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me.elementMouseOver['google']=false;
		}
		this._google.ontouchend=function (e) {
			me.elementMouseOver['google']=false;
		}
		me._google.ggCurrentLogicStatePosition = -1;
		this._google.ggUpdateConditionTimer=function () {
			var newLogicStatePosition;
			if (
				(me.elementMouseOver['google'] == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._google.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._google.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._google.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
				if (me._google.ggCurrentLogicStatePosition == 0) {
					me._google.style.left='150px';
					me._google.style.top='8px';
				}
				else {
					me._google.style.left='150px';
					me._google.style.top='0px';
				}
			}
		}
		this._google.ggUpdatePosition=function (useTransition) {
		}
		this._share_icons.appendChild(this._google);
		this._vk=document.createElement('div');
		this._vk__img=document.createElement('img');
		this._vk__img.className='ggskin ggskin_button';
		this._vk__img.setAttribute('src',basePath + 'images/vk.png');
		this._vk__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._vk__img.className='ggskin ggskin_button';
		this._vk__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._vk__img);
		this._vk.appendChild(this._vk__img);
		this._vk.ggId="vk";
		this._vk.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._vk.ggVisible=true;
		this._vk.className='ggskin ggskin_button ';
		this._vk.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 100px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		this._vk.setAttribute('style',hs);
		this._vk.style[domTransform + 'Origin']='50% 50%';
		me._vk.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._vk.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._vk.onclick=function (e) {
			me.player.openUrl("https:\/\/vk.com\/share.php?url=http:\/\/pindora.com\/car_panoramas\/maybach\/tour.html","");
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._vk.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">SHARE ON VKONTAKTE<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">SHARE ON VKONTAKTE<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['vk']=true;
		}
		this._vk.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me.elementMouseOver['vk']=false;
		}
		this._vk.ontouchend=function (e) {
			me.elementMouseOver['vk']=false;
		}
		me._vk.ggCurrentLogicStatePosition = -1;
		this._vk.ggUpdateConditionTimer=function () {
			var newLogicStatePosition;
			if (
				(me.elementMouseOver['vk'] == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._vk.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._vk.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._vk.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
				if (me._vk.ggCurrentLogicStatePosition == 0) {
					me._vk.style.left='100px';
					me._vk.style.top='8px';
				}
				else {
					me._vk.style.left='100px';
					me._vk.style.top='0px';
				}
			}
		}
		this._vk.ggUpdatePosition=function (useTransition) {
		}
		this._share_icons.appendChild(this._vk);
		this._twitter=document.createElement('div');
		this._twitter__img=document.createElement('img');
		this._twitter__img.className='ggskin ggskin_button';
		this._twitter__img.setAttribute('src',basePath + 'images/twitter.png');
		this._twitter__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._twitter__img.className='ggskin ggskin_button';
		this._twitter__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._twitter__img);
		this._twitter.appendChild(this._twitter__img);
		this._twitter.ggId="twitter";
		this._twitter.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._twitter.ggVisible=true;
		this._twitter.className='ggskin ggskin_button ';
		this._twitter.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 50px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		this._twitter.setAttribute('style',hs);
		this._twitter.style[domTransform + 'Origin']='50% 50%';
		me._twitter.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._twitter.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._twitter.onclick=function (e) {
			me.player.openUrl("https:\/\/twitter.com\/share?url=http:\/\/pindora.com\/car_panoramas\/maybach\/tour.html","");
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._twitter.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\"> TWEET<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\"> TWEET<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['twitter']=true;
		}
		this._twitter.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me.elementMouseOver['twitter']=false;
		}
		this._twitter.ontouchend=function (e) {
			me.elementMouseOver['twitter']=false;
		}
		me._twitter.ggCurrentLogicStatePosition = -1;
		this._twitter.ggUpdateConditionTimer=function () {
			var newLogicStatePosition;
			if (
				(me.elementMouseOver['twitter'] == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._twitter.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._twitter.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._twitter.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
				if (me._twitter.ggCurrentLogicStatePosition == 0) {
					me._twitter.style.left='50px';
					me._twitter.style.top='8px';
				}
				else {
					me._twitter.style.left='50px';
					me._twitter.style.top='0px';
				}
			}
		}
		this._twitter.ggUpdatePosition=function (useTransition) {
		}
		this._share_icons.appendChild(this._twitter);
		this._fb=document.createElement('div');
		this._fb__img=document.createElement('img');
		this._fb__img.className='ggskin ggskin_button';
		this._fb__img.setAttribute('src',basePath + 'images/fb.png');
		this._fb__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._fb__img.className='ggskin ggskin_button';
		this._fb__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._fb__img);
		this._fb.appendChild(this._fb__img);
		this._fb.ggId="fb";
		this._fb.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fb.ggVisible=true;
		this._fb.className='ggskin ggskin_button ';
		this._fb.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		this._fb.setAttribute('style',hs);
		this._fb.style[domTransform + 'Origin']='50% 50%';
		me._fb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._fb.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._fb.onclick=function (e) {
			window.open('https://www.facebook.com/sharer/sharer.php?u=' + location.href);
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
		}
		this._fb.onmouseover=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility=(Number(me._tooltip.style.opacity)>0||!me._tooltip.style.opacity)?'inherit':'hidden';
			me._tooltip.ggVisible=true;
			me._tooltip.ggText="<b><span style=\"font-family: Copperplate Gothic;\">SHARE ON FACEBOOK<\/span><\/b>";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">SHARE ON FACEBOOK<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['fb']=true;
		}
		this._fb.onmouseout=function (e) {
			me._tooltip.style[domTransition]='none';
			me._tooltip.style.visibility='hidden';
			me._tooltip.ggVisible=false;
			me.elementMouseOver['fb']=false;
		}
		this._fb.ontouchend=function (e) {
			me.elementMouseOver['fb']=false;
		}
		me._fb.ggCurrentLogicStatePosition = -1;
		this._fb.ggUpdateConditionTimer=function () {
			var newLogicStatePosition;
			if (
				(me.elementMouseOver['fb'] == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._fb.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._fb.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._fb.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
				if (me._fb.ggCurrentLogicStatePosition == 0) {
					me._fb.style.left='0px';
					me._fb.style.top='8px';
				}
				else {
					me._fb.style.left='0px';
					me._fb.style.top='0px';
				}
			}
		}
		this._fb.ggUpdatePosition=function (useTransition) {
		}
		this._share_icons.appendChild(this._fb);
		this.divSkin.appendChild(this._share_icons);
		this._tooltip2=document.createElement('div');
		this._tooltip2__text=document.createElement('div');
		this._tooltip2.className='ggskin ggskin_textdiv';
		this._tooltip2.ggTextDiv=this._tooltip2__text;
		this._tooltip2.ggId="tooltip2";
		this._tooltip2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tooltip2.ggVisible=false;
		this._tooltip2.className='ggskin ggskin_text ';
		this._tooltip2.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -17px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 198px;';
		hs+='pointer-events:auto;';
		hs+='font-size: 9pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
		this._tooltip2.setAttribute('style',hs);
		this._tooltip2.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 198px;';
		hs+='height: 25px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tooltip2__text.setAttribute('style',hs);
		this._tooltip2__text.innerHTML="";
		this._tooltip2.appendChild(this._tooltip2__text);
		me._tooltip2.ggIsActive=function() {
			return false;
		}
		me._tooltip2.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._tooltip2.ggUpdatePosition=function (useTransition) {
		}
		this.divSkin.appendChild(this._tooltip2);
		this._tooltip=document.createElement('div');
		this._tooltip__text=document.createElement('div');
		this._tooltip.className='ggskin ggskin_textdiv';
		this._tooltip.ggTextDiv=this._tooltip__text;
		this._tooltip.ggId="tooltip";
		this._tooltip.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tooltip.ggVisible=false;
		this._tooltip.className='ggskin ggskin_text ';
		this._tooltip.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -110px;';
		hs+='position : absolute;';
		hs+='top : -45px;';
		hs+='visibility : hidden;';
		hs+='width : 198px;';
		hs+='pointer-events:auto;';
		hs+='font-size: 9pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
		this._tooltip.setAttribute('style',hs);
		this._tooltip.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 198px;';
		hs+='height: 25px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tooltip__text.setAttribute('style',hs);
		this._tooltip__text.innerHTML="";
		this._tooltip.appendChild(this._tooltip__text);
		me._tooltip.ggIsActive=function() {
			return false;
		}
		me._tooltip.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._tooltip.ggUpdatePosition=function (useTransition) {
		}
		this.divSkin.appendChild(this._tooltip);
		this._tooltip_r=document.createElement('div');
		this._tooltip_r__text=document.createElement('div');
		this._tooltip_r.className='ggskin ggskin_textdiv';
		this._tooltip_r.ggTextDiv=this._tooltip_r__text;
		this._tooltip_r.ggId="tooltip r";
		this._tooltip_r.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tooltip_r.ggVisible=false;
		this._tooltip_r.className='ggskin ggskin_text ';
		this._tooltip_r.ggType='text';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -185px;';
		hs+='position : absolute;';
		hs+='top : -45px;';
		hs+='visibility : hidden;';
		hs+='width : 198px;';
		hs+='pointer-events:auto;';
		hs+='font-size: 9pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
		this._tooltip_r.setAttribute('style',hs);
		this._tooltip_r.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 198px;';
		hs+='height: 25px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: right;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tooltip_r__text.setAttribute('style',hs);
		this._tooltip_r__text.innerHTML="";
		this._tooltip_r.appendChild(this._tooltip_r__text);
		me._tooltip_r.ggIsActive=function() {
			return false;
		}
		me._tooltip_r.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._tooltip_r.ggUpdatePosition=function (useTransition) {
		}
		this.divSkin.appendChild(this._tooltip_r);
		this._hotspots=document.createElement('div');
		this._hotspots.ggId="hotspots";
		this._hotspots.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._hotspots.ggVisible=true;
		this._hotspots.className='ggskin ggskin_container ';
		this._hotspots.ggType='container';
		hs ='';
		hs+='height : 48px;';
		hs+='left : 25px;';
		hs+='position : absolute;';
		hs+='top : 105px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:none;';
		this._hotspots.setAttribute('style',hs);
		this._hotspots.style[domTransform + 'Origin']='50% 50%';
		me._hotspots.ggIsActive=function() {
			return false;
		}
		me._hotspots.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._hotspots.ggUpdatePosition=function (useTransition) {
		}
		this.divSkin.appendChild(this._hotspots);
		this._light=document.createElement('div');
		this._light.ggId="light";
		this._light.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._light.ggVisible=true;
		this._light.className='ggskin ggskin_container ';
		this._light.ggType='container';
		hs ='';
		hs+='height : 60px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 8px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:none;';
		this._light.setAttribute('style',hs);
		this._light.style[domTransform + 'Origin']='50% 50%';
		me._light.ggIsActive=function() {
			return false;
		}
		me._light.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._light.ggUpdatePosition=function (useTransition) {
		}
		this._b_off=document.createElement('div');
		this._b_off__img=document.createElement('img');
		this._b_off__img.className='ggskin ggskin_button';
		this._b_off__img.setAttribute('src',basePath + 'images/b_off.png');
		this._b_off__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._b_off__img.className='ggskin ggskin_button';
		this._b_off__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._b_off__img);
		this._b_off.appendChild(this._b_off__img);
		this._b_off.ggId="b off";
		this._b_off.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._b_off.ggVisible=false;
		this._b_off.className='ggskin ggskin_button ';
		this._b_off.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		this._b_off.setAttribute('style',hs);
		this._b_off.style[domTransform + 'Origin']='50% 50%';
		me._b_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._b_off.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._b_off.onclick=function (e) {
			me.player.openNext("{node2}","$cur");
			me.player.playSound("Element01","0");
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
		}
		this._b_off.onmouseover=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility=(Number(me._tooltip2.style.opacity)>0||!me._tooltip2.style.opacity)?'inherit':'hidden';
			me._tooltip2.ggVisible=true;
			me._tooltip2.ggText="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING ON<\/span><\/b>";
			me._tooltip2.ggTextDiv.innerHTML=me._tooltip2.ggText;
			if (me._tooltip2.ggUpdateText) {
				me._tooltip2.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING ON<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip2.ggUpdatePosition) {
				me._tooltip2.ggUpdatePosition();
			}
			me._tooltip2.ggTextDiv.scrollTop = 0;
			me._b_off__img.src=basePath + 'images/b_off__o.png';
		}
		this._b_off.onmouseout=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
			me._b_off__img.src=basePath + 'images/b_off.png';
		}
		me._b_off.ggCurrentLogicStateVisible = -1;
		this._b_off.ggUpdateConditionNodeChange=function () {
			var newLogicStateVisible;
			if (
				(me.ggUserdata.tags.indexOf("bof") != -1)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._b_off.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._b_off.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._b_off.style[domTransition]='';
				if (me._b_off.ggCurrentLogicStateVisible == 0) {
					me._b_off.style.visibility=(Number(me._b_off.style.opacity)>0||!me._b_off.style.opacity)?'inherit':'hidden';
					me._b_off.ggVisible=true;
				}
				else {
					me._b_off.style.visibility="hidden";
					me._b_off.ggVisible=false;
				}
			}
		}
		this._b_off.ggUpdatePosition=function (useTransition) {
		}
		this._b_off.ggNodeChange=function () {
			me._b_off.ggUpdateConditionNodeChange();
		}
		this._light.appendChild(this._b_off);
		this._b_on=document.createElement('div');
		this._b_on__img=document.createElement('img');
		this._b_on__img.className='ggskin ggskin_button';
		this._b_on__img.setAttribute('src',basePath + 'images/b_on.png');
		this._b_on__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._b_on__img.className='ggskin ggskin_button';
		this._b_on__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._b_on__img);
		this._b_on.appendChild(this._b_on__img);
		this._b_on.ggId="b on";
		this._b_on.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._b_on.ggVisible=false;
		this._b_on.className='ggskin ggskin_button ';
		this._b_on.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		this._b_on.setAttribute('style',hs);
		this._b_on.style[domTransform + 'Origin']='50% 50%';
		me._b_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._b_on.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._b_on.onclick=function (e) {
			me.player.openNext("{node1}","$cur");
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
		}
		this._b_on.onmouseover=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility=(Number(me._tooltip2.style.opacity)>0||!me._tooltip2.style.opacity)?'inherit':'hidden';
			me._tooltip2.ggVisible=true;
			me._tooltip2.ggText="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING OFF<\/span><\/b>";
			me._tooltip2.ggTextDiv.innerHTML=me._tooltip2.ggText;
			if (me._tooltip2.ggUpdateText) {
				me._tooltip2.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING OFF<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip2.ggUpdatePosition) {
				me._tooltip2.ggUpdatePosition();
			}
			me._tooltip2.ggTextDiv.scrollTop = 0;
			me._b_on__img.src=basePath + 'images/b_on__o.png';
		}
		this._b_on.onmouseout=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
			me._b_on__img.src=basePath + 'images/b_on.png';
		}
		me._b_on.ggCurrentLogicStateVisible = -1;
		this._b_on.ggUpdateConditionNodeChange=function () {
			var newLogicStateVisible;
			if (
				(me.ggUserdata.tags.indexOf("bon") != -1)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._b_on.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._b_on.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._b_on.style[domTransition]='';
				if (me._b_on.ggCurrentLogicStateVisible == 0) {
					me._b_on.style.visibility=(Number(me._b_on.style.opacity)>0||!me._b_on.style.opacity)?'inherit':'hidden';
					me._b_on.ggVisible=true;
				}
				else {
					me._b_on.style.visibility="hidden";
					me._b_on.ggVisible=false;
				}
			}
		}
		this._b_on.ggUpdatePosition=function (useTransition) {
		}
		this._b_on.ggNodeChange=function () {
			me._b_on.ggUpdateConditionNodeChange();
		}
		this._light.appendChild(this._b_on);
		this._f_off=document.createElement('div');
		this._f_off__img=document.createElement('img');
		this._f_off__img.className='ggskin ggskin_button';
		this._f_off__img.setAttribute('src',basePath + 'images/f_off.png');
		this._f_off__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._f_off__img.className='ggskin ggskin_button';
		this._f_off__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._f_off__img);
		this._f_off.appendChild(this._f_off__img);
		this._f_off.ggId="f off";
		this._f_off.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._f_off.ggVisible=false;
		this._f_off.className='ggskin ggskin_button ';
		this._f_off.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		this._f_off.setAttribute('style',hs);
		this._f_off.style[domTransform + 'Origin']='50% 50%';
		me._f_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._f_off.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._f_off.onclick=function (e) {
			me.player.openNext("{node4}","$cur");
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
		}
		this._f_off.onmouseover=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility=(Number(me._tooltip2.style.opacity)>0||!me._tooltip2.style.opacity)?'inherit':'hidden';
			me._tooltip2.ggVisible=true;
			me._tooltip2.ggText="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING ON<\/span><\/b>";
			me._tooltip2.ggTextDiv.innerHTML=me._tooltip2.ggText;
			if (me._tooltip2.ggUpdateText) {
				me._tooltip2.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING ON<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip2.ggUpdatePosition) {
				me._tooltip2.ggUpdatePosition();
			}
			me._tooltip2.ggTextDiv.scrollTop = 0;
			me._f_off__img.src=basePath + 'images/f_off__o.png';
		}
		this._f_off.onmouseout=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
			me._f_off__img.src=basePath + 'images/f_off.png';
		}
		me._f_off.ggCurrentLogicStateVisible = -1;
		this._f_off.ggUpdateConditionNodeChange=function () {
			var newLogicStateVisible;
			if (
				(me.ggUserdata.tags.indexOf("fof") != -1)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._f_off.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._f_off.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._f_off.style[domTransition]='';
				if (me._f_off.ggCurrentLogicStateVisible == 0) {
					me._f_off.style.visibility=(Number(me._f_off.style.opacity)>0||!me._f_off.style.opacity)?'inherit':'hidden';
					me._f_off.ggVisible=true;
				}
				else {
					me._f_off.style.visibility="hidden";
					me._f_off.ggVisible=false;
				}
			}
		}
		this._f_off.ggUpdatePosition=function (useTransition) {
		}
		this._f_off.ggNodeChange=function () {
			me._f_off.ggUpdateConditionNodeChange();
		}
		this._light.appendChild(this._f_off);
		this._f_on=document.createElement('div');
		this._f_on__img=document.createElement('img');
		this._f_on__img.className='ggskin ggskin_button';
		this._f_on__img.setAttribute('src',basePath + 'images/f_on.png');
		this._f_on__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._f_on__img.className='ggskin ggskin_button';
		this._f_on__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._f_on__img);
		this._f_on.appendChild(this._f_on__img);
		this._f_on.ggId="f on";
		this._f_on.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._f_on.ggVisible=false;
		this._f_on.className='ggskin ggskin_button ';
		this._f_on.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		this._f_on.setAttribute('style',hs);
		this._f_on.style[domTransform + 'Origin']='50% 50%';
		me._f_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._f_on.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._f_on.onclick=function (e) {
			me.player.openNext("{node3}","$cur");
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
		}
		this._f_on.onmouseover=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility=(Number(me._tooltip2.style.opacity)>0||!me._tooltip2.style.opacity)?'inherit':'hidden';
			me._tooltip2.ggVisible=true;
			me._tooltip2.ggText="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING OFF<\/span><\/b>";
			me._tooltip2.ggTextDiv.innerHTML=me._tooltip2.ggText;
			if (me._tooltip2.ggUpdateText) {
				me._tooltip2.ggUpdateText=function() {
					var hs="<b><span style=\"font-family: Copperplate Gothic;\">LIGHTING OFF<\/span><\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip2.ggUpdatePosition) {
				me._tooltip2.ggUpdatePosition();
			}
			me._tooltip2.ggTextDiv.scrollTop = 0;
			me._f_on__img.src=basePath + 'images/f_on__o.png';
		}
		this._f_on.onmouseout=function (e) {
			me._tooltip2.style[domTransition]='none';
			me._tooltip2.style.visibility='hidden';
			me._tooltip2.ggVisible=false;
			me._f_on__img.src=basePath + 'images/f_on.png';
		}
		me._f_on.ggCurrentLogicStateVisible = -1;
		this._f_on.ggUpdateConditionNodeChange=function () {
			var newLogicStateVisible;
			if (
				(me.ggUserdata.tags.indexOf("fon") != -1)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._f_on.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._f_on.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._f_on.style[domTransition]='';
				if (me._f_on.ggCurrentLogicStateVisible == 0) {
					me._f_on.style.visibility=(Number(me._f_on.style.opacity)>0||!me._f_on.style.opacity)?'inherit':'hidden';
					me._f_on.ggVisible=true;
				}
				else {
					me._f_on.style.visibility="hidden";
					me._f_on.ggVisible=false;
				}
			}
		}
		this._f_on.ggUpdatePosition=function (useTransition) {
		}
		this._f_on.ggNodeChange=function () {
			me._f_on.ggUpdateConditionNodeChange();
		}
		this._light.appendChild(this._f_on);
		this.divSkin.appendChild(this._light);
		this._intro_bkgd=document.createElement('div');
		this._intro_bkgd.ggTimestamp=this.ggCurrentTime;
		this._intro_bkgd.ggLastIsActive=true;
		this._intro_bkgd.ggTimeout=6500;
		this._intro_bkgd.ggId="intro bkgd";
		this._intro_bkgd.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._intro_bkgd.ggVisible=true;
		this._intro_bkgd.className='ggskin ggskin_timer ';
		this._intro_bkgd.ggType='timer';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:none;';
		this._intro_bkgd.setAttribute('style',hs);
		this._intro_bkgd.style[domTransform + 'Origin']='50% 50%';
		me._intro_bkgd.ggIsActive=function() {
			return (me._intro_bkgd.ggTimestamp + me._intro_bkgd.ggTimeout) >= me.ggCurrentTime;
		}
		me._intro_bkgd.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		me._intro_bkgd.ggCurrentLogicStateAlpha = -1;
		this._intro_bkgd.ggUpdateConditionTimer=function () {
			var newLogicStateAlpha;
			if (
				(me._intro_bkgd.ggIsActive() == false)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._intro_bkgd.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._intro_bkgd.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._intro_bkgd.style[domTransition]='opacity 2000ms ease 0ms, visibility 2000ms ease 0ms';
				if (me._intro_bkgd.ggCurrentLogicStateAlpha == 0) {
					me._intro_bkgd.style.visibility="hidden";
					me._intro_bkgd.style.opacity=0;
				}
				else {
					me._intro_bkgd.style.visibility=me._intro_bkgd.ggVisible?'inherit':'hidden';
					me._intro_bkgd.style.opacity=1;
				}
			}
		}
		this._intro_bkgd.ggUpdatePosition=function (useTransition) {
		}
		this._rectangle_1=document.createElement('div');
		this._rectangle_1.ggId="Rectangle 1";
		this._rectangle_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._rectangle_1.ggVisible=true;
		this._rectangle_1.className='ggskin ggskin_rectangle ';
		this._rectangle_1.ggType='rectangle';
		hs ='';
		hs+='background : #000000;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		this._rectangle_1.setAttribute('style',hs);
		this._rectangle_1.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._rectangle_1.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._rectangle_1.ggUpdatePosition=function (useTransition) {
		}
		this._intro_bkgd.appendChild(this._rectangle_1);
		this._image_3=document.createElement('div');
		this._image_3__img=document.createElement('img');
		this._image_3__img.className='ggskin ggskin_image';
		this._image_3__img.setAttribute('src',basePath + 'images/image_3.png');
		this._image_3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._image_3__img.className='ggskin ggskin_image';
		this._image_3__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._image_3__img);
		this._image_3.appendChild(this._image_3__img);
		this._image_3.ggId="Image 3";
		this._image_3.ggTop=-53;
		this._image_3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._image_3.ggVisible=true;
		this._image_3.className='ggskin ggskin_image ';
		this._image_3.ggType='image';
		hs ='';
		hs+='height : 48px;';
		hs+='left : 4px;';
		hs+='position : absolute;';
		hs+='top : -53px;';
		hs+='visibility : inherit;';
		hs+='width : 207px;';
		hs+='pointer-events:auto;';
		this._image_3.setAttribute('style',hs);
		this._image_3.style[domTransform + 'Origin']='50% 50%';
		me._image_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._image_3.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._image_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._intro_bkgd.appendChild(this._image_3);
		this.divSkin.appendChild(this._intro_bkgd);
		this._intro_logo_master=document.createElement('div');
		this._intro_logo_master.ggTimestamp=this.ggCurrentTime;
		this._intro_logo_master.ggLastIsActive=true;
		this._intro_logo_master.ggTimeout=7000;
		this._intro_logo_master.ggId="intro logo master";
		this._intro_logo_master.ggLeft=-408;
		this._intro_logo_master.ggTop=-35;
		this._intro_logo_master.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._intro_logo_master.ggVisible=true;
		this._intro_logo_master.className='ggskin ggskin_timer ';
		this._intro_logo_master.ggType='timer';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -408px;';
		hs+='position : absolute;';
		hs+='top : -35px;';
		hs+='visibility : inherit;';
		hs+='width : 816px;';
		hs+='pointer-events:none;';
		this._intro_logo_master.setAttribute('style',hs);
		this._intro_logo_master.style[domTransform + 'Origin']='50% 50%';
		me._intro_logo_master.ggIsActive=function() {
			return (me._intro_logo_master.ggTimestamp + me._intro_logo_master.ggTimeout) >= me.ggCurrentTime;
		}
		me._intro_logo_master.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		me._intro_logo_master.ggCurrentLogicStateScaling = -1;
		me._intro_logo_master.ggCurrentLogicStateVisible = -1;
		this._intro_logo_master.ggUpdateConditionResize=function () {
			var newLogicStateScaling;
			if (
				(me.player.getViewerSize().width < 820) && 
				(me.player.getViewerSize().width >= 600)
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				(me.player.getViewerSize().width < 600)
			)
			{
				newLogicStateScaling = 1;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._intro_logo_master.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._intro_logo_master.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._intro_logo_master.style[domTransition]='' + cssPrefix + 'transform none';
				if (me._intro_logo_master.ggCurrentLogicStateScaling == 0) {
					me._intro_logo_master.ggParameter.sx = 0.75;
					me._intro_logo_master.ggParameter.sy = 0.75;
					me._intro_logo_master.style[domTransform]=parameterToTransform(me._intro_logo_master.ggParameter);
				}
				else if (me._intro_logo_master.ggCurrentLogicStateScaling == 1) {
					me._intro_logo_master.ggParameter.sx = 0.5;
					me._intro_logo_master.ggParameter.sy = 0.5;
					me._intro_logo_master.style[domTransform]=parameterToTransform(me._intro_logo_master.ggParameter);
				}
				else {
					me._intro_logo_master.ggParameter.sx = 1;
					me._intro_logo_master.ggParameter.sy = 1;
					me._intro_logo_master.style[domTransform]=parameterToTransform(me._intro_logo_master.ggParameter);
				}
			}
		}
		this._intro_logo_master.ggUpdateConditionTimer=function () {
			var newLogicStateVisible;
			if (
				(me._intro_logo_master.ggIsActive() == false)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._intro_logo_master.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._intro_logo_master.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._intro_logo_master.style[domTransition]='' + cssPrefix + 'transform none';
				if (me._intro_logo_master.ggCurrentLogicStateVisible == 0) {
					me._intro_logo_master.style.visibility="hidden";
					me._intro_logo_master.ggVisible=false;
				}
				else {
					me._intro_logo_master.style.visibility=(Number(me._intro_logo_master.style.opacity)>0||!me._intro_logo_master.style.opacity)?'inherit':'hidden';
					me._intro_logo_master.ggVisible=true;
				}
			}
		}
		this._intro_logo_master.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
			me._intro_logo_master.ggUpdateConditionResize();
		}
		this._intro_logo3=document.createElement('div');
		this._intro_logo3.ggTimestamp=this.ggCurrentTime;
		this._intro_logo3.ggLastIsActive=true;
		this._intro_logo3.ggTimeout=2400;
		this._intro_logo3.ggId="intro logo3";
		this._intro_logo3.ggLeft=-408;
		this._intro_logo3.ggTop=-35;
		this._intro_logo3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._intro_logo3.ggVisible=true;
		this._intro_logo3.className='ggskin ggskin_timer ';
		this._intro_logo3.ggType='timer';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -408px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -35px;';
		hs+='visibility : hidden;';
		hs+='width : 816px;';
		hs+='pointer-events:none;';
		this._intro_logo3.setAttribute('style',hs);
		this._intro_logo3.style[domTransform + 'Origin']='50% 50%';
		me._intro_logo3.ggIsActive=function() {
			return (me._intro_logo3.ggTimestamp + me._intro_logo3.ggTimeout) >= me.ggCurrentTime;
		}
		me._intro_logo3.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		me._intro_logo3.ggCurrentLogicStateAlpha = -1;
		this._intro_logo3.ggUpdateConditionTimer=function () {
			var newLogicStateAlpha;
			if (
				(me._intro_logo3.ggIsActive() == false)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._intro_logo3.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._intro_logo3.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._intro_logo3.style[domTransition]='opacity 3000ms ease 0ms, visibility 3000ms ease 0ms';
				if (me._intro_logo3.ggCurrentLogicStateAlpha == 0) {
					me._intro_logo3.style.visibility=me._intro_logo3.ggVisible?'inherit':'hidden';
					me._intro_logo3.style.opacity=1;
				}
				else {
					me._intro_logo3.style.visibility="hidden";
					me._intro_logo3.style.opacity=0;
				}
			}
		}
		this._intro_logo3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._intro_logo1=document.createElement('div');
		this._intro_logo1.ggTimestamp=this.ggCurrentTime;
		this._intro_logo1.ggLastIsActive=true;
		this._intro_logo1.ggTimeout=5000;
		this._intro_logo1.ggId="intro logo1";
		this._intro_logo1.ggLeft=-408;
		this._intro_logo1.ggTop=-35;
		this._intro_logo1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._intro_logo1.ggVisible=true;
		this._intro_logo1.className='ggskin ggskin_timer ';
		this._intro_logo1.ggType='timer';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -408px;';
		hs+='position : absolute;';
		hs+='top : -35px;';
		hs+='visibility : inherit;';
		hs+='width : 816px;';
		hs+='pointer-events:none;';
		this._intro_logo1.setAttribute('style',hs);
		this._intro_logo1.style[domTransform + 'Origin']='50% 50%';
		me._intro_logo1.ggIsActive=function() {
			return (me._intro_logo1.ggTimestamp + me._intro_logo1.ggTimeout) >= me.ggCurrentTime;
		}
		me._intro_logo1.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		me._intro_logo1.ggCurrentLogicStateAlpha = -1;
		this._intro_logo1.ggUpdateConditionTimer=function () {
			var newLogicStateAlpha;
			if (
				(me._intro_logo1.ggIsActive() == false)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._intro_logo1.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._intro_logo1.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._intro_logo1.style[domTransition]='opacity 2000ms ease 0ms, visibility 2000ms ease 0ms';
				if (me._intro_logo1.ggCurrentLogicStateAlpha == 0) {
					me._intro_logo1.style.visibility="hidden";
					me._intro_logo1.style.opacity=0;
				}
				else {
					me._intro_logo1.style.visibility=me._intro_logo1.ggVisible?'inherit':'hidden';
					me._intro_logo1.style.opacity=1;
				}
			}
		}
		this._intro_logo1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._intro_logo2=document.createElement('div');
		this._intro_logo2.ggTimestamp=this.ggCurrentTime;
		this._intro_logo2.ggLastIsActive=true;
		this._intro_logo2.ggTimeout=1000;
		this._intro_logo2.ggId="intro logo2";
		this._intro_logo2.ggLeft=-408;
		this._intro_logo2.ggTop=-35;
		this._intro_logo2.ggParameter={ rx:0,ry:0,a:0,sx:0.85,sy:0.85 };
		this._intro_logo2.ggVisible=true;
		this._intro_logo2.className='ggskin ggskin_timer ';
		this._intro_logo2.ggType='timer';
		hs ='';
		hs+='height : 70px;';
		hs+='left : -408px;';
		hs+='position : absolute;';
		hs+='top : -35px;';
		hs+='visibility : inherit;';
		hs+='width : 816px;';
		hs+='pointer-events:none;';
		this._intro_logo2.setAttribute('style',hs);
		this._intro_logo2.style[domTransform + 'Origin']='50% 50%';
		this._intro_logo2.style[domTransform]=parameterToTransform(this._intro_logo2.ggParameter);
		me._intro_logo2.ggIsActive=function() {
			return (me._intro_logo2.ggTimestamp + me._intro_logo2.ggTimeout) >= me.ggCurrentTime;
		}
		me._intro_logo2.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		me._intro_logo2.ggCurrentLogicStateScaling = -1;
		this._intro_logo2.ggUpdateConditionTimer=function () {
			var newLogicStateScaling;
			if (
				(me._intro_logo2.ggIsActive() == false)
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._intro_logo2.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._intro_logo2.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._intro_logo2.style[domTransition]='' + cssPrefix + 'transform 6000ms ease 0ms';
				if (me._intro_logo2.ggCurrentLogicStateScaling == 0) {
					me._intro_logo2.ggParameter.sx = 1;
					me._intro_logo2.ggParameter.sy = 1;
					me._intro_logo2.style[domTransform]=parameterToTransform(me._intro_logo2.ggParameter);
				}
				else {
					me._intro_logo2.ggParameter.sx = 0.85;
					me._intro_logo2.ggParameter.sy = 0.85;
					me._intro_logo2.style[domTransform]=parameterToTransform(me._intro_logo2.ggParameter);
				}
			}
		}
		this._intro_logo2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._image_2=document.createElement('div');
		this._image_2__img=document.createElement('img');
		this._image_2__img.className='ggskin ggskin_image';
		this._image_2__img.setAttribute('src',basePath + 'images/image_2.png');
		this._image_2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._image_2__img.className='ggskin ggskin_image';
		this._image_2__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._image_2__img);
		this._image_2.appendChild(this._image_2__img);
		this._image_2.ggId="Image 2";
		this._image_2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._image_2.ggVisible=true;
		this._image_2.className='ggskin ggskin_image ';
		this._image_2.ggType='image';
		hs ='';
		hs+='height : 140px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 816px;';
		hs+='pointer-events:auto;';
		this._image_2.setAttribute('style',hs);
		this._image_2.style[domTransform + 'Origin']='50% 50%';
		me._image_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._image_2.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._image_2.ggUpdatePosition=function (useTransition) {
		}
		this._intro_logo2.appendChild(this._image_2);
		this._intro_logo1.appendChild(this._intro_logo2);
		this._intro_logo3.appendChild(this._intro_logo1);
		this._intro_logo_master.appendChild(this._intro_logo3);
		this.divSkin.appendChild(this._intro_logo_master);
		this._intro_logo=document.createElement('div');
		this._intro_logo.ggTimestamp=this.ggCurrentTime;
		this._intro_logo.ggLastIsActive=true;
		this._intro_logo.ggTimeout=2500;
		this._intro_logo.ggId="intro logo";
		this._intro_logo.ggLeft=-163;
		this._intro_logo.ggTop=-163;
		this._intro_logo.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._intro_logo.ggVisible=true;
		this._intro_logo.className='ggskin ggskin_timer ';
		this._intro_logo.ggType='timer';
		hs ='';
		hs+='height : 327px;';
		hs+='left : -163px;';
		hs+='position : absolute;';
		hs+='top : -163px;';
		hs+='visibility : inherit;';
		hs+='width : 327px;';
		hs+='pointer-events:none;';
		this._intro_logo.setAttribute('style',hs);
		this._intro_logo.style[domTransform + 'Origin']='50% 50%';
		me._intro_logo.ggIsActive=function() {
			return (me._intro_logo.ggTimestamp + me._intro_logo.ggTimeout) >= me.ggCurrentTime;
		}
		me._intro_logo.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		me._intro_logo.ggCurrentLogicStateVisible = -1;
		this._intro_logo.ggUpdateConditionTimer=function () {
			var newLogicStateVisible;
			if (
				(me._intro_logo.ggIsActive() == false)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._intro_logo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._intro_logo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._intro_logo.style[domTransition]='';
				if (me._intro_logo.ggCurrentLogicStateVisible == 0) {
					me._intro_logo.style.visibility="hidden";
					me._intro_logo.ggVisible=false;
				}
				else {
					me._intro_logo.style.visibility=(Number(me._intro_logo.style.opacity)>0||!me._intro_logo.style.opacity)?'inherit':'hidden';
					me._intro_logo.ggVisible=true;
				}
			}
		}
		this._intro_logo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._external_1=document.createElement('div');
		this._external_1__img=document.createElement('img');
		this._external_1__img.className='ggskin ggskin_external';
		this._external_1__img.onload=function() {me._external_1.ggUpdatePosition();}
		this._external_1__img.setAttribute('src',basePath + 'logo.gif');
		this._external_1__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._external_1__img);
		hs ='';
		this._external_1.appendChild(this._external_1__img);
		this._external_1.ggId="External 1";
		this._external_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._external_1.ggVisible=true;
		this._external_1.className='ggskin ggskin_external ';
		this._external_1.ggType='external';
		hs ='';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 326px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 326px;';
		hs+='pointer-events:auto;';
		this._external_1.setAttribute('style',hs);
		this._external_1.style[domTransform + 'Origin']='50% 50%';
		me._external_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._external_1.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._external_1.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._external_1.clientWidth;
			var parentHeight = me._external_1.clientHeight;
			var aspectRatioDiv = me._external_1.clientWidth / me._external_1.clientHeight;
			var aspectRatioImg = me._external_1__img.naturalWidth / me._external_1__img.naturalHeight;
			if (me._external_1__img.naturalWidth < parentWidth) parentWidth = me._external_1__img.naturalWidth;
			if (me._external_1__img.naturalHeight < parentHeight) parentHeight = me._external_1__img.naturalHeight;
			var currentWidth = me._external_1__img.naturalWidth;
			var currentHeight = me._external_1__img.naturalHeight;
			me._external_1__img.setAttribute('style','position: absolute; left: 50%; margin-left: -' + currentWidth/2 + 'px; top: 50%; margin-top: -' + currentHeight/2 + 'px;-webkit-user-drag:none;pointer-events:none;border-radius:-1px;');
		}
		this._intro_logo.appendChild(this._external_1);
		this.divSkin.appendChild(this._intro_logo);
		this.preloadImages();
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.ggHotspotCallChildFunctions=function(functionname) {
		var stack = me.player.getCurrentPointHotspots();
		while (stack.length > 0) {
			var e = stack.pop();
			if (typeof e[functionname] == 'function') {
				e[functionname]();
			}
			if(e.hasChildNodes()) {
				for(var i=0; i<e.childNodes.length; i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	this.changeActiveNode=function(id) {
		me.ggUserdata=me.player.userdata;
		me._gyro_off.ggNodeChange();
		me._gyro_on.ggNodeChange();
		me._b_off.ggNodeChange();
		me._b_on.ggNodeChange();
		me._f_off.ggNodeChange();
		me._f_on.ggNodeChange();
		me.ggHotspotCallChildFunctions('ggNodeChange');
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		me.ggCurrentTime=new Date().getTime();
		me._play.ggUpdateConditionTimer();
		me._pause.ggUpdateConditionTimer();
		if (me.elementMouseOver['share_close']) {
		}
		me._share_close.ggUpdateConditionTimer();
		if (me.elementMouseOver['google']) {
		}
		me._google.ggUpdateConditionTimer();
		if (me.elementMouseOver['vk']) {
		}
		me._vk.ggUpdateConditionTimer();
		if (me.elementMouseOver['twitter']) {
		}
		me._twitter.ggUpdateConditionTimer();
		if (me.elementMouseOver['fb']) {
		}
		me._fb.ggUpdateConditionTimer();
		var hs='';
		if (me._tooltip2.ggParameter) {
			hs+=parameterToTransform(me._tooltip2.ggParameter) + ' ';
		}
		hs+='translate(' + (1 * me.player.mouse.x + 0) + 'px,0px) ';
		hs+='translate(0px,' + (1 * me.player.mouse.y + 0) + 'px) ';
		me._tooltip2.style[domTransform]=hs;
		var hs='';
		if (me._tooltip.ggParameter) {
			hs+=parameterToTransform(me._tooltip.ggParameter) + ' ';
		}
		hs+='translate(' + (1 * me.player.mouse.x + 0) + 'px,0px) ';
		hs+='translate(0px,' + (1 * me.player.mouse.y + 0) + 'px) ';
		me._tooltip.style[domTransform]=hs;
		var hs='';
		if (me._tooltip_r.ggParameter) {
			hs+=parameterToTransform(me._tooltip_r.ggParameter) + ' ';
		}
		hs+='translate(' + (1 * me.player.mouse.x + 0) + 'px,0px) ';
		hs+='translate(0px,' + (1 * me.player.mouse.y + 0) + 'px) ';
		me._tooltip_r.style[domTransform]=hs;
		me._intro_bkgd.ggUpdateConditionTimer();
		me._intro_logo_master.ggUpdateConditionTimer();
		me._intro_logo3.ggUpdateConditionTimer();
		me._intro_logo1.ggUpdateConditionTimer();
		me._intro_logo2.ggUpdateConditionTimer();
		me._intro_logo.ggUpdateConditionTimer();
		me.ggHotspotCallChildFunctions('ggUpdateConditionTimer');
	};
	function SkinHotspotClass(skinObj,hotspot) {
		var me=this;
		var flag=false;
		this.player=skinObj.player;
		this.skin=skinObj;
		this.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		this.ggUserdata=this.skin.player.getNodeUserdata(nodeId);
		this.elementMouseDown=[];
		this.elementMouseOver=[];
		
		this.findElements=function(id,regex) {
			return me.skin.findElements(id,regex);
		}
		
		if (hotspot.skinid=='bar_on') {
			this.__div=document.createElement('div');
			this.__div.ggId="bar_on";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 219px;';
			hs+='position : absolute;';
			hs+='top : 152px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("bar on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._bar_on_pic=document.createElement('div');
			this._bar_on_pic__img=document.createElement('img');
			this._bar_on_pic__img.className='ggskin ggskin_image';
			this._bar_on_pic__img.setAttribute('src',basePath + 'images/bar_on_pic.png');
			this._bar_on_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._bar_on_pic__img.className='ggskin ggskin_image';
			this._bar_on_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._bar_on_pic__img);
			this._bar_on_pic.appendChild(this._bar_on_pic__img);
			this._bar_on_pic.ggId="bar on pic";
			this._bar_on_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._bar_on_pic.ggVisible=true;
			this._bar_on_pic.className='ggskin ggskin_image ';
			this._bar_on_pic.ggType='image';
			hs ='';
			hs+='height : 514px;';
			hs+='left : -244px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -257px;';
			hs+='visibility : hidden;';
			hs+='width : 488px;';
			hs+='pointer-events:auto;';
			this._bar_on_pic.setAttribute('style',hs);
			this._bar_on_pic.style[domTransform + 'Origin']='50% 50%';
			me._bar_on_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._bar_on_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._bar_on_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._bar_on_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='bar_off') {
			this.__div=document.createElement('div');
			this.__div.ggId="bar_off";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 219px;';
			hs+='position : absolute;';
			hs+='top : 152px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("bar off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._bar_off_pic=document.createElement('div');
			this._bar_off_pic__img=document.createElement('img');
			this._bar_off_pic__img.className='ggskin ggskin_image';
			this._bar_off_pic__img.setAttribute('src',basePath + 'images/bar_off_pic.png');
			this._bar_off_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._bar_off_pic__img.className='ggskin ggskin_image';
			this._bar_off_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._bar_off_pic__img);
			this._bar_off_pic.appendChild(this._bar_off_pic__img);
			this._bar_off_pic.ggId="bar off pic";
			this._bar_off_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._bar_off_pic.ggVisible=true;
			this._bar_off_pic.className='ggskin ggskin_image ';
			this._bar_off_pic.ggType='image';
			hs ='';
			hs+='height : 514px;';
			hs+='left : -244px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -257px;';
			hs+='visibility : hidden;';
			hs+='width : 488px;';
			hs+='pointer-events:auto;';
			this._bar_off_pic.setAttribute('style',hs);
			this._bar_off_pic.style[domTransform + 'Origin']='50% 50%';
			me._bar_off_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._bar_off_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._bar_off_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._bar_off_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='lok_off') {
			this.__div=document.createElement('div');
			this.__div.ggId="lok_off";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 615px;';
			hs+='position : absolute;';
			hs+='top : 371px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("lok off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._lok_off_pic=document.createElement('div');
			this._lok_off_pic__img=document.createElement('img');
			this._lok_off_pic__img.className='ggskin ggskin_image';
			this._lok_off_pic__img.setAttribute('src',basePath + 'images/lok_off_pic.png');
			this._lok_off_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._lok_off_pic__img.className='ggskin ggskin_image';
			this._lok_off_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._lok_off_pic__img);
			this._lok_off_pic.appendChild(this._lok_off_pic__img);
			this._lok_off_pic.ggId="lok off pic";
			this._lok_off_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._lok_off_pic.ggVisible=true;
			this._lok_off_pic.className='ggskin ggskin_image ';
			this._lok_off_pic.ggType='image';
			hs ='';
			hs+='height : 952px;';
			hs+='left : -640px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -476px;';
			hs+='visibility : hidden;';
			hs+='width : 1280px;';
			hs+='pointer-events:auto;';
			this._lok_off_pic.setAttribute('style',hs);
			this._lok_off_pic.style[domTransform + 'Origin']='50% 50%';
			me._lok_off_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._lok_off_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._lok_off_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._lok_off_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='lok_on') {
			this.__div=document.createElement('div');
			this.__div.ggId="lok_on";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 615px;';
			hs+='position : absolute;';
			hs+='top : 371px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("lok on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._lok_on_pic=document.createElement('div');
			this._lok_on_pic__img=document.createElement('img');
			this._lok_on_pic__img.className='ggskin ggskin_image';
			this._lok_on_pic__img.setAttribute('src',basePath + 'images/lok_on_pic.png');
			this._lok_on_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._lok_on_pic__img.className='ggskin ggskin_image';
			this._lok_on_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._lok_on_pic__img);
			this._lok_on_pic.appendChild(this._lok_on_pic__img);
			this._lok_on_pic.ggId="lok on pic";
			this._lok_on_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._lok_on_pic.ggVisible=true;
			this._lok_on_pic.className='ggskin ggskin_image ';
			this._lok_on_pic.ggType='image';
			hs ='';
			hs+='height : 952px;';
			hs+='left : -640px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -476px;';
			hs+='visibility : hidden;';
			hs+='width : 1280px;';
			hs+='pointer-events:auto;';
			this._lok_on_pic.setAttribute('style',hs);
			this._lok_on_pic.style[domTransform + 'Origin']='50% 50%';
			me._lok_on_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._lok_on_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._lok_on_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._lok_on_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='kas_off') {
			this.__div=document.createElement('div');
			this.__div.ggId="kas_off";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 176px;';
			hs+='position : absolute;';
			hs+='top : 125px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("kas off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._kas_off_pic=document.createElement('div');
			this._kas_off_pic__img=document.createElement('img');
			this._kas_off_pic__img.className='ggskin ggskin_image';
			this._kas_off_pic__img.setAttribute('src',basePath + 'images/kas_off_pic.png');
			this._kas_off_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._kas_off_pic__img.className='ggskin ggskin_image';
			this._kas_off_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._kas_off_pic__img);
			this._kas_off_pic.appendChild(this._kas_off_pic__img);
			this._kas_off_pic.ggId="kas off pic";
			this._kas_off_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._kas_off_pic.ggVisible=true;
			this._kas_off_pic.className='ggskin ggskin_image ';
			this._kas_off_pic.ggType='image';
			hs ='';
			hs+='height : 460px;';
			hs+='left : -201px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -230px;';
			hs+='visibility : hidden;';
			hs+='width : 402px;';
			hs+='pointer-events:auto;';
			this._kas_off_pic.setAttribute('style',hs);
			this._kas_off_pic.style[domTransform + 'Origin']='50% 50%';
			me._kas_off_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._kas_off_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._kas_off_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._kas_off_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='kas_on') {
			this.__div=document.createElement('div');
			this.__div.ggId="kas_on";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 176px;';
			hs+='position : absolute;';
			hs+='top : 125px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("kas on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._kas_on_pic=document.createElement('div');
			this._kas_on_pic__img=document.createElement('img');
			this._kas_on_pic__img.className='ggskin ggskin_image';
			this._kas_on_pic__img.setAttribute('src',basePath + 'images/kas_on_pic.png');
			this._kas_on_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._kas_on_pic__img.className='ggskin ggskin_image';
			this._kas_on_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._kas_on_pic__img);
			this._kas_on_pic.appendChild(this._kas_on_pic__img);
			this._kas_on_pic.ggId="kas on pic";
			this._kas_on_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._kas_on_pic.ggVisible=true;
			this._kas_on_pic.className='ggskin ggskin_image ';
			this._kas_on_pic.ggType='image';
			hs ='';
			hs+='height : 460px;';
			hs+='left : -201px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -230px;';
			hs+='visibility : hidden;';
			hs+='width : 402px;';
			hs+='pointer-events:auto;';
			this._kas_on_pic.setAttribute('style',hs);
			this._kas_on_pic.style[domTransform + 'Origin']='50% 50%';
			me._kas_on_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._kas_on_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._kas_on_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._kas_on_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='zrc_l') {
			this.__div=document.createElement('div');
			this.__div.ggId="zrc_l";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 161px;';
			hs+='position : absolute;';
			hs+='top : 13px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("zrc l pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._zrc_l_pic=document.createElement('div');
			this._zrc_l_pic__img=document.createElement('img');
			this._zrc_l_pic__img.className='ggskin ggskin_image';
			this._zrc_l_pic__img.setAttribute('src',basePath + 'images/zrc_l_pic.png');
			this._zrc_l_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._zrc_l_pic__img.className='ggskin ggskin_image';
			this._zrc_l_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._zrc_l_pic__img);
			this._zrc_l_pic.appendChild(this._zrc_l_pic__img);
			this._zrc_l_pic.ggId="zrc l pic";
			this._zrc_l_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._zrc_l_pic.ggVisible=true;
			this._zrc_l_pic.className='ggskin ggskin_image ';
			this._zrc_l_pic.ggType='image';
			hs ='';
			hs+='height : 236px;';
			hs+='left : -186px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -118px;';
			hs+='visibility : hidden;';
			hs+='width : 372px;';
			hs+='pointer-events:auto;';
			this._zrc_l_pic.setAttribute('style',hs);
			this._zrc_l_pic.style[domTransform + 'Origin']='50% 50%';
			me._zrc_l_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._zrc_l_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._zrc_l_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._zrc_l_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='zrc_on') {
			this.__div=document.createElement('div');
			this.__div.ggId="zrc_on";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 225px;';
			hs+='position : absolute;';
			hs+='top : 59px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("zrc on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._zrc_on_pic=document.createElement('div');
			this._zrc_on_pic__img=document.createElement('img');
			this._zrc_on_pic__img.className='ggskin ggskin_image';
			this._zrc_on_pic__img.setAttribute('src',basePath + 'images/zrc_on_pic.png');
			this._zrc_on_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._zrc_on_pic__img.className='ggskin ggskin_image';
			this._zrc_on_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._zrc_on_pic__img);
			this._zrc_on_pic.appendChild(this._zrc_on_pic__img);
			this._zrc_on_pic.ggId="zrc on pic";
			this._zrc_on_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._zrc_on_pic.ggVisible=true;
			this._zrc_on_pic.className='ggskin ggskin_image ';
			this._zrc_on_pic.ggType='image';
			hs ='';
			hs+='height : 328px;';
			hs+='left : -250px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -164px;';
			hs+='visibility : hidden;';
			hs+='width : 500px;';
			hs+='pointer-events:auto;';
			this._zrc_on_pic.setAttribute('style',hs);
			this._zrc_on_pic.style[domTransform + 'Origin']='50% 50%';
			me._zrc_on_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._zrc_on_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._zrc_on_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._zrc_on_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='zrc_off') {
			this.__div=document.createElement('div');
			this.__div.ggId="zrc_off";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 225px;';
			hs+='position : absolute;';
			hs+='top : 59px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("zrc off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._zrc_off_pic=document.createElement('div');
			this._zrc_off_pic__img=document.createElement('img');
			this._zrc_off_pic__img.className='ggskin ggskin_image';
			this._zrc_off_pic__img.setAttribute('src',basePath + 'images/zrc_off_pic.png');
			this._zrc_off_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._zrc_off_pic__img.className='ggskin ggskin_image';
			this._zrc_off_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._zrc_off_pic__img);
			this._zrc_off_pic.appendChild(this._zrc_off_pic__img);
			this._zrc_off_pic.ggId="zrc off pic";
			this._zrc_off_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._zrc_off_pic.ggVisible=true;
			this._zrc_off_pic.className='ggskin ggskin_image ';
			this._zrc_off_pic.ggType='image';
			hs ='';
			hs+='height : 328px;';
			hs+='left : -250px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -164px;';
			hs+='visibility : hidden;';
			hs+='width : 500px;';
			hs+='pointer-events:auto;';
			this._zrc_off_pic.setAttribute('style',hs);
			this._zrc_off_pic.style[domTransform + 'Origin']='50% 50%';
			me._zrc_off_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._zrc_off_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._zrc_off_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._zrc_off_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='poh_off') {
			this.__div=document.createElement('div');
			this.__div.ggId="poh_off";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 757px;';
			hs+='position : absolute;';
			hs+='top : 624px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("poh off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._poh_off_pic=document.createElement('div');
			this._poh_off_pic__img=document.createElement('img');
			this._poh_off_pic__img.className='ggskin ggskin_image';
			this._poh_off_pic__img.setAttribute('src',basePath + 'images/poh_off_pic.jpg');
			this._poh_off_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._poh_off_pic__img.className='ggskin ggskin_image';
			this._poh_off_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._poh_off_pic__img);
			this._poh_off_pic.appendChild(this._poh_off_pic__img);
			this._poh_off_pic.ggId="poh off pic";
			this._poh_off_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._poh_off_pic.ggVisible=true;
			this._poh_off_pic.className='ggskin ggskin_image ';
			this._poh_off_pic.ggType='image';
			hs ='';
			hs+='height : 1458px;';
			hs+='left : -782px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -729px;';
			hs+='visibility : hidden;';
			hs+='width : 1564px;';
			hs+='pointer-events:auto;';
			this._poh_off_pic.setAttribute('style',hs);
			this._poh_off_pic.style[domTransform + 'Origin']='50% 50%';
			me._poh_off_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._poh_off_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._poh_off_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._poh_off_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='poh_on') {
			this.__div=document.createElement('div');
			this.__div.ggId="poh_on";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 757px;';
			hs+='position : absolute;';
			hs+='top : 624px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("poh on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._poh_on_pic=document.createElement('div');
			this._poh_on_pic__img=document.createElement('img');
			this._poh_on_pic__img.className='ggskin ggskin_image';
			this._poh_on_pic__img.setAttribute('src',basePath + 'images/poh_on_pic.jpg');
			this._poh_on_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._poh_on_pic__img.className='ggskin ggskin_image';
			this._poh_on_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._poh_on_pic__img);
			this._poh_on_pic.appendChild(this._poh_on_pic__img);
			this._poh_on_pic.ggId="poh on pic";
			this._poh_on_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._poh_on_pic.ggVisible=true;
			this._poh_on_pic.className='ggskin ggskin_image ';
			this._poh_on_pic.ggType='image';
			hs ='';
			hs+='height : 1458px;';
			hs+='left : -782px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -729px;';
			hs+='visibility : hidden;';
			hs+='width : 1564px;';
			hs+='pointer-events:auto;';
			this._poh_on_pic.setAttribute('style',hs);
			this._poh_on_pic.style[domTransform + 'Origin']='50% 50%';
			me._poh_on_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._poh_on_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._poh_on_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._poh_on_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='poh') {
			this.__div=document.createElement('div');
			this.__div.ggId="poh";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 281px;';
			hs+='position : absolute;';
			hs+='top : 136px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("poh pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._poh_pic=document.createElement('div');
			this._poh_pic__img=document.createElement('img');
			this._poh_pic__img.className='ggskin ggskin_image';
			this._poh_pic__img.setAttribute('src',basePath + 'images/poh_pic.png');
			this._poh_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._poh_pic__img.className='ggskin ggskin_image';
			this._poh_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._poh_pic__img);
			this._poh_pic.appendChild(this._poh_pic__img);
			this._poh_pic.ggId="poh pic";
			this._poh_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._poh_pic.ggVisible=true;
			this._poh_pic.className='ggskin ggskin_image ';
			this._poh_pic.ggType='image';
			hs ='';
			hs+='height : 482px;';
			hs+='left : -306px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -241px;';
			hs+='visibility : hidden;';
			hs+='width : 612px;';
			hs+='pointer-events:auto;';
			this._poh_pic.setAttribute('style',hs);
			this._poh_pic.style[domTransform + 'Origin']='50% 50%';
			me._poh_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._poh_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._poh_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._poh_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='tel') {
			this.__div=document.createElement('div');
			this.__div.ggId="tel";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 288px;';
			hs+='position : absolute;';
			hs+='top : 208px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("tel pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='0';
					e.style.visibility='hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._tel_pic=document.createElement('div');
			this._tel_pic__img=document.createElement('img');
			this._tel_pic__img.className='ggskin ggskin_image';
			this._tel_pic__img.setAttribute('src',basePath + 'images/tel_pic.png');
			this._tel_pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._tel_pic__img.className='ggskin ggskin_image';
			this._tel_pic__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._tel_pic__img);
			this._tel_pic.appendChild(this._tel_pic__img);
			this._tel_pic.ggId="tel pic";
			this._tel_pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._tel_pic.ggVisible=true;
			this._tel_pic.className='ggskin ggskin_image ';
			this._tel_pic.ggType='image';
			hs ='';
			hs+='height : 626px;';
			hs+='left : -313px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : -313px;';
			hs+='visibility : hidden;';
			hs+='width : 626px;';
			hs+='pointer-events:auto;';
			this._tel_pic.setAttribute('style',hs);
			this._tel_pic.style[domTransform + 'Origin']='50% 50%';
			me._tel_pic.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._tel_pic.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._tel_pic.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._tel_pic);
			this.ggUse3d=true;
			this.gg3dDistance=1274;
		} else
		if (hotspot.skinid=='baroff') {
			this.__div=document.createElement('div');
			this.__div.ggId="baroff";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("bar off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob11=document.createElement('div');
			this._hs_mob11__img=document.createElement('img');
			this._hs_mob11__img.className='ggskin ggskin_image';
			this._hs_mob11__img.setAttribute('src',basePath + 'images/hs_mob11.png');
			this._hs_mob11__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob11__img.className='ggskin ggskin_image';
			this._hs_mob11__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob11__img);
			this._hs_mob11.appendChild(this._hs_mob11__img);
			this._hs_mob11.ggId="hs_mob";
			this._hs_mob11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob11.ggVisible=false;
			this._hs_mob11.className='ggskin ggskin_image ';
			this._hs_mob11.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob11.setAttribute('style',hs);
			this._hs_mob11.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob11.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob11.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob11.ggCurrentLogicStateVisible = -1;
			this._hs_mob11.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob11.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob11.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob11.style[domTransition]='';
					if (me._hs_mob11.ggCurrentLogicStateVisible == 0) {
						me._hs_mob11.style.visibility=(Number(me._hs_mob11.style.opacity)>0||!me._hs_mob11.style.opacity)?'inherit':'hidden';
						me._hs_mob11.ggVisible=true;
					}
					else {
						me._hs_mob11.style.visibility="hidden";
						me._hs_mob11.ggVisible=false;
					}
				}
			}
			this._hs_mob11.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob11.ggNodeChange=function () {
				me._hs_mob11.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob11);
			this._hs_pc11=document.createElement('div');
			this._hs_pc11.ggId="hs pc";
			this._hs_pc11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc11.ggVisible=true;
			this._hs_pc11.className='ggskin ggskin_container ';
			this._hs_pc11.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc11.setAttribute('style',hs);
			this._hs_pc11.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc11.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc11.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc11.onmouseover=function (e) {
				me.elementMouseOver['hs_pc11']=true;
			}
			this._hs_pc11.onmouseout=function (e) {
				me.elementMouseOver['hs_pc11']=false;
			}
			this._hs_pc11.ontouchend=function (e) {
				me.elementMouseOver['hs_pc11']=false;
			}
			me._hs_pc11.ggCurrentLogicStateVisible = -1;
			this._hs_pc11.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc11.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc11.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc11.style[domTransition]='';
					if (me._hs_pc11.ggCurrentLogicStateVisible == 0) {
						me._hs_pc11.style.visibility="hidden";
						me._hs_pc11.ggVisible=false;
					}
					else {
						me._hs_pc11.style.visibility=(Number(me._hs_pc11.style.opacity)>0||!me._hs_pc11.style.opacity)?'inherit':'hidden';
						me._hs_pc11.ggVisible=true;
					}
				}
			}
			this._hs_pc11.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc11.ggNodeChange=function () {
				me._hs_pc11.ggUpdateConditionNodeChange();
			}
			this._open11=document.createElement('div');
			this._open11__text=document.createElement('div');
			this._open11.className='ggskin ggskin_textdiv';
			this._open11.ggTextDiv=this._open11__text;
			this._open11.ggId="open";
			this._open11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open11.ggVisible=true;
			this._open11.className='ggskin ggskin_text ';
			this._open11.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open11.setAttribute('style',hs);
			this._open11.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open11__text.setAttribute('style',hs);
			this._open11__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open11.appendChild(this._open11__text);
			me._open11.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open11.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open11.ggCurrentLogicStateAlpha = -1;
			this._open11.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc11'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open11.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open11.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open11.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open11.ggCurrentLogicStateAlpha == 0) {
						me._open11.style.visibility=me._open11.ggVisible?'inherit':'hidden';
						me._open11.style.opacity=1;
					}
					else {
						me._open11.style.visibility="hidden";
						me._open11.style.opacity=0;
					}
				}
			}
			this._open11.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc11.appendChild(this._open11);
			this._hs_dot11=document.createElement('div');
			this._hs_dot11__img=document.createElement('img');
			this._hs_dot11__img.className='ggskin ggskin_image';
			this._hs_dot11__img.setAttribute('src',basePath + 'images/hs_dot11.png');
			this._hs_dot11__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot11__img.className='ggskin ggskin_image';
			this._hs_dot11__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot11__img);
			this._hs_dot11.appendChild(this._hs_dot11__img);
			this._hs_dot11.ggId="hs dot";
			this._hs_dot11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot11.ggVisible=true;
			this._hs_dot11.className='ggskin ggskin_image ';
			this._hs_dot11.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot11.setAttribute('style',hs);
			this._hs_dot11.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot11.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot11.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot11.ggCurrentLogicStateVisible = -1;
			this._hs_dot11.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc11'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot11.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot11.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot11.style[domTransition]='';
					if (me._hs_dot11.ggCurrentLogicStateVisible == 0) {
						me._hs_dot11.style.visibility="hidden";
						me._hs_dot11.ggVisible=false;
					}
					else {
						me._hs_dot11.style.visibility=(Number(me._hs_dot11.style.opacity)>0||!me._hs_dot11.style.opacity)?'inherit':'hidden';
						me._hs_dot11.ggVisible=true;
					}
				}
			}
			this._hs_dot11.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc11.appendChild(this._hs_dot11);
			this._hs_r11=document.createElement('div');
			this._hs_r11__img=document.createElement('img');
			this._hs_r11__img.className='ggskin ggskin_image';
			this._hs_r11__img.setAttribute('src',basePath + 'images/hs_r11.png');
			this._hs_r11__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r11__img.className='ggskin ggskin_image';
			this._hs_r11__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r11__img);
			this._hs_r11.appendChild(this._hs_r11__img);
			this._hs_r11.ggId="hs R";
			this._hs_r11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r11.ggVisible=true;
			this._hs_r11.className='ggskin ggskin_image ';
			this._hs_r11.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r11.setAttribute('style',hs);
			this._hs_r11.style[domTransform + 'Origin']='50% 50%';
			me._hs_r11.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r11.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r11.ggCurrentLogicStatePosition = -1;
			this._hs_r11.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc11'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r11.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r11.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r11.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r11.ggCurrentLogicStatePosition == 0) {
						me._hs_r11.style.left='54px';
						me._hs_r11.style.top='1px';
					}
					else {
						me._hs_r11.style.left='37px';
						me._hs_r11.style.top='1px';
					}
				}
			}
			this._hs_r11.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc11.appendChild(this._hs_r11);
			this._hs_l11=document.createElement('div');
			this._hs_l11__img=document.createElement('img');
			this._hs_l11__img.className='ggskin ggskin_image';
			this._hs_l11__img.setAttribute('src',basePath + 'images/hs_l11.png');
			this._hs_l11__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l11__img.className='ggskin ggskin_image';
			this._hs_l11__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l11__img);
			this._hs_l11.appendChild(this._hs_l11__img);
			this._hs_l11.ggId="hs L";
			this._hs_l11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l11.ggVisible=true;
			this._hs_l11.className='ggskin ggskin_image ';
			this._hs_l11.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l11.setAttribute('style',hs);
			this._hs_l11.style[domTransform + 'Origin']='50% 50%';
			me._hs_l11.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l11.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l11.ggCurrentLogicStatePosition = -1;
			this._hs_l11.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc11'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l11.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l11.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l11.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l11.ggCurrentLogicStatePosition == 0) {
						me._hs_l11.style.left='2px';
						me._hs_l11.style.top='1px';
					}
					else {
						me._hs_l11.style.left='19px';
						me._hs_l11.style.top='1px';
					}
				}
			}
			this._hs_l11.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc11.appendChild(this._hs_l11);
			this.__div.appendChild(this._hs_pc11);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc11']) {
				}
				me._open11.ggUpdateConditionTimer();
				me._hs_dot11.ggUpdateConditionTimer();
				me._hs_r11.ggUpdateConditionTimer();
				me._hs_l11.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='baron') {
			this.__div=document.createElement('div');
			this.__div.ggId="baron";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("bar on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob10=document.createElement('div');
			this._hs_mob10__img=document.createElement('img');
			this._hs_mob10__img.className='ggskin ggskin_image';
			this._hs_mob10__img.setAttribute('src',basePath + 'images/hs_mob10.png');
			this._hs_mob10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob10__img.className='ggskin ggskin_image';
			this._hs_mob10__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob10__img);
			this._hs_mob10.appendChild(this._hs_mob10__img);
			this._hs_mob10.ggId="hs_mob";
			this._hs_mob10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob10.ggVisible=false;
			this._hs_mob10.className='ggskin ggskin_image ';
			this._hs_mob10.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob10.setAttribute('style',hs);
			this._hs_mob10.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob10.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob10.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob10.ggCurrentLogicStateVisible = -1;
			this._hs_mob10.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob10.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob10.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob10.style[domTransition]='';
					if (me._hs_mob10.ggCurrentLogicStateVisible == 0) {
						me._hs_mob10.style.visibility=(Number(me._hs_mob10.style.opacity)>0||!me._hs_mob10.style.opacity)?'inherit':'hidden';
						me._hs_mob10.ggVisible=true;
					}
					else {
						me._hs_mob10.style.visibility="hidden";
						me._hs_mob10.ggVisible=false;
					}
				}
			}
			this._hs_mob10.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob10.ggNodeChange=function () {
				me._hs_mob10.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob10);
			this._hs_pc10=document.createElement('div');
			this._hs_pc10.ggId="hs pc";
			this._hs_pc10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc10.ggVisible=true;
			this._hs_pc10.className='ggskin ggskin_container ';
			this._hs_pc10.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc10.setAttribute('style',hs);
			this._hs_pc10.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc10.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc10.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc10.onmouseover=function (e) {
				me.elementMouseOver['hs_pc10']=true;
			}
			this._hs_pc10.onmouseout=function (e) {
				me.elementMouseOver['hs_pc10']=false;
			}
			this._hs_pc10.ontouchend=function (e) {
				me.elementMouseOver['hs_pc10']=false;
			}
			me._hs_pc10.ggCurrentLogicStateVisible = -1;
			this._hs_pc10.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc10.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc10.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc10.style[domTransition]='';
					if (me._hs_pc10.ggCurrentLogicStateVisible == 0) {
						me._hs_pc10.style.visibility="hidden";
						me._hs_pc10.ggVisible=false;
					}
					else {
						me._hs_pc10.style.visibility=(Number(me._hs_pc10.style.opacity)>0||!me._hs_pc10.style.opacity)?'inherit':'hidden';
						me._hs_pc10.ggVisible=true;
					}
				}
			}
			this._hs_pc10.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc10.ggNodeChange=function () {
				me._hs_pc10.ggUpdateConditionNodeChange();
			}
			this._open10=document.createElement('div');
			this._open10__text=document.createElement('div');
			this._open10.className='ggskin ggskin_textdiv';
			this._open10.ggTextDiv=this._open10__text;
			this._open10.ggId="open";
			this._open10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open10.ggVisible=true;
			this._open10.className='ggskin ggskin_text ';
			this._open10.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open10.setAttribute('style',hs);
			this._open10.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open10__text.setAttribute('style',hs);
			this._open10__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open10.appendChild(this._open10__text);
			me._open10.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open10.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open10.ggCurrentLogicStateAlpha = -1;
			this._open10.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc10'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open10.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open10.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open10.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open10.ggCurrentLogicStateAlpha == 0) {
						me._open10.style.visibility=me._open10.ggVisible?'inherit':'hidden';
						me._open10.style.opacity=1;
					}
					else {
						me._open10.style.visibility="hidden";
						me._open10.style.opacity=0;
					}
				}
			}
			this._open10.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc10.appendChild(this._open10);
			this._hs_dot10=document.createElement('div');
			this._hs_dot10__img=document.createElement('img');
			this._hs_dot10__img.className='ggskin ggskin_image';
			this._hs_dot10__img.setAttribute('src',basePath + 'images/hs_dot10.png');
			this._hs_dot10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot10__img.className='ggskin ggskin_image';
			this._hs_dot10__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot10__img);
			this._hs_dot10.appendChild(this._hs_dot10__img);
			this._hs_dot10.ggId="hs dot";
			this._hs_dot10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot10.ggVisible=true;
			this._hs_dot10.className='ggskin ggskin_image ';
			this._hs_dot10.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot10.setAttribute('style',hs);
			this._hs_dot10.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot10.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot10.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot10.ggCurrentLogicStateVisible = -1;
			this._hs_dot10.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc10'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot10.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot10.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot10.style[domTransition]='';
					if (me._hs_dot10.ggCurrentLogicStateVisible == 0) {
						me._hs_dot10.style.visibility="hidden";
						me._hs_dot10.ggVisible=false;
					}
					else {
						me._hs_dot10.style.visibility=(Number(me._hs_dot10.style.opacity)>0||!me._hs_dot10.style.opacity)?'inherit':'hidden';
						me._hs_dot10.ggVisible=true;
					}
				}
			}
			this._hs_dot10.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc10.appendChild(this._hs_dot10);
			this._hs_r10=document.createElement('div');
			this._hs_r10__img=document.createElement('img');
			this._hs_r10__img.className='ggskin ggskin_image';
			this._hs_r10__img.setAttribute('src',basePath + 'images/hs_r10.png');
			this._hs_r10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r10__img.className='ggskin ggskin_image';
			this._hs_r10__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r10__img);
			this._hs_r10.appendChild(this._hs_r10__img);
			this._hs_r10.ggId="hs R";
			this._hs_r10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r10.ggVisible=true;
			this._hs_r10.className='ggskin ggskin_image ';
			this._hs_r10.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r10.setAttribute('style',hs);
			this._hs_r10.style[domTransform + 'Origin']='50% 50%';
			me._hs_r10.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r10.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r10.ggCurrentLogicStatePosition = -1;
			this._hs_r10.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc10'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r10.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r10.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r10.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r10.ggCurrentLogicStatePosition == 0) {
						me._hs_r10.style.left='54px';
						me._hs_r10.style.top='1px';
					}
					else {
						me._hs_r10.style.left='37px';
						me._hs_r10.style.top='1px';
					}
				}
			}
			this._hs_r10.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc10.appendChild(this._hs_r10);
			this._hs_l10=document.createElement('div');
			this._hs_l10__img=document.createElement('img');
			this._hs_l10__img.className='ggskin ggskin_image';
			this._hs_l10__img.setAttribute('src',basePath + 'images/hs_l10.png');
			this._hs_l10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l10__img.className='ggskin ggskin_image';
			this._hs_l10__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l10__img);
			this._hs_l10.appendChild(this._hs_l10__img);
			this._hs_l10.ggId="hs L";
			this._hs_l10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l10.ggVisible=true;
			this._hs_l10.className='ggskin ggskin_image ';
			this._hs_l10.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l10.setAttribute('style',hs);
			this._hs_l10.style[domTransform + 'Origin']='50% 50%';
			me._hs_l10.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l10.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l10.ggCurrentLogicStatePosition = -1;
			this._hs_l10.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc10'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l10.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l10.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l10.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l10.ggCurrentLogicStatePosition == 0) {
						me._hs_l10.style.left='2px';
						me._hs_l10.style.top='1px';
					}
					else {
						me._hs_l10.style.left='19px';
						me._hs_l10.style.top='1px';
					}
				}
			}
			this._hs_l10.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc10.appendChild(this._hs_l10);
			this.__div.appendChild(this._hs_pc10);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc10']) {
				}
				me._open10.ggUpdateConditionTimer();
				me._hs_dot10.ggUpdateConditionTimer();
				me._hs_r10.ggUpdateConditionTimer();
				me._hs_l10.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='lokon') {
			this.__div=document.createElement('div');
			this.__div.ggId="lokon";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("lok on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob9=document.createElement('div');
			this._hs_mob9__img=document.createElement('img');
			this._hs_mob9__img.className='ggskin ggskin_image';
			this._hs_mob9__img.setAttribute('src',basePath + 'images/hs_mob9.png');
			this._hs_mob9__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob9__img.className='ggskin ggskin_image';
			this._hs_mob9__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob9__img);
			this._hs_mob9.appendChild(this._hs_mob9__img);
			this._hs_mob9.ggId="hs_mob";
			this._hs_mob9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob9.ggVisible=false;
			this._hs_mob9.className='ggskin ggskin_image ';
			this._hs_mob9.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob9.setAttribute('style',hs);
			this._hs_mob9.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob9.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob9.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob9.ggCurrentLogicStateVisible = -1;
			this._hs_mob9.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob9.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob9.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob9.style[domTransition]='';
					if (me._hs_mob9.ggCurrentLogicStateVisible == 0) {
						me._hs_mob9.style.visibility=(Number(me._hs_mob9.style.opacity)>0||!me._hs_mob9.style.opacity)?'inherit':'hidden';
						me._hs_mob9.ggVisible=true;
					}
					else {
						me._hs_mob9.style.visibility="hidden";
						me._hs_mob9.ggVisible=false;
					}
				}
			}
			this._hs_mob9.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob9.ggNodeChange=function () {
				me._hs_mob9.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob9);
			this._hs_pc9=document.createElement('div');
			this._hs_pc9.ggId="hs pc";
			this._hs_pc9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc9.ggVisible=true;
			this._hs_pc9.className='ggskin ggskin_container ';
			this._hs_pc9.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc9.setAttribute('style',hs);
			this._hs_pc9.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc9.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc9.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc9.onmouseover=function (e) {
				me.elementMouseOver['hs_pc9']=true;
			}
			this._hs_pc9.onmouseout=function (e) {
				me.elementMouseOver['hs_pc9']=false;
			}
			this._hs_pc9.ontouchend=function (e) {
				me.elementMouseOver['hs_pc9']=false;
			}
			me._hs_pc9.ggCurrentLogicStateVisible = -1;
			this._hs_pc9.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc9.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc9.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc9.style[domTransition]='';
					if (me._hs_pc9.ggCurrentLogicStateVisible == 0) {
						me._hs_pc9.style.visibility="hidden";
						me._hs_pc9.ggVisible=false;
					}
					else {
						me._hs_pc9.style.visibility=(Number(me._hs_pc9.style.opacity)>0||!me._hs_pc9.style.opacity)?'inherit':'hidden';
						me._hs_pc9.ggVisible=true;
					}
				}
			}
			this._hs_pc9.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc9.ggNodeChange=function () {
				me._hs_pc9.ggUpdateConditionNodeChange();
			}
			this._open9=document.createElement('div');
			this._open9__text=document.createElement('div');
			this._open9.className='ggskin ggskin_textdiv';
			this._open9.ggTextDiv=this._open9__text;
			this._open9.ggId="open";
			this._open9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open9.ggVisible=true;
			this._open9.className='ggskin ggskin_text ';
			this._open9.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open9.setAttribute('style',hs);
			this._open9.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open9__text.setAttribute('style',hs);
			this._open9__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open9.appendChild(this._open9__text);
			me._open9.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open9.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open9.ggCurrentLogicStateAlpha = -1;
			this._open9.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc9'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open9.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open9.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open9.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open9.ggCurrentLogicStateAlpha == 0) {
						me._open9.style.visibility=me._open9.ggVisible?'inherit':'hidden';
						me._open9.style.opacity=1;
					}
					else {
						me._open9.style.visibility="hidden";
						me._open9.style.opacity=0;
					}
				}
			}
			this._open9.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc9.appendChild(this._open9);
			this._hs_dot9=document.createElement('div');
			this._hs_dot9__img=document.createElement('img');
			this._hs_dot9__img.className='ggskin ggskin_image';
			this._hs_dot9__img.setAttribute('src',basePath + 'images/hs_dot9.png');
			this._hs_dot9__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot9__img.className='ggskin ggskin_image';
			this._hs_dot9__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot9__img);
			this._hs_dot9.appendChild(this._hs_dot9__img);
			this._hs_dot9.ggId="hs dot";
			this._hs_dot9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot9.ggVisible=true;
			this._hs_dot9.className='ggskin ggskin_image ';
			this._hs_dot9.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot9.setAttribute('style',hs);
			this._hs_dot9.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot9.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot9.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot9.ggCurrentLogicStateVisible = -1;
			this._hs_dot9.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc9'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot9.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot9.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot9.style[domTransition]='';
					if (me._hs_dot9.ggCurrentLogicStateVisible == 0) {
						me._hs_dot9.style.visibility="hidden";
						me._hs_dot9.ggVisible=false;
					}
					else {
						me._hs_dot9.style.visibility=(Number(me._hs_dot9.style.opacity)>0||!me._hs_dot9.style.opacity)?'inherit':'hidden';
						me._hs_dot9.ggVisible=true;
					}
				}
			}
			this._hs_dot9.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc9.appendChild(this._hs_dot9);
			this._hs_r9=document.createElement('div');
			this._hs_r9__img=document.createElement('img');
			this._hs_r9__img.className='ggskin ggskin_image';
			this._hs_r9__img.setAttribute('src',basePath + 'images/hs_r9.png');
			this._hs_r9__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r9__img.className='ggskin ggskin_image';
			this._hs_r9__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r9__img);
			this._hs_r9.appendChild(this._hs_r9__img);
			this._hs_r9.ggId="hs R";
			this._hs_r9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r9.ggVisible=true;
			this._hs_r9.className='ggskin ggskin_image ';
			this._hs_r9.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r9.setAttribute('style',hs);
			this._hs_r9.style[domTransform + 'Origin']='50% 50%';
			me._hs_r9.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r9.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r9.ggCurrentLogicStatePosition = -1;
			this._hs_r9.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc9'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r9.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r9.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r9.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r9.ggCurrentLogicStatePosition == 0) {
						me._hs_r9.style.left='54px';
						me._hs_r9.style.top='1px';
					}
					else {
						me._hs_r9.style.left='37px';
						me._hs_r9.style.top='1px';
					}
				}
			}
			this._hs_r9.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc9.appendChild(this._hs_r9);
			this._hs_l9=document.createElement('div');
			this._hs_l9__img=document.createElement('img');
			this._hs_l9__img.className='ggskin ggskin_image';
			this._hs_l9__img.setAttribute('src',basePath + 'images/hs_l9.png');
			this._hs_l9__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l9__img.className='ggskin ggskin_image';
			this._hs_l9__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l9__img);
			this._hs_l9.appendChild(this._hs_l9__img);
			this._hs_l9.ggId="hs L";
			this._hs_l9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l9.ggVisible=true;
			this._hs_l9.className='ggskin ggskin_image ';
			this._hs_l9.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l9.setAttribute('style',hs);
			this._hs_l9.style[domTransform + 'Origin']='50% 50%';
			me._hs_l9.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l9.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l9.ggCurrentLogicStatePosition = -1;
			this._hs_l9.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc9'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l9.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l9.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l9.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l9.ggCurrentLogicStatePosition == 0) {
						me._hs_l9.style.left='2px';
						me._hs_l9.style.top='1px';
					}
					else {
						me._hs_l9.style.left='19px';
						me._hs_l9.style.top='1px';
					}
				}
			}
			this._hs_l9.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc9.appendChild(this._hs_l9);
			this.__div.appendChild(this._hs_pc9);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc9']) {
				}
				me._open9.ggUpdateConditionTimer();
				me._hs_dot9.ggUpdateConditionTimer();
				me._hs_r9.ggUpdateConditionTimer();
				me._hs_l9.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='lokoff') {
			this.__div=document.createElement('div');
			this.__div.ggId="lokoff";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("lok off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob8=document.createElement('div');
			this._hs_mob8__img=document.createElement('img');
			this._hs_mob8__img.className='ggskin ggskin_image';
			this._hs_mob8__img.setAttribute('src',basePath + 'images/hs_mob8.png');
			this._hs_mob8__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob8__img.className='ggskin ggskin_image';
			this._hs_mob8__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob8__img);
			this._hs_mob8.appendChild(this._hs_mob8__img);
			this._hs_mob8.ggId="hs_mob";
			this._hs_mob8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob8.ggVisible=false;
			this._hs_mob8.className='ggskin ggskin_image ';
			this._hs_mob8.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob8.setAttribute('style',hs);
			this._hs_mob8.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob8.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob8.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob8.ggCurrentLogicStateVisible = -1;
			this._hs_mob8.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob8.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob8.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob8.style[domTransition]='';
					if (me._hs_mob8.ggCurrentLogicStateVisible == 0) {
						me._hs_mob8.style.visibility=(Number(me._hs_mob8.style.opacity)>0||!me._hs_mob8.style.opacity)?'inherit':'hidden';
						me._hs_mob8.ggVisible=true;
					}
					else {
						me._hs_mob8.style.visibility="hidden";
						me._hs_mob8.ggVisible=false;
					}
				}
			}
			this._hs_mob8.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob8.ggNodeChange=function () {
				me._hs_mob8.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob8);
			this._hs_pc8=document.createElement('div');
			this._hs_pc8.ggId="hs pc";
			this._hs_pc8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc8.ggVisible=true;
			this._hs_pc8.className='ggskin ggskin_container ';
			this._hs_pc8.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc8.setAttribute('style',hs);
			this._hs_pc8.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc8.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc8.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc8.onmouseover=function (e) {
				me.elementMouseOver['hs_pc8']=true;
			}
			this._hs_pc8.onmouseout=function (e) {
				me.elementMouseOver['hs_pc8']=false;
			}
			this._hs_pc8.ontouchend=function (e) {
				me.elementMouseOver['hs_pc8']=false;
			}
			me._hs_pc8.ggCurrentLogicStateVisible = -1;
			this._hs_pc8.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc8.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc8.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc8.style[domTransition]='';
					if (me._hs_pc8.ggCurrentLogicStateVisible == 0) {
						me._hs_pc8.style.visibility="hidden";
						me._hs_pc8.ggVisible=false;
					}
					else {
						me._hs_pc8.style.visibility=(Number(me._hs_pc8.style.opacity)>0||!me._hs_pc8.style.opacity)?'inherit':'hidden';
						me._hs_pc8.ggVisible=true;
					}
				}
			}
			this._hs_pc8.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc8.ggNodeChange=function () {
				me._hs_pc8.ggUpdateConditionNodeChange();
			}
			this._open8=document.createElement('div');
			this._open8__text=document.createElement('div');
			this._open8.className='ggskin ggskin_textdiv';
			this._open8.ggTextDiv=this._open8__text;
			this._open8.ggId="open";
			this._open8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open8.ggVisible=true;
			this._open8.className='ggskin ggskin_text ';
			this._open8.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open8.setAttribute('style',hs);
			this._open8.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open8__text.setAttribute('style',hs);
			this._open8__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open8.appendChild(this._open8__text);
			me._open8.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open8.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open8.ggCurrentLogicStateAlpha = -1;
			this._open8.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc8'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open8.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open8.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open8.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open8.ggCurrentLogicStateAlpha == 0) {
						me._open8.style.visibility=me._open8.ggVisible?'inherit':'hidden';
						me._open8.style.opacity=1;
					}
					else {
						me._open8.style.visibility="hidden";
						me._open8.style.opacity=0;
					}
				}
			}
			this._open8.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc8.appendChild(this._open8);
			this._hs_dot8=document.createElement('div');
			this._hs_dot8__img=document.createElement('img');
			this._hs_dot8__img.className='ggskin ggskin_image';
			this._hs_dot8__img.setAttribute('src',basePath + 'images/hs_dot8.png');
			this._hs_dot8__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot8__img.className='ggskin ggskin_image';
			this._hs_dot8__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot8__img);
			this._hs_dot8.appendChild(this._hs_dot8__img);
			this._hs_dot8.ggId="hs dot";
			this._hs_dot8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot8.ggVisible=true;
			this._hs_dot8.className='ggskin ggskin_image ';
			this._hs_dot8.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot8.setAttribute('style',hs);
			this._hs_dot8.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot8.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot8.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot8.ggCurrentLogicStateVisible = -1;
			this._hs_dot8.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc8'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot8.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot8.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot8.style[domTransition]='';
					if (me._hs_dot8.ggCurrentLogicStateVisible == 0) {
						me._hs_dot8.style.visibility="hidden";
						me._hs_dot8.ggVisible=false;
					}
					else {
						me._hs_dot8.style.visibility=(Number(me._hs_dot8.style.opacity)>0||!me._hs_dot8.style.opacity)?'inherit':'hidden';
						me._hs_dot8.ggVisible=true;
					}
				}
			}
			this._hs_dot8.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc8.appendChild(this._hs_dot8);
			this._hs_r8=document.createElement('div');
			this._hs_r8__img=document.createElement('img');
			this._hs_r8__img.className='ggskin ggskin_image';
			this._hs_r8__img.setAttribute('src',basePath + 'images/hs_r8.png');
			this._hs_r8__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r8__img.className='ggskin ggskin_image';
			this._hs_r8__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r8__img);
			this._hs_r8.appendChild(this._hs_r8__img);
			this._hs_r8.ggId="hs R";
			this._hs_r8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r8.ggVisible=true;
			this._hs_r8.className='ggskin ggskin_image ';
			this._hs_r8.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r8.setAttribute('style',hs);
			this._hs_r8.style[domTransform + 'Origin']='50% 50%';
			me._hs_r8.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r8.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r8.ggCurrentLogicStatePosition = -1;
			this._hs_r8.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc8'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r8.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r8.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r8.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r8.ggCurrentLogicStatePosition == 0) {
						me._hs_r8.style.left='54px';
						me._hs_r8.style.top='1px';
					}
					else {
						me._hs_r8.style.left='37px';
						me._hs_r8.style.top='1px';
					}
				}
			}
			this._hs_r8.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc8.appendChild(this._hs_r8);
			this._hs_l8=document.createElement('div');
			this._hs_l8__img=document.createElement('img');
			this._hs_l8__img.className='ggskin ggskin_image';
			this._hs_l8__img.setAttribute('src',basePath + 'images/hs_l8.png');
			this._hs_l8__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l8__img.className='ggskin ggskin_image';
			this._hs_l8__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l8__img);
			this._hs_l8.appendChild(this._hs_l8__img);
			this._hs_l8.ggId="hs L";
			this._hs_l8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l8.ggVisible=true;
			this._hs_l8.className='ggskin ggskin_image ';
			this._hs_l8.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l8.setAttribute('style',hs);
			this._hs_l8.style[domTransform + 'Origin']='50% 50%';
			me._hs_l8.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l8.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l8.ggCurrentLogicStatePosition = -1;
			this._hs_l8.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc8'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l8.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l8.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l8.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l8.ggCurrentLogicStatePosition == 0) {
						me._hs_l8.style.left='2px';
						me._hs_l8.style.top='1px';
					}
					else {
						me._hs_l8.style.left='19px';
						me._hs_l8.style.top='1px';
					}
				}
			}
			this._hs_l8.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc8.appendChild(this._hs_l8);
			this.__div.appendChild(this._hs_pc8);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc8']) {
				}
				me._open8.ggUpdateConditionTimer();
				me._hs_dot8.ggUpdateConditionTimer();
				me._hs_r8.ggUpdateConditionTimer();
				me._hs_l8.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='kason') {
			this.__div=document.createElement('div');
			this.__div.ggId="kason";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("kas on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob7=document.createElement('div');
			this._hs_mob7__img=document.createElement('img');
			this._hs_mob7__img.className='ggskin ggskin_image';
			this._hs_mob7__img.setAttribute('src',basePath + 'images/hs_mob7.png');
			this._hs_mob7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob7__img.className='ggskin ggskin_image';
			this._hs_mob7__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob7__img);
			this._hs_mob7.appendChild(this._hs_mob7__img);
			this._hs_mob7.ggId="hs_mob";
			this._hs_mob7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob7.ggVisible=false;
			this._hs_mob7.className='ggskin ggskin_image ';
			this._hs_mob7.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob7.setAttribute('style',hs);
			this._hs_mob7.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob7.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob7.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob7.ggCurrentLogicStateVisible = -1;
			this._hs_mob7.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob7.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob7.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob7.style[domTransition]='';
					if (me._hs_mob7.ggCurrentLogicStateVisible == 0) {
						me._hs_mob7.style.visibility=(Number(me._hs_mob7.style.opacity)>0||!me._hs_mob7.style.opacity)?'inherit':'hidden';
						me._hs_mob7.ggVisible=true;
					}
					else {
						me._hs_mob7.style.visibility="hidden";
						me._hs_mob7.ggVisible=false;
					}
				}
			}
			this._hs_mob7.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob7.ggNodeChange=function () {
				me._hs_mob7.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob7);
			this._hs_pc7=document.createElement('div');
			this._hs_pc7.ggId="hs pc";
			this._hs_pc7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc7.ggVisible=true;
			this._hs_pc7.className='ggskin ggskin_container ';
			this._hs_pc7.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc7.setAttribute('style',hs);
			this._hs_pc7.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc7.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc7.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc7.onmouseover=function (e) {
				me.elementMouseOver['hs_pc7']=true;
			}
			this._hs_pc7.onmouseout=function (e) {
				me.elementMouseOver['hs_pc7']=false;
			}
			this._hs_pc7.ontouchend=function (e) {
				me.elementMouseOver['hs_pc7']=false;
			}
			me._hs_pc7.ggCurrentLogicStateVisible = -1;
			this._hs_pc7.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc7.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc7.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc7.style[domTransition]='';
					if (me._hs_pc7.ggCurrentLogicStateVisible == 0) {
						me._hs_pc7.style.visibility="hidden";
						me._hs_pc7.ggVisible=false;
					}
					else {
						me._hs_pc7.style.visibility=(Number(me._hs_pc7.style.opacity)>0||!me._hs_pc7.style.opacity)?'inherit':'hidden';
						me._hs_pc7.ggVisible=true;
					}
				}
			}
			this._hs_pc7.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc7.ggNodeChange=function () {
				me._hs_pc7.ggUpdateConditionNodeChange();
			}
			this._open7=document.createElement('div');
			this._open7__text=document.createElement('div');
			this._open7.className='ggskin ggskin_textdiv';
			this._open7.ggTextDiv=this._open7__text;
			this._open7.ggId="open";
			this._open7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open7.ggVisible=true;
			this._open7.className='ggskin ggskin_text ';
			this._open7.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open7.setAttribute('style',hs);
			this._open7.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open7__text.setAttribute('style',hs);
			this._open7__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open7.appendChild(this._open7__text);
			me._open7.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open7.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open7.ggCurrentLogicStateAlpha = -1;
			this._open7.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc7'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open7.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open7.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open7.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open7.ggCurrentLogicStateAlpha == 0) {
						me._open7.style.visibility=me._open7.ggVisible?'inherit':'hidden';
						me._open7.style.opacity=1;
					}
					else {
						me._open7.style.visibility="hidden";
						me._open7.style.opacity=0;
					}
				}
			}
			this._open7.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc7.appendChild(this._open7);
			this._hs_dot7=document.createElement('div');
			this._hs_dot7__img=document.createElement('img');
			this._hs_dot7__img.className='ggskin ggskin_image';
			this._hs_dot7__img.setAttribute('src',basePath + 'images/hs_dot7.png');
			this._hs_dot7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot7__img.className='ggskin ggskin_image';
			this._hs_dot7__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot7__img);
			this._hs_dot7.appendChild(this._hs_dot7__img);
			this._hs_dot7.ggId="hs dot";
			this._hs_dot7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot7.ggVisible=true;
			this._hs_dot7.className='ggskin ggskin_image ';
			this._hs_dot7.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot7.setAttribute('style',hs);
			this._hs_dot7.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot7.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot7.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot7.ggCurrentLogicStateVisible = -1;
			this._hs_dot7.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc7'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot7.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot7.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot7.style[domTransition]='';
					if (me._hs_dot7.ggCurrentLogicStateVisible == 0) {
						me._hs_dot7.style.visibility="hidden";
						me._hs_dot7.ggVisible=false;
					}
					else {
						me._hs_dot7.style.visibility=(Number(me._hs_dot7.style.opacity)>0||!me._hs_dot7.style.opacity)?'inherit':'hidden';
						me._hs_dot7.ggVisible=true;
					}
				}
			}
			this._hs_dot7.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc7.appendChild(this._hs_dot7);
			this._hs_r7=document.createElement('div');
			this._hs_r7__img=document.createElement('img');
			this._hs_r7__img.className='ggskin ggskin_image';
			this._hs_r7__img.setAttribute('src',basePath + 'images/hs_r7.png');
			this._hs_r7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r7__img.className='ggskin ggskin_image';
			this._hs_r7__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r7__img);
			this._hs_r7.appendChild(this._hs_r7__img);
			this._hs_r7.ggId="hs R";
			this._hs_r7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r7.ggVisible=true;
			this._hs_r7.className='ggskin ggskin_image ';
			this._hs_r7.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r7.setAttribute('style',hs);
			this._hs_r7.style[domTransform + 'Origin']='50% 50%';
			me._hs_r7.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r7.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r7.ggCurrentLogicStatePosition = -1;
			this._hs_r7.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc7'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r7.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r7.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r7.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r7.ggCurrentLogicStatePosition == 0) {
						me._hs_r7.style.left='54px';
						me._hs_r7.style.top='1px';
					}
					else {
						me._hs_r7.style.left='37px';
						me._hs_r7.style.top='1px';
					}
				}
			}
			this._hs_r7.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc7.appendChild(this._hs_r7);
			this._hs_l7=document.createElement('div');
			this._hs_l7__img=document.createElement('img');
			this._hs_l7__img.className='ggskin ggskin_image';
			this._hs_l7__img.setAttribute('src',basePath + 'images/hs_l7.png');
			this._hs_l7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l7__img.className='ggskin ggskin_image';
			this._hs_l7__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l7__img);
			this._hs_l7.appendChild(this._hs_l7__img);
			this._hs_l7.ggId="hs L";
			this._hs_l7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l7.ggVisible=true;
			this._hs_l7.className='ggskin ggskin_image ';
			this._hs_l7.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l7.setAttribute('style',hs);
			this._hs_l7.style[domTransform + 'Origin']='50% 50%';
			me._hs_l7.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l7.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l7.ggCurrentLogicStatePosition = -1;
			this._hs_l7.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc7'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l7.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l7.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l7.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l7.ggCurrentLogicStatePosition == 0) {
						me._hs_l7.style.left='2px';
						me._hs_l7.style.top='1px';
					}
					else {
						me._hs_l7.style.left='19px';
						me._hs_l7.style.top='1px';
					}
				}
			}
			this._hs_l7.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc7.appendChild(this._hs_l7);
			this.__div.appendChild(this._hs_pc7);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc7']) {
				}
				me._open7.ggUpdateConditionTimer();
				me._hs_dot7.ggUpdateConditionTimer();
				me._hs_r7.ggUpdateConditionTimer();
				me._hs_l7.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='kasoff') {
			this.__div=document.createElement('div');
			this.__div.ggId="kasoff";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("kas off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob6=document.createElement('div');
			this._hs_mob6__img=document.createElement('img');
			this._hs_mob6__img.className='ggskin ggskin_image';
			this._hs_mob6__img.setAttribute('src',basePath + 'images/hs_mob6.png');
			this._hs_mob6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob6__img.className='ggskin ggskin_image';
			this._hs_mob6__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob6__img);
			this._hs_mob6.appendChild(this._hs_mob6__img);
			this._hs_mob6.ggId="hs_mob";
			this._hs_mob6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob6.ggVisible=false;
			this._hs_mob6.className='ggskin ggskin_image ';
			this._hs_mob6.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob6.setAttribute('style',hs);
			this._hs_mob6.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob6.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob6.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob6.ggCurrentLogicStateVisible = -1;
			this._hs_mob6.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob6.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob6.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob6.style[domTransition]='';
					if (me._hs_mob6.ggCurrentLogicStateVisible == 0) {
						me._hs_mob6.style.visibility=(Number(me._hs_mob6.style.opacity)>0||!me._hs_mob6.style.opacity)?'inherit':'hidden';
						me._hs_mob6.ggVisible=true;
					}
					else {
						me._hs_mob6.style.visibility="hidden";
						me._hs_mob6.ggVisible=false;
					}
				}
			}
			this._hs_mob6.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob6.ggNodeChange=function () {
				me._hs_mob6.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob6);
			this._hs_pc6=document.createElement('div');
			this._hs_pc6.ggId="hs pc";
			this._hs_pc6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc6.ggVisible=true;
			this._hs_pc6.className='ggskin ggskin_container ';
			this._hs_pc6.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc6.setAttribute('style',hs);
			this._hs_pc6.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc6.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc6.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc6.onmouseover=function (e) {
				me.elementMouseOver['hs_pc6']=true;
			}
			this._hs_pc6.onmouseout=function (e) {
				me.elementMouseOver['hs_pc6']=false;
			}
			this._hs_pc6.ontouchend=function (e) {
				me.elementMouseOver['hs_pc6']=false;
			}
			me._hs_pc6.ggCurrentLogicStateVisible = -1;
			this._hs_pc6.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc6.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc6.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc6.style[domTransition]='';
					if (me._hs_pc6.ggCurrentLogicStateVisible == 0) {
						me._hs_pc6.style.visibility="hidden";
						me._hs_pc6.ggVisible=false;
					}
					else {
						me._hs_pc6.style.visibility=(Number(me._hs_pc6.style.opacity)>0||!me._hs_pc6.style.opacity)?'inherit':'hidden';
						me._hs_pc6.ggVisible=true;
					}
				}
			}
			this._hs_pc6.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc6.ggNodeChange=function () {
				me._hs_pc6.ggUpdateConditionNodeChange();
			}
			this._open6=document.createElement('div');
			this._open6__text=document.createElement('div');
			this._open6.className='ggskin ggskin_textdiv';
			this._open6.ggTextDiv=this._open6__text;
			this._open6.ggId="open";
			this._open6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open6.ggVisible=true;
			this._open6.className='ggskin ggskin_text ';
			this._open6.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open6.setAttribute('style',hs);
			this._open6.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open6__text.setAttribute('style',hs);
			this._open6__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open6.appendChild(this._open6__text);
			me._open6.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open6.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open6.ggCurrentLogicStateAlpha = -1;
			this._open6.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc6'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open6.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open6.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open6.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open6.ggCurrentLogicStateAlpha == 0) {
						me._open6.style.visibility=me._open6.ggVisible?'inherit':'hidden';
						me._open6.style.opacity=1;
					}
					else {
						me._open6.style.visibility="hidden";
						me._open6.style.opacity=0;
					}
				}
			}
			this._open6.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc6.appendChild(this._open6);
			this._hs_dot6=document.createElement('div');
			this._hs_dot6__img=document.createElement('img');
			this._hs_dot6__img.className='ggskin ggskin_image';
			this._hs_dot6__img.setAttribute('src',basePath + 'images/hs_dot6.png');
			this._hs_dot6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot6__img.className='ggskin ggskin_image';
			this._hs_dot6__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot6__img);
			this._hs_dot6.appendChild(this._hs_dot6__img);
			this._hs_dot6.ggId="hs dot";
			this._hs_dot6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot6.ggVisible=true;
			this._hs_dot6.className='ggskin ggskin_image ';
			this._hs_dot6.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot6.setAttribute('style',hs);
			this._hs_dot6.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot6.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot6.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot6.ggCurrentLogicStateVisible = -1;
			this._hs_dot6.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc6'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot6.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot6.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot6.style[domTransition]='';
					if (me._hs_dot6.ggCurrentLogicStateVisible == 0) {
						me._hs_dot6.style.visibility="hidden";
						me._hs_dot6.ggVisible=false;
					}
					else {
						me._hs_dot6.style.visibility=(Number(me._hs_dot6.style.opacity)>0||!me._hs_dot6.style.opacity)?'inherit':'hidden';
						me._hs_dot6.ggVisible=true;
					}
				}
			}
			this._hs_dot6.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc6.appendChild(this._hs_dot6);
			this._hs_r6=document.createElement('div');
			this._hs_r6__img=document.createElement('img');
			this._hs_r6__img.className='ggskin ggskin_image';
			this._hs_r6__img.setAttribute('src',basePath + 'images/hs_r6.png');
			this._hs_r6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r6__img.className='ggskin ggskin_image';
			this._hs_r6__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r6__img);
			this._hs_r6.appendChild(this._hs_r6__img);
			this._hs_r6.ggId="hs R";
			this._hs_r6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r6.ggVisible=true;
			this._hs_r6.className='ggskin ggskin_image ';
			this._hs_r6.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r6.setAttribute('style',hs);
			this._hs_r6.style[domTransform + 'Origin']='50% 50%';
			me._hs_r6.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r6.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r6.ggCurrentLogicStatePosition = -1;
			this._hs_r6.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc6'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r6.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r6.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r6.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r6.ggCurrentLogicStatePosition == 0) {
						me._hs_r6.style.left='54px';
						me._hs_r6.style.top='1px';
					}
					else {
						me._hs_r6.style.left='37px';
						me._hs_r6.style.top='1px';
					}
				}
			}
			this._hs_r6.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc6.appendChild(this._hs_r6);
			this._hs_l6=document.createElement('div');
			this._hs_l6__img=document.createElement('img');
			this._hs_l6__img.className='ggskin ggskin_image';
			this._hs_l6__img.setAttribute('src',basePath + 'images/hs_l6.png');
			this._hs_l6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l6__img.className='ggskin ggskin_image';
			this._hs_l6__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l6__img);
			this._hs_l6.appendChild(this._hs_l6__img);
			this._hs_l6.ggId="hs L";
			this._hs_l6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l6.ggVisible=true;
			this._hs_l6.className='ggskin ggskin_image ';
			this._hs_l6.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l6.setAttribute('style',hs);
			this._hs_l6.style[domTransform + 'Origin']='50% 50%';
			me._hs_l6.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l6.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l6.ggCurrentLogicStatePosition = -1;
			this._hs_l6.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc6'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l6.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l6.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l6.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l6.ggCurrentLogicStatePosition == 0) {
						me._hs_l6.style.left='2px';
						me._hs_l6.style.top='1px';
					}
					else {
						me._hs_l6.style.left='19px';
						me._hs_l6.style.top='1px';
					}
				}
			}
			this._hs_l6.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc6.appendChild(this._hs_l6);
			this.__div.appendChild(this._hs_pc6);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc6']) {
				}
				me._open6.ggUpdateConditionTimer();
				me._hs_dot6.ggUpdateConditionTimer();
				me._hs_r6.ggUpdateConditionTimer();
				me._hs_l6.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='zrc') {
			this.__div=document.createElement('div');
			this.__div.ggId="zrc";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("zrc l pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob5=document.createElement('div');
			this._hs_mob5__img=document.createElement('img');
			this._hs_mob5__img.className='ggskin ggskin_image';
			this._hs_mob5__img.setAttribute('src',basePath + 'images/hs_mob5.png');
			this._hs_mob5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob5__img.className='ggskin ggskin_image';
			this._hs_mob5__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob5__img);
			this._hs_mob5.appendChild(this._hs_mob5__img);
			this._hs_mob5.ggId="hs_mob";
			this._hs_mob5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob5.ggVisible=false;
			this._hs_mob5.className='ggskin ggskin_image ';
			this._hs_mob5.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob5.setAttribute('style',hs);
			this._hs_mob5.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob5.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob5.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob5.ggCurrentLogicStateVisible = -1;
			this._hs_mob5.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob5.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob5.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob5.style[domTransition]='';
					if (me._hs_mob5.ggCurrentLogicStateVisible == 0) {
						me._hs_mob5.style.visibility=(Number(me._hs_mob5.style.opacity)>0||!me._hs_mob5.style.opacity)?'inherit':'hidden';
						me._hs_mob5.ggVisible=true;
					}
					else {
						me._hs_mob5.style.visibility="hidden";
						me._hs_mob5.ggVisible=false;
					}
				}
			}
			this._hs_mob5.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob5.ggNodeChange=function () {
				me._hs_mob5.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob5);
			this._hs_pc5=document.createElement('div');
			this._hs_pc5.ggId="hs pc";
			this._hs_pc5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc5.ggVisible=true;
			this._hs_pc5.className='ggskin ggskin_container ';
			this._hs_pc5.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc5.setAttribute('style',hs);
			this._hs_pc5.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc5.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc5.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc5.onmouseover=function (e) {
				me.elementMouseOver['hs_pc5']=true;
			}
			this._hs_pc5.onmouseout=function (e) {
				me.elementMouseOver['hs_pc5']=false;
			}
			this._hs_pc5.ontouchend=function (e) {
				me.elementMouseOver['hs_pc5']=false;
			}
			me._hs_pc5.ggCurrentLogicStateVisible = -1;
			this._hs_pc5.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc5.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc5.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc5.style[domTransition]='';
					if (me._hs_pc5.ggCurrentLogicStateVisible == 0) {
						me._hs_pc5.style.visibility="hidden";
						me._hs_pc5.ggVisible=false;
					}
					else {
						me._hs_pc5.style.visibility=(Number(me._hs_pc5.style.opacity)>0||!me._hs_pc5.style.opacity)?'inherit':'hidden';
						me._hs_pc5.ggVisible=true;
					}
				}
			}
			this._hs_pc5.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc5.ggNodeChange=function () {
				me._hs_pc5.ggUpdateConditionNodeChange();
			}
			this._open5=document.createElement('div');
			this._open5__text=document.createElement('div');
			this._open5.className='ggskin ggskin_textdiv';
			this._open5.ggTextDiv=this._open5__text;
			this._open5.ggId="open";
			this._open5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open5.ggVisible=true;
			this._open5.className='ggskin ggskin_text ';
			this._open5.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open5.setAttribute('style',hs);
			this._open5.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open5__text.setAttribute('style',hs);
			this._open5__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open5.appendChild(this._open5__text);
			me._open5.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open5.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open5.ggCurrentLogicStateAlpha = -1;
			this._open5.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc5'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open5.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open5.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open5.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open5.ggCurrentLogicStateAlpha == 0) {
						me._open5.style.visibility=me._open5.ggVisible?'inherit':'hidden';
						me._open5.style.opacity=1;
					}
					else {
						me._open5.style.visibility="hidden";
						me._open5.style.opacity=0;
					}
				}
			}
			this._open5.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc5.appendChild(this._open5);
			this._hs_dot5=document.createElement('div');
			this._hs_dot5__img=document.createElement('img');
			this._hs_dot5__img.className='ggskin ggskin_image';
			this._hs_dot5__img.setAttribute('src',basePath + 'images/hs_dot5.png');
			this._hs_dot5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot5__img.className='ggskin ggskin_image';
			this._hs_dot5__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot5__img);
			this._hs_dot5.appendChild(this._hs_dot5__img);
			this._hs_dot5.ggId="hs dot";
			this._hs_dot5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot5.ggVisible=true;
			this._hs_dot5.className='ggskin ggskin_image ';
			this._hs_dot5.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot5.setAttribute('style',hs);
			this._hs_dot5.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot5.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot5.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot5.ggCurrentLogicStateVisible = -1;
			this._hs_dot5.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc5'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot5.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot5.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot5.style[domTransition]='';
					if (me._hs_dot5.ggCurrentLogicStateVisible == 0) {
						me._hs_dot5.style.visibility="hidden";
						me._hs_dot5.ggVisible=false;
					}
					else {
						me._hs_dot5.style.visibility=(Number(me._hs_dot5.style.opacity)>0||!me._hs_dot5.style.opacity)?'inherit':'hidden';
						me._hs_dot5.ggVisible=true;
					}
				}
			}
			this._hs_dot5.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc5.appendChild(this._hs_dot5);
			this._hs_r5=document.createElement('div');
			this._hs_r5__img=document.createElement('img');
			this._hs_r5__img.className='ggskin ggskin_image';
			this._hs_r5__img.setAttribute('src',basePath + 'images/hs_r5.png');
			this._hs_r5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r5__img.className='ggskin ggskin_image';
			this._hs_r5__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r5__img);
			this._hs_r5.appendChild(this._hs_r5__img);
			this._hs_r5.ggId="hs R";
			this._hs_r5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r5.ggVisible=true;
			this._hs_r5.className='ggskin ggskin_image ';
			this._hs_r5.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r5.setAttribute('style',hs);
			this._hs_r5.style[domTransform + 'Origin']='50% 50%';
			me._hs_r5.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r5.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r5.ggCurrentLogicStatePosition = -1;
			this._hs_r5.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc5'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r5.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r5.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r5.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r5.ggCurrentLogicStatePosition == 0) {
						me._hs_r5.style.left='54px';
						me._hs_r5.style.top='1px';
					}
					else {
						me._hs_r5.style.left='37px';
						me._hs_r5.style.top='1px';
					}
				}
			}
			this._hs_r5.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc5.appendChild(this._hs_r5);
			this._hs_l5=document.createElement('div');
			this._hs_l5__img=document.createElement('img');
			this._hs_l5__img.className='ggskin ggskin_image';
			this._hs_l5__img.setAttribute('src',basePath + 'images/hs_l5.png');
			this._hs_l5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l5__img.className='ggskin ggskin_image';
			this._hs_l5__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l5__img);
			this._hs_l5.appendChild(this._hs_l5__img);
			this._hs_l5.ggId="hs L";
			this._hs_l5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l5.ggVisible=true;
			this._hs_l5.className='ggskin ggskin_image ';
			this._hs_l5.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l5.setAttribute('style',hs);
			this._hs_l5.style[domTransform + 'Origin']='50% 50%';
			me._hs_l5.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l5.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l5.ggCurrentLogicStatePosition = -1;
			this._hs_l5.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc5'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l5.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l5.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l5.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l5.ggCurrentLogicStatePosition == 0) {
						me._hs_l5.style.left='2px';
						me._hs_l5.style.top='1px';
					}
					else {
						me._hs_l5.style.left='19px';
						me._hs_l5.style.top='1px';
					}
				}
			}
			this._hs_l5.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc5.appendChild(this._hs_l5);
			this.__div.appendChild(this._hs_pc5);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc5']) {
				}
				me._open5.ggUpdateConditionTimer();
				me._hs_dot5.ggUpdateConditionTimer();
				me._hs_r5.ggUpdateConditionTimer();
				me._hs_l5.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='zrcon') {
			this.__div=document.createElement('div');
			this.__div.ggId="zrcon";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("zrc on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob4=document.createElement('div');
			this._hs_mob4__img=document.createElement('img');
			this._hs_mob4__img.className='ggskin ggskin_image';
			this._hs_mob4__img.setAttribute('src',basePath + 'images/hs_mob4.png');
			this._hs_mob4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob4__img.className='ggskin ggskin_image';
			this._hs_mob4__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob4__img);
			this._hs_mob4.appendChild(this._hs_mob4__img);
			this._hs_mob4.ggId="hs_mob";
			this._hs_mob4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob4.ggVisible=false;
			this._hs_mob4.className='ggskin ggskin_image ';
			this._hs_mob4.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob4.setAttribute('style',hs);
			this._hs_mob4.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob4.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob4.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob4.ggCurrentLogicStateVisible = -1;
			this._hs_mob4.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob4.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob4.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob4.style[domTransition]='';
					if (me._hs_mob4.ggCurrentLogicStateVisible == 0) {
						me._hs_mob4.style.visibility=(Number(me._hs_mob4.style.opacity)>0||!me._hs_mob4.style.opacity)?'inherit':'hidden';
						me._hs_mob4.ggVisible=true;
					}
					else {
						me._hs_mob4.style.visibility="hidden";
						me._hs_mob4.ggVisible=false;
					}
				}
			}
			this._hs_mob4.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob4.ggNodeChange=function () {
				me._hs_mob4.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob4);
			this._hs_pc4=document.createElement('div');
			this._hs_pc4.ggId="hs pc";
			this._hs_pc4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc4.ggVisible=true;
			this._hs_pc4.className='ggskin ggskin_container ';
			this._hs_pc4.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc4.setAttribute('style',hs);
			this._hs_pc4.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc4.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc4.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc4.onmouseover=function (e) {
				me.elementMouseOver['hs_pc4']=true;
			}
			this._hs_pc4.onmouseout=function (e) {
				me.elementMouseOver['hs_pc4']=false;
			}
			this._hs_pc4.ontouchend=function (e) {
				me.elementMouseOver['hs_pc4']=false;
			}
			me._hs_pc4.ggCurrentLogicStateVisible = -1;
			this._hs_pc4.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc4.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc4.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc4.style[domTransition]='';
					if (me._hs_pc4.ggCurrentLogicStateVisible == 0) {
						me._hs_pc4.style.visibility="hidden";
						me._hs_pc4.ggVisible=false;
					}
					else {
						me._hs_pc4.style.visibility=(Number(me._hs_pc4.style.opacity)>0||!me._hs_pc4.style.opacity)?'inherit':'hidden';
						me._hs_pc4.ggVisible=true;
					}
				}
			}
			this._hs_pc4.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc4.ggNodeChange=function () {
				me._hs_pc4.ggUpdateConditionNodeChange();
			}
			this._open4=document.createElement('div');
			this._open4__text=document.createElement('div');
			this._open4.className='ggskin ggskin_textdiv';
			this._open4.ggTextDiv=this._open4__text;
			this._open4.ggId="open";
			this._open4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open4.ggVisible=true;
			this._open4.className='ggskin ggskin_text ';
			this._open4.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open4.setAttribute('style',hs);
			this._open4.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open4__text.setAttribute('style',hs);
			this._open4__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open4.appendChild(this._open4__text);
			me._open4.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open4.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open4.ggCurrentLogicStateAlpha = -1;
			this._open4.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc4'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open4.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open4.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open4.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open4.ggCurrentLogicStateAlpha == 0) {
						me._open4.style.visibility=me._open4.ggVisible?'inherit':'hidden';
						me._open4.style.opacity=1;
					}
					else {
						me._open4.style.visibility="hidden";
						me._open4.style.opacity=0;
					}
				}
			}
			this._open4.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc4.appendChild(this._open4);
			this._hs_dot4=document.createElement('div');
			this._hs_dot4__img=document.createElement('img');
			this._hs_dot4__img.className='ggskin ggskin_image';
			this._hs_dot4__img.setAttribute('src',basePath + 'images/hs_dot4.png');
			this._hs_dot4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot4__img.className='ggskin ggskin_image';
			this._hs_dot4__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot4__img);
			this._hs_dot4.appendChild(this._hs_dot4__img);
			this._hs_dot4.ggId="hs dot";
			this._hs_dot4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot4.ggVisible=true;
			this._hs_dot4.className='ggskin ggskin_image ';
			this._hs_dot4.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot4.setAttribute('style',hs);
			this._hs_dot4.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot4.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot4.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot4.ggCurrentLogicStateVisible = -1;
			this._hs_dot4.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc4'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot4.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot4.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot4.style[domTransition]='';
					if (me._hs_dot4.ggCurrentLogicStateVisible == 0) {
						me._hs_dot4.style.visibility="hidden";
						me._hs_dot4.ggVisible=false;
					}
					else {
						me._hs_dot4.style.visibility=(Number(me._hs_dot4.style.opacity)>0||!me._hs_dot4.style.opacity)?'inherit':'hidden';
						me._hs_dot4.ggVisible=true;
					}
				}
			}
			this._hs_dot4.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc4.appendChild(this._hs_dot4);
			this._hs_r4=document.createElement('div');
			this._hs_r4__img=document.createElement('img');
			this._hs_r4__img.className='ggskin ggskin_image';
			this._hs_r4__img.setAttribute('src',basePath + 'images/hs_r4.png');
			this._hs_r4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r4__img.className='ggskin ggskin_image';
			this._hs_r4__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r4__img);
			this._hs_r4.appendChild(this._hs_r4__img);
			this._hs_r4.ggId="hs R";
			this._hs_r4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r4.ggVisible=true;
			this._hs_r4.className='ggskin ggskin_image ';
			this._hs_r4.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r4.setAttribute('style',hs);
			this._hs_r4.style[domTransform + 'Origin']='50% 50%';
			me._hs_r4.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r4.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r4.ggCurrentLogicStatePosition = -1;
			this._hs_r4.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc4'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r4.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r4.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r4.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r4.ggCurrentLogicStatePosition == 0) {
						me._hs_r4.style.left='54px';
						me._hs_r4.style.top='1px';
					}
					else {
						me._hs_r4.style.left='37px';
						me._hs_r4.style.top='1px';
					}
				}
			}
			this._hs_r4.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc4.appendChild(this._hs_r4);
			this._hs_l4=document.createElement('div');
			this._hs_l4__img=document.createElement('img');
			this._hs_l4__img.className='ggskin ggskin_image';
			this._hs_l4__img.setAttribute('src',basePath + 'images/hs_l4.png');
			this._hs_l4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l4__img.className='ggskin ggskin_image';
			this._hs_l4__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l4__img);
			this._hs_l4.appendChild(this._hs_l4__img);
			this._hs_l4.ggId="hs L";
			this._hs_l4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l4.ggVisible=true;
			this._hs_l4.className='ggskin ggskin_image ';
			this._hs_l4.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l4.setAttribute('style',hs);
			this._hs_l4.style[domTransform + 'Origin']='50% 50%';
			me._hs_l4.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l4.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l4.ggCurrentLogicStatePosition = -1;
			this._hs_l4.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc4'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l4.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l4.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l4.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l4.ggCurrentLogicStatePosition == 0) {
						me._hs_l4.style.left='2px';
						me._hs_l4.style.top='1px';
					}
					else {
						me._hs_l4.style.left='19px';
						me._hs_l4.style.top='1px';
					}
				}
			}
			this._hs_l4.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc4.appendChild(this._hs_l4);
			this.__div.appendChild(this._hs_pc4);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc4']) {
				}
				me._open4.ggUpdateConditionTimer();
				me._hs_dot4.ggUpdateConditionTimer();
				me._hs_r4.ggUpdateConditionTimer();
				me._hs_l4.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='zrcoff') {
			this.__div=document.createElement('div');
			this.__div.ggId="zrcoff";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("zrc off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob3=document.createElement('div');
			this._hs_mob3__img=document.createElement('img');
			this._hs_mob3__img.className='ggskin ggskin_image';
			this._hs_mob3__img.setAttribute('src',basePath + 'images/hs_mob3.png');
			this._hs_mob3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob3__img.className='ggskin ggskin_image';
			this._hs_mob3__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob3__img);
			this._hs_mob3.appendChild(this._hs_mob3__img);
			this._hs_mob3.ggId="hs_mob";
			this._hs_mob3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob3.ggVisible=false;
			this._hs_mob3.className='ggskin ggskin_image ';
			this._hs_mob3.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob3.setAttribute('style',hs);
			this._hs_mob3.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob3.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob3.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob3.ggCurrentLogicStateVisible = -1;
			this._hs_mob3.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob3.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob3.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob3.style[domTransition]='';
					if (me._hs_mob3.ggCurrentLogicStateVisible == 0) {
						me._hs_mob3.style.visibility=(Number(me._hs_mob3.style.opacity)>0||!me._hs_mob3.style.opacity)?'inherit':'hidden';
						me._hs_mob3.ggVisible=true;
					}
					else {
						me._hs_mob3.style.visibility="hidden";
						me._hs_mob3.ggVisible=false;
					}
				}
			}
			this._hs_mob3.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob3.ggNodeChange=function () {
				me._hs_mob3.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob3);
			this._hs_pc3=document.createElement('div');
			this._hs_pc3.ggId="hs pc";
			this._hs_pc3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc3.ggVisible=true;
			this._hs_pc3.className='ggskin ggskin_container ';
			this._hs_pc3.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc3.setAttribute('style',hs);
			this._hs_pc3.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc3.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc3.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc3.onmouseover=function (e) {
				me.elementMouseOver['hs_pc3']=true;
			}
			this._hs_pc3.onmouseout=function (e) {
				me.elementMouseOver['hs_pc3']=false;
			}
			this._hs_pc3.ontouchend=function (e) {
				me.elementMouseOver['hs_pc3']=false;
			}
			me._hs_pc3.ggCurrentLogicStateVisible = -1;
			this._hs_pc3.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc3.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc3.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc3.style[domTransition]='';
					if (me._hs_pc3.ggCurrentLogicStateVisible == 0) {
						me._hs_pc3.style.visibility="hidden";
						me._hs_pc3.ggVisible=false;
					}
					else {
						me._hs_pc3.style.visibility=(Number(me._hs_pc3.style.opacity)>0||!me._hs_pc3.style.opacity)?'inherit':'hidden';
						me._hs_pc3.ggVisible=true;
					}
				}
			}
			this._hs_pc3.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc3.ggNodeChange=function () {
				me._hs_pc3.ggUpdateConditionNodeChange();
			}
			this._open3=document.createElement('div');
			this._open3__text=document.createElement('div');
			this._open3.className='ggskin ggskin_textdiv';
			this._open3.ggTextDiv=this._open3__text;
			this._open3.ggId="open";
			this._open3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open3.ggVisible=true;
			this._open3.className='ggskin ggskin_text ';
			this._open3.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open3.setAttribute('style',hs);
			this._open3.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open3__text.setAttribute('style',hs);
			this._open3__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open3.appendChild(this._open3__text);
			me._open3.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open3.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open3.ggCurrentLogicStateAlpha = -1;
			this._open3.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc3'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open3.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open3.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open3.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open3.ggCurrentLogicStateAlpha == 0) {
						me._open3.style.visibility=me._open3.ggVisible?'inherit':'hidden';
						me._open3.style.opacity=1;
					}
					else {
						me._open3.style.visibility="hidden";
						me._open3.style.opacity=0;
					}
				}
			}
			this._open3.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc3.appendChild(this._open3);
			this._hs_dot3=document.createElement('div');
			this._hs_dot3__img=document.createElement('img');
			this._hs_dot3__img.className='ggskin ggskin_image';
			this._hs_dot3__img.setAttribute('src',basePath + 'images/hs_dot3.png');
			this._hs_dot3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot3__img.className='ggskin ggskin_image';
			this._hs_dot3__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot3__img);
			this._hs_dot3.appendChild(this._hs_dot3__img);
			this._hs_dot3.ggId="hs dot";
			this._hs_dot3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot3.ggVisible=true;
			this._hs_dot3.className='ggskin ggskin_image ';
			this._hs_dot3.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot3.setAttribute('style',hs);
			this._hs_dot3.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot3.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot3.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot3.ggCurrentLogicStateVisible = -1;
			this._hs_dot3.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc3'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot3.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot3.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot3.style[domTransition]='';
					if (me._hs_dot3.ggCurrentLogicStateVisible == 0) {
						me._hs_dot3.style.visibility="hidden";
						me._hs_dot3.ggVisible=false;
					}
					else {
						me._hs_dot3.style.visibility=(Number(me._hs_dot3.style.opacity)>0||!me._hs_dot3.style.opacity)?'inherit':'hidden';
						me._hs_dot3.ggVisible=true;
					}
				}
			}
			this._hs_dot3.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc3.appendChild(this._hs_dot3);
			this._hs_r3=document.createElement('div');
			this._hs_r3__img=document.createElement('img');
			this._hs_r3__img.className='ggskin ggskin_image';
			this._hs_r3__img.setAttribute('src',basePath + 'images/hs_r3.png');
			this._hs_r3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r3__img.className='ggskin ggskin_image';
			this._hs_r3__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r3__img);
			this._hs_r3.appendChild(this._hs_r3__img);
			this._hs_r3.ggId="hs R";
			this._hs_r3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r3.ggVisible=true;
			this._hs_r3.className='ggskin ggskin_image ';
			this._hs_r3.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r3.setAttribute('style',hs);
			this._hs_r3.style[domTransform + 'Origin']='50% 50%';
			me._hs_r3.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r3.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r3.ggCurrentLogicStatePosition = -1;
			this._hs_r3.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc3'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r3.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r3.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r3.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r3.ggCurrentLogicStatePosition == 0) {
						me._hs_r3.style.left='54px';
						me._hs_r3.style.top='1px';
					}
					else {
						me._hs_r3.style.left='37px';
						me._hs_r3.style.top='1px';
					}
				}
			}
			this._hs_r3.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc3.appendChild(this._hs_r3);
			this._hs_l3=document.createElement('div');
			this._hs_l3__img=document.createElement('img');
			this._hs_l3__img.className='ggskin ggskin_image';
			this._hs_l3__img.setAttribute('src',basePath + 'images/hs_l3.png');
			this._hs_l3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l3__img.className='ggskin ggskin_image';
			this._hs_l3__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l3__img);
			this._hs_l3.appendChild(this._hs_l3__img);
			this._hs_l3.ggId="hs L";
			this._hs_l3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l3.ggVisible=true;
			this._hs_l3.className='ggskin ggskin_image ';
			this._hs_l3.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l3.setAttribute('style',hs);
			this._hs_l3.style[domTransform + 'Origin']='50% 50%';
			me._hs_l3.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l3.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l3.ggCurrentLogicStatePosition = -1;
			this._hs_l3.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc3'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l3.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l3.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l3.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l3.ggCurrentLogicStatePosition == 0) {
						me._hs_l3.style.left='2px';
						me._hs_l3.style.top='1px';
					}
					else {
						me._hs_l3.style.left='19px';
						me._hs_l3.style.top='1px';
					}
				}
			}
			this._hs_l3.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc3.appendChild(this._hs_l3);
			this.__div.appendChild(this._hs_pc3);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc3']) {
				}
				me._open3.ggUpdateConditionTimer();
				me._hs_dot3.ggUpdateConditionTimer();
				me._hs_r3.ggUpdateConditionTimer();
				me._hs_l3.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='poha') {
			this.__div=document.createElement('div');
			this.__div.ggId="poha";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("poh pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob2=document.createElement('div');
			this._hs_mob2__img=document.createElement('img');
			this._hs_mob2__img.className='ggskin ggskin_image';
			this._hs_mob2__img.setAttribute('src',basePath + 'images/hs_mob2.png');
			this._hs_mob2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob2__img.className='ggskin ggskin_image';
			this._hs_mob2__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob2__img);
			this._hs_mob2.appendChild(this._hs_mob2__img);
			this._hs_mob2.ggId="hs_mob";
			this._hs_mob2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob2.ggVisible=false;
			this._hs_mob2.className='ggskin ggskin_image ';
			this._hs_mob2.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob2.setAttribute('style',hs);
			this._hs_mob2.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob2.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob2.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob2.ggCurrentLogicStateVisible = -1;
			this._hs_mob2.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob2.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob2.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob2.style[domTransition]='';
					if (me._hs_mob2.ggCurrentLogicStateVisible == 0) {
						me._hs_mob2.style.visibility=(Number(me._hs_mob2.style.opacity)>0||!me._hs_mob2.style.opacity)?'inherit':'hidden';
						me._hs_mob2.ggVisible=true;
					}
					else {
						me._hs_mob2.style.visibility="hidden";
						me._hs_mob2.ggVisible=false;
					}
				}
			}
			this._hs_mob2.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob2.ggNodeChange=function () {
				me._hs_mob2.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob2);
			this._hs_pc2=document.createElement('div');
			this._hs_pc2.ggId="hs pc";
			this._hs_pc2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc2.ggVisible=true;
			this._hs_pc2.className='ggskin ggskin_container ';
			this._hs_pc2.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc2.setAttribute('style',hs);
			this._hs_pc2.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc2.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc2.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc2.onmouseover=function (e) {
				me.elementMouseOver['hs_pc2']=true;
			}
			this._hs_pc2.onmouseout=function (e) {
				me.elementMouseOver['hs_pc2']=false;
			}
			this._hs_pc2.ontouchend=function (e) {
				me.elementMouseOver['hs_pc2']=false;
			}
			me._hs_pc2.ggCurrentLogicStateVisible = -1;
			this._hs_pc2.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc2.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc2.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc2.style[domTransition]='';
					if (me._hs_pc2.ggCurrentLogicStateVisible == 0) {
						me._hs_pc2.style.visibility="hidden";
						me._hs_pc2.ggVisible=false;
					}
					else {
						me._hs_pc2.style.visibility=(Number(me._hs_pc2.style.opacity)>0||!me._hs_pc2.style.opacity)?'inherit':'hidden';
						me._hs_pc2.ggVisible=true;
					}
				}
			}
			this._hs_pc2.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc2.ggNodeChange=function () {
				me._hs_pc2.ggUpdateConditionNodeChange();
			}
			this._open2=document.createElement('div');
			this._open2__text=document.createElement('div');
			this._open2.className='ggskin ggskin_textdiv';
			this._open2.ggTextDiv=this._open2__text;
			this._open2.ggId="open";
			this._open2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open2.ggVisible=true;
			this._open2.className='ggskin ggskin_text ';
			this._open2.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open2.setAttribute('style',hs);
			this._open2.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open2__text.setAttribute('style',hs);
			this._open2__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open2.appendChild(this._open2__text);
			me._open2.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open2.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open2.ggCurrentLogicStateAlpha = -1;
			this._open2.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc2'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open2.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open2.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open2.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open2.ggCurrentLogicStateAlpha == 0) {
						me._open2.style.visibility=me._open2.ggVisible?'inherit':'hidden';
						me._open2.style.opacity=1;
					}
					else {
						me._open2.style.visibility="hidden";
						me._open2.style.opacity=0;
					}
				}
			}
			this._open2.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc2.appendChild(this._open2);
			this._hs_dot2=document.createElement('div');
			this._hs_dot2__img=document.createElement('img');
			this._hs_dot2__img.className='ggskin ggskin_image';
			this._hs_dot2__img.setAttribute('src',basePath + 'images/hs_dot2.png');
			this._hs_dot2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot2__img.className='ggskin ggskin_image';
			this._hs_dot2__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot2__img);
			this._hs_dot2.appendChild(this._hs_dot2__img);
			this._hs_dot2.ggId="hs dot";
			this._hs_dot2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot2.ggVisible=true;
			this._hs_dot2.className='ggskin ggskin_image ';
			this._hs_dot2.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot2.setAttribute('style',hs);
			this._hs_dot2.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot2.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot2.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot2.ggCurrentLogicStateVisible = -1;
			this._hs_dot2.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc2'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot2.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot2.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot2.style[domTransition]='';
					if (me._hs_dot2.ggCurrentLogicStateVisible == 0) {
						me._hs_dot2.style.visibility="hidden";
						me._hs_dot2.ggVisible=false;
					}
					else {
						me._hs_dot2.style.visibility=(Number(me._hs_dot2.style.opacity)>0||!me._hs_dot2.style.opacity)?'inherit':'hidden';
						me._hs_dot2.ggVisible=true;
					}
				}
			}
			this._hs_dot2.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc2.appendChild(this._hs_dot2);
			this._hs_r2=document.createElement('div');
			this._hs_r2__img=document.createElement('img');
			this._hs_r2__img.className='ggskin ggskin_image';
			this._hs_r2__img.setAttribute('src',basePath + 'images/hs_r2.png');
			this._hs_r2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r2__img.className='ggskin ggskin_image';
			this._hs_r2__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r2__img);
			this._hs_r2.appendChild(this._hs_r2__img);
			this._hs_r2.ggId="hs R";
			this._hs_r2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r2.ggVisible=true;
			this._hs_r2.className='ggskin ggskin_image ';
			this._hs_r2.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r2.setAttribute('style',hs);
			this._hs_r2.style[domTransform + 'Origin']='50% 50%';
			me._hs_r2.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r2.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r2.ggCurrentLogicStatePosition = -1;
			this._hs_r2.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc2'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r2.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r2.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r2.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r2.ggCurrentLogicStatePosition == 0) {
						me._hs_r2.style.left='54px';
						me._hs_r2.style.top='1px';
					}
					else {
						me._hs_r2.style.left='37px';
						me._hs_r2.style.top='1px';
					}
				}
			}
			this._hs_r2.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc2.appendChild(this._hs_r2);
			this._hs_l2=document.createElement('div');
			this._hs_l2__img=document.createElement('img');
			this._hs_l2__img.className='ggskin ggskin_image';
			this._hs_l2__img.setAttribute('src',basePath + 'images/hs_l2.png');
			this._hs_l2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l2__img.className='ggskin ggskin_image';
			this._hs_l2__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l2__img);
			this._hs_l2.appendChild(this._hs_l2__img);
			this._hs_l2.ggId="hs L";
			this._hs_l2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l2.ggVisible=true;
			this._hs_l2.className='ggskin ggskin_image ';
			this._hs_l2.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l2.setAttribute('style',hs);
			this._hs_l2.style[domTransform + 'Origin']='50% 50%';
			me._hs_l2.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l2.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l2.ggCurrentLogicStatePosition = -1;
			this._hs_l2.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc2'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l2.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l2.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l2.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l2.ggCurrentLogicStatePosition == 0) {
						me._hs_l2.style.left='2px';
						me._hs_l2.style.top='1px';
					}
					else {
						me._hs_l2.style.left='19px';
						me._hs_l2.style.top='1px';
					}
				}
			}
			this._hs_l2.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc2.appendChild(this._hs_l2);
			this.__div.appendChild(this._hs_pc2);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc2']) {
				}
				me._open2.ggUpdateConditionTimer();
				me._hs_dot2.ggUpdateConditionTimer();
				me._hs_r2.ggUpdateConditionTimer();
				me._hs_l2.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='pohon') {
			this.__div=document.createElement('div');
			this.__div.ggId="pohon";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("poh on pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob1=document.createElement('div');
			this._hs_mob1__img=document.createElement('img');
			this._hs_mob1__img.className='ggskin ggskin_image';
			this._hs_mob1__img.setAttribute('src',basePath + 'images/hs_mob1.png');
			this._hs_mob1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob1__img.className='ggskin ggskin_image';
			this._hs_mob1__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob1__img);
			this._hs_mob1.appendChild(this._hs_mob1__img);
			this._hs_mob1.ggId="hs_mob";
			this._hs_mob1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob1.ggVisible=false;
			this._hs_mob1.className='ggskin ggskin_image ';
			this._hs_mob1.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob1.setAttribute('style',hs);
			this._hs_mob1.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob1.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob1.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob1.ggCurrentLogicStateVisible = -1;
			this._hs_mob1.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob1.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob1.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob1.style[domTransition]='';
					if (me._hs_mob1.ggCurrentLogicStateVisible == 0) {
						me._hs_mob1.style.visibility=(Number(me._hs_mob1.style.opacity)>0||!me._hs_mob1.style.opacity)?'inherit':'hidden';
						me._hs_mob1.ggVisible=true;
					}
					else {
						me._hs_mob1.style.visibility="hidden";
						me._hs_mob1.ggVisible=false;
					}
				}
			}
			this._hs_mob1.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob1.ggNodeChange=function () {
				me._hs_mob1.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob1);
			this._hs_pc1=document.createElement('div');
			this._hs_pc1.ggId="hs pc";
			this._hs_pc1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc1.ggVisible=true;
			this._hs_pc1.className='ggskin ggskin_container ';
			this._hs_pc1.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc1.setAttribute('style',hs);
			this._hs_pc1.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc1.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc1.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc1.onmouseover=function (e) {
				me.elementMouseOver['hs_pc1']=true;
			}
			this._hs_pc1.onmouseout=function (e) {
				me.elementMouseOver['hs_pc1']=false;
			}
			this._hs_pc1.ontouchend=function (e) {
				me.elementMouseOver['hs_pc1']=false;
			}
			me._hs_pc1.ggCurrentLogicStateVisible = -1;
			this._hs_pc1.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc1.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc1.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc1.style[domTransition]='';
					if (me._hs_pc1.ggCurrentLogicStateVisible == 0) {
						me._hs_pc1.style.visibility="hidden";
						me._hs_pc1.ggVisible=false;
					}
					else {
						me._hs_pc1.style.visibility=(Number(me._hs_pc1.style.opacity)>0||!me._hs_pc1.style.opacity)?'inherit':'hidden';
						me._hs_pc1.ggVisible=true;
					}
				}
			}
			this._hs_pc1.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc1.ggNodeChange=function () {
				me._hs_pc1.ggUpdateConditionNodeChange();
			}
			this._open1=document.createElement('div');
			this._open1__text=document.createElement('div');
			this._open1.className='ggskin ggskin_textdiv';
			this._open1.ggTextDiv=this._open1__text;
			this._open1.ggId="open";
			this._open1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open1.ggVisible=true;
			this._open1.className='ggskin ggskin_text ';
			this._open1.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open1.setAttribute('style',hs);
			this._open1.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open1__text.setAttribute('style',hs);
			this._open1__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open1.appendChild(this._open1__text);
			me._open1.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open1.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open1.ggCurrentLogicStateAlpha = -1;
			this._open1.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc1'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open1.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open1.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open1.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open1.ggCurrentLogicStateAlpha == 0) {
						me._open1.style.visibility=me._open1.ggVisible?'inherit':'hidden';
						me._open1.style.opacity=1;
					}
					else {
						me._open1.style.visibility="hidden";
						me._open1.style.opacity=0;
					}
				}
			}
			this._open1.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc1.appendChild(this._open1);
			this._hs_dot1=document.createElement('div');
			this._hs_dot1__img=document.createElement('img');
			this._hs_dot1__img.className='ggskin ggskin_image';
			this._hs_dot1__img.setAttribute('src',basePath + 'images/hs_dot1.png');
			this._hs_dot1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot1__img.className='ggskin ggskin_image';
			this._hs_dot1__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot1__img);
			this._hs_dot1.appendChild(this._hs_dot1__img);
			this._hs_dot1.ggId="hs dot";
			this._hs_dot1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot1.ggVisible=true;
			this._hs_dot1.className='ggskin ggskin_image ';
			this._hs_dot1.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot1.setAttribute('style',hs);
			this._hs_dot1.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot1.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot1.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot1.ggCurrentLogicStateVisible = -1;
			this._hs_dot1.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc1'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot1.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot1.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot1.style[domTransition]='';
					if (me._hs_dot1.ggCurrentLogicStateVisible == 0) {
						me._hs_dot1.style.visibility="hidden";
						me._hs_dot1.ggVisible=false;
					}
					else {
						me._hs_dot1.style.visibility=(Number(me._hs_dot1.style.opacity)>0||!me._hs_dot1.style.opacity)?'inherit':'hidden';
						me._hs_dot1.ggVisible=true;
					}
				}
			}
			this._hs_dot1.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc1.appendChild(this._hs_dot1);
			this._hs_r1=document.createElement('div');
			this._hs_r1__img=document.createElement('img');
			this._hs_r1__img.className='ggskin ggskin_image';
			this._hs_r1__img.setAttribute('src',basePath + 'images/hs_r1.png');
			this._hs_r1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r1__img.className='ggskin ggskin_image';
			this._hs_r1__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r1__img);
			this._hs_r1.appendChild(this._hs_r1__img);
			this._hs_r1.ggId="hs R";
			this._hs_r1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r1.ggVisible=true;
			this._hs_r1.className='ggskin ggskin_image ';
			this._hs_r1.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r1.setAttribute('style',hs);
			this._hs_r1.style[domTransform + 'Origin']='50% 50%';
			me._hs_r1.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r1.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r1.ggCurrentLogicStatePosition = -1;
			this._hs_r1.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc1'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r1.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r1.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r1.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r1.ggCurrentLogicStatePosition == 0) {
						me._hs_r1.style.left='54px';
						me._hs_r1.style.top='1px';
					}
					else {
						me._hs_r1.style.left='37px';
						me._hs_r1.style.top='1px';
					}
				}
			}
			this._hs_r1.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc1.appendChild(this._hs_r1);
			this._hs_l1=document.createElement('div');
			this._hs_l1__img=document.createElement('img');
			this._hs_l1__img.className='ggskin ggskin_image';
			this._hs_l1__img.setAttribute('src',basePath + 'images/hs_l1.png');
			this._hs_l1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l1__img.className='ggskin ggskin_image';
			this._hs_l1__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l1__img);
			this._hs_l1.appendChild(this._hs_l1__img);
			this._hs_l1.ggId="hs L";
			this._hs_l1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l1.ggVisible=true;
			this._hs_l1.className='ggskin ggskin_image ';
			this._hs_l1.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l1.setAttribute('style',hs);
			this._hs_l1.style[domTransform + 'Origin']='50% 50%';
			me._hs_l1.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l1.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l1.ggCurrentLogicStatePosition = -1;
			this._hs_l1.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc1'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l1.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l1.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l1.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l1.ggCurrentLogicStatePosition == 0) {
						me._hs_l1.style.left='2px';
						me._hs_l1.style.top='1px';
					}
					else {
						me._hs_l1.style.left='19px';
						me._hs_l1.style.top='1px';
					}
				}
			}
			this._hs_l1.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc1.appendChild(this._hs_l1);
			this.__div.appendChild(this._hs_pc1);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc1']) {
				}
				me._open1.ggUpdateConditionTimer();
				me._hs_dot1.ggUpdateConditionTimer();
				me._hs_r1.ggUpdateConditionTimer();
				me._hs_l1.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='pohoff') {
			this.__div=document.createElement('div');
			this.__div.ggId="pohoff";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("poh off pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob0=document.createElement('div');
			this._hs_mob0__img=document.createElement('img');
			this._hs_mob0__img.className='ggskin ggskin_image';
			this._hs_mob0__img.setAttribute('src',basePath + 'images/hs_mob0.png');
			this._hs_mob0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob0__img.className='ggskin ggskin_image';
			this._hs_mob0__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob0__img);
			this._hs_mob0.appendChild(this._hs_mob0__img);
			this._hs_mob0.ggId="hs_mob";
			this._hs_mob0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob0.ggVisible=false;
			this._hs_mob0.className='ggskin ggskin_image ';
			this._hs_mob0.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob0.setAttribute('style',hs);
			this._hs_mob0.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob0.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob0.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob0.ggCurrentLogicStateVisible = -1;
			this._hs_mob0.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob0.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob0.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob0.style[domTransition]='';
					if (me._hs_mob0.ggCurrentLogicStateVisible == 0) {
						me._hs_mob0.style.visibility=(Number(me._hs_mob0.style.opacity)>0||!me._hs_mob0.style.opacity)?'inherit':'hidden';
						me._hs_mob0.ggVisible=true;
					}
					else {
						me._hs_mob0.style.visibility="hidden";
						me._hs_mob0.ggVisible=false;
					}
				}
			}
			this._hs_mob0.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob0.ggNodeChange=function () {
				me._hs_mob0.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob0);
			this._hs_pc0=document.createElement('div');
			this._hs_pc0.ggId="hs pc";
			this._hs_pc0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc0.ggVisible=true;
			this._hs_pc0.className='ggskin ggskin_container ';
			this._hs_pc0.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc0.setAttribute('style',hs);
			this._hs_pc0.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc0.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc0.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc0.onmouseover=function (e) {
				me.elementMouseOver['hs_pc0']=true;
			}
			this._hs_pc0.onmouseout=function (e) {
				me.elementMouseOver['hs_pc0']=false;
			}
			this._hs_pc0.ontouchend=function (e) {
				me.elementMouseOver['hs_pc0']=false;
			}
			me._hs_pc0.ggCurrentLogicStateVisible = -1;
			this._hs_pc0.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc0.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc0.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc0.style[domTransition]='';
					if (me._hs_pc0.ggCurrentLogicStateVisible == 0) {
						me._hs_pc0.style.visibility="hidden";
						me._hs_pc0.ggVisible=false;
					}
					else {
						me._hs_pc0.style.visibility=(Number(me._hs_pc0.style.opacity)>0||!me._hs_pc0.style.opacity)?'inherit':'hidden';
						me._hs_pc0.ggVisible=true;
					}
				}
			}
			this._hs_pc0.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc0.ggNodeChange=function () {
				me._hs_pc0.ggUpdateConditionNodeChange();
			}
			this._open0=document.createElement('div');
			this._open0__text=document.createElement('div');
			this._open0.className='ggskin ggskin_textdiv';
			this._open0.ggTextDiv=this._open0__text;
			this._open0.ggId="open";
			this._open0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open0.ggVisible=true;
			this._open0.className='ggskin ggskin_text ';
			this._open0.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open0.setAttribute('style',hs);
			this._open0.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open0__text.setAttribute('style',hs);
			this._open0__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open0.appendChild(this._open0__text);
			me._open0.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open0.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open0.ggCurrentLogicStateAlpha = -1;
			this._open0.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc0'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open0.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open0.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open0.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open0.ggCurrentLogicStateAlpha == 0) {
						me._open0.style.visibility=me._open0.ggVisible?'inherit':'hidden';
						me._open0.style.opacity=1;
					}
					else {
						me._open0.style.visibility="hidden";
						me._open0.style.opacity=0;
					}
				}
			}
			this._open0.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc0.appendChild(this._open0);
			this._hs_dot0=document.createElement('div');
			this._hs_dot0__img=document.createElement('img');
			this._hs_dot0__img.className='ggskin ggskin_image';
			this._hs_dot0__img.setAttribute('src',basePath + 'images/hs_dot0.png');
			this._hs_dot0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot0__img.className='ggskin ggskin_image';
			this._hs_dot0__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot0__img);
			this._hs_dot0.appendChild(this._hs_dot0__img);
			this._hs_dot0.ggId="hs dot";
			this._hs_dot0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot0.ggVisible=true;
			this._hs_dot0.className='ggskin ggskin_image ';
			this._hs_dot0.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot0.setAttribute('style',hs);
			this._hs_dot0.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot0.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot0.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot0.ggCurrentLogicStateVisible = -1;
			this._hs_dot0.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc0'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot0.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot0.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot0.style[domTransition]='';
					if (me._hs_dot0.ggCurrentLogicStateVisible == 0) {
						me._hs_dot0.style.visibility="hidden";
						me._hs_dot0.ggVisible=false;
					}
					else {
						me._hs_dot0.style.visibility=(Number(me._hs_dot0.style.opacity)>0||!me._hs_dot0.style.opacity)?'inherit':'hidden';
						me._hs_dot0.ggVisible=true;
					}
				}
			}
			this._hs_dot0.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc0.appendChild(this._hs_dot0);
			this._hs_r0=document.createElement('div');
			this._hs_r0__img=document.createElement('img');
			this._hs_r0__img.className='ggskin ggskin_image';
			this._hs_r0__img.setAttribute('src',basePath + 'images/hs_r0.png');
			this._hs_r0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r0__img.className='ggskin ggskin_image';
			this._hs_r0__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r0__img);
			this._hs_r0.appendChild(this._hs_r0__img);
			this._hs_r0.ggId="hs R";
			this._hs_r0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r0.ggVisible=true;
			this._hs_r0.className='ggskin ggskin_image ';
			this._hs_r0.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r0.setAttribute('style',hs);
			this._hs_r0.style[domTransform + 'Origin']='50% 50%';
			me._hs_r0.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r0.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r0.ggCurrentLogicStatePosition = -1;
			this._hs_r0.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc0'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r0.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r0.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r0.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r0.ggCurrentLogicStatePosition == 0) {
						me._hs_r0.style.left='54px';
						me._hs_r0.style.top='1px';
					}
					else {
						me._hs_r0.style.left='37px';
						me._hs_r0.style.top='1px';
					}
				}
			}
			this._hs_r0.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc0.appendChild(this._hs_r0);
			this._hs_l0=document.createElement('div');
			this._hs_l0__img=document.createElement('img');
			this._hs_l0__img.className='ggskin ggskin_image';
			this._hs_l0__img.setAttribute('src',basePath + 'images/hs_l0.png');
			this._hs_l0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l0__img.className='ggskin ggskin_image';
			this._hs_l0__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l0__img);
			this._hs_l0.appendChild(this._hs_l0__img);
			this._hs_l0.ggId="hs L";
			this._hs_l0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l0.ggVisible=true;
			this._hs_l0.className='ggskin ggskin_image ';
			this._hs_l0.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l0.setAttribute('style',hs);
			this._hs_l0.style[domTransform + 'Origin']='50% 50%';
			me._hs_l0.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l0.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l0.ggCurrentLogicStatePosition = -1;
			this._hs_l0.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc0'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l0.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l0.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l0.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l0.ggCurrentLogicStatePosition == 0) {
						me._hs_l0.style.left='2px';
						me._hs_l0.style.top='1px';
					}
					else {
						me._hs_l0.style.left='19px';
						me._hs_l0.style.top='1px';
					}
				}
			}
			this._hs_l0.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc0.appendChild(this._hs_l0);
			this.__div.appendChild(this._hs_pc0);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc0']) {
				}
				me._open0.ggUpdateConditionTimer();
				me._hs_dot0.ggUpdateConditionTimer();
				me._hs_r0.ggUpdateConditionTimer();
				me._hs_l0.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		if (hotspot.skinid=='tele') {
			this.__div=document.createElement('div');
			this.__div.ggId="tele";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : -5px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				var list=me.findElements("tel pic",true);
				while(list.length>0) {
					var e=list.pop();
					if (me.player.transitionsDisabled) {
						e.style[domTransition]='none';
					} else {
						e.style[domTransition]='all 500ms ease-out 0ms';
					}
					e.style.opacity='1';
					e.style.visibility=e.ggVisible?'inherit':'hidden';
				}
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			me.__div.ggCurrentLogicStateVisible = -1;
			this.__div.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(ggSkinVars['hide'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me.__div.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me.__div.ggCurrentLogicStateVisible = newLogicStateVisible;
					me.__div.style[domTransition]='';
					if (me.__div.ggCurrentLogicStateVisible == 0) {
						me.__div.style.visibility="hidden";
						me.__div.ggVisible=false;
					}
					else {
						me.__div.style.visibility=(Number(me.__div.style.opacity)>0||!me.__div.style.opacity)?'inherit':'hidden';
						me.__div.ggVisible=true;
					}
				}
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob=document.createElement('div');
			this._hs_mob__img=document.createElement('img');
			this._hs_mob__img.className='ggskin ggskin_image';
			this._hs_mob__img.setAttribute('src',basePath + 'images/hs_mob.png');
			this._hs_mob__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_mob__img.className='ggskin ggskin_image';
			this._hs_mob__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_mob__img);
			this._hs_mob.appendChild(this._hs_mob__img);
			this._hs_mob.ggId="hs_mob";
			this._hs_mob.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_mob.ggVisible=false;
			this._hs_mob.className='ggskin ggskin_image ';
			this._hs_mob.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : -18px;';
			hs+='position : absolute;';
			hs+='top : -14px;';
			hs+='visibility : hidden;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_mob.setAttribute('style',hs);
			this._hs_mob.style[domTransform + 'Origin']='50% 50%';
			me._hs_mob.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_mob.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_mob.ggCurrentLogicStateVisible = -1;
			this._hs_mob.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_mob.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_mob.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_mob.style[domTransition]='';
					if (me._hs_mob.ggCurrentLogicStateVisible == 0) {
						me._hs_mob.style.visibility=(Number(me._hs_mob.style.opacity)>0||!me._hs_mob.style.opacity)?'inherit':'hidden';
						me._hs_mob.ggVisible=true;
					}
					else {
						me._hs_mob.style.visibility="hidden";
						me._hs_mob.ggVisible=false;
					}
				}
			}
			this._hs_mob.ggUpdatePosition=function (useTransition) {
			}
			this._hs_mob.ggNodeChange=function () {
				me._hs_mob.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._hs_mob);
			this._hs_pc=document.createElement('div');
			this._hs_pc.ggId="hs pc";
			this._hs_pc.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_pc.ggVisible=true;
			this._hs_pc.className='ggskin ggskin_container ';
			this._hs_pc.ggType='container';
			hs ='';
			hs+='height : 24px;';
			hs+='left : -37px;';
			hs+='position : absolute;';
			hs+='top : -15px;';
			hs+='visibility : inherit;';
			hs+='width : 74px;';
			hs+='pointer-events:none;';
			this._hs_pc.setAttribute('style',hs);
			this._hs_pc.style[domTransform + 'Origin']='50% 50%';
			me._hs_pc.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_pc.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hs_pc.onmouseover=function (e) {
				me.elementMouseOver['hs_pc']=true;
			}
			this._hs_pc.onmouseout=function (e) {
				me.elementMouseOver['hs_pc']=false;
			}
			this._hs_pc.ontouchend=function (e) {
				me.elementMouseOver['hs_pc']=false;
			}
			me._hs_pc.ggCurrentLogicStateVisible = -1;
			this._hs_pc.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.getIsMobile() == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_pc.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_pc.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_pc.style[domTransition]='';
					if (me._hs_pc.ggCurrentLogicStateVisible == 0) {
						me._hs_pc.style.visibility="hidden";
						me._hs_pc.ggVisible=false;
					}
					else {
						me._hs_pc.style.visibility=(Number(me._hs_pc.style.opacity)>0||!me._hs_pc.style.opacity)?'inherit':'hidden';
						me._hs_pc.ggVisible=true;
					}
				}
			}
			this._hs_pc.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc.ggNodeChange=function () {
				me._hs_pc.ggUpdateConditionNodeChange();
			}
			this._open=document.createElement('div');
			this._open__text=document.createElement('div');
			this._open.className='ggskin ggskin_textdiv';
			this._open.ggTextDiv=this._open__text;
			this._open.ggId="open";
			this._open.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._open.ggVisible=true;
			this._open.className='ggskin ggskin_text ';
			this._open.ggType='text';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 26px;';
			hs+='left : -4px;';
			hs+='opacity : 0;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : hidden;';
			hs+='width : 80px;';
			hs+='pointer-events:auto;';
			hs+='font-size: 11pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
			this._open.setAttribute('style',hs);
			this._open.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: 80px;';
			hs+='height: 26px;';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 0px 1px 0px 1px;';
			hs+='overflow: hidden;';
			this._open__text.setAttribute('style',hs);
			this._open__text.innerHTML="<b><span style=\"font-family: Copperplate Gothic;\">OPEN<\/span><\/b>";
			this._open.appendChild(this._open__text);
			me._open.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._open.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._open.ggCurrentLogicStateAlpha = -1;
			this._open.ggUpdateConditionTimer=function () {
				var newLogicStateAlpha;
				if (
					(me.elementMouseOver['hs_pc'] == true)
				)
				{
					newLogicStateAlpha = 0;
				}
				else {
					newLogicStateAlpha = -1;
				}
				if (me._open.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
					me._open.ggCurrentLogicStateAlpha = newLogicStateAlpha;
					me._open.style[domTransition]='opacity 200ms ease 0ms, visibility 200ms ease 0ms';
					if (me._open.ggCurrentLogicStateAlpha == 0) {
						me._open.style.visibility=me._open.ggVisible?'inherit':'hidden';
						me._open.style.opacity=1;
					}
					else {
						me._open.style.visibility="hidden";
						me._open.style.opacity=0;
					}
				}
			}
			this._open.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc.appendChild(this._open);
			this._hs_dot=document.createElement('div');
			this._hs_dot__img=document.createElement('img');
			this._hs_dot__img.className='ggskin ggskin_image';
			this._hs_dot__img.setAttribute('src',basePath + 'images/hs_dot.png');
			this._hs_dot__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_dot__img.className='ggskin ggskin_image';
			this._hs_dot__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_dot__img);
			this._hs_dot.appendChild(this._hs_dot__img);
			this._hs_dot.ggId="hs dot";
			this._hs_dot.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_dot.ggVisible=true;
			this._hs_dot.className='ggskin ggskin_image ';
			this._hs_dot.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 36px;';
			hs+='pointer-events:auto;';
			this._hs_dot.setAttribute('style',hs);
			this._hs_dot.style[domTransform + 'Origin']='50% 50%';
			me._hs_dot.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_dot.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_dot.ggCurrentLogicStateVisible = -1;
			this._hs_dot.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['hs_pc'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hs_dot.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hs_dot.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hs_dot.style[domTransition]='';
					if (me._hs_dot.ggCurrentLogicStateVisible == 0) {
						me._hs_dot.style.visibility="hidden";
						me._hs_dot.ggVisible=false;
					}
					else {
						me._hs_dot.style.visibility=(Number(me._hs_dot.style.opacity)>0||!me._hs_dot.style.opacity)?'inherit':'hidden';
						me._hs_dot.ggVisible=true;
					}
				}
			}
			this._hs_dot.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc.appendChild(this._hs_dot);
			this._hs_r=document.createElement('div');
			this._hs_r__img=document.createElement('img');
			this._hs_r__img.className='ggskin ggskin_image';
			this._hs_r__img.setAttribute('src',basePath + 'images/hs_r.png');
			this._hs_r__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_r__img.className='ggskin ggskin_image';
			this._hs_r__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_r__img);
			this._hs_r.appendChild(this._hs_r__img);
			this._hs_r.ggId="hs R";
			this._hs_r.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_r.ggVisible=true;
			this._hs_r.className='ggskin ggskin_image ';
			this._hs_r.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 37px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_r.setAttribute('style',hs);
			this._hs_r.style[domTransform + 'Origin']='50% 50%';
			me._hs_r.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_r.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_r.ggCurrentLogicStatePosition = -1;
			this._hs_r.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_r.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_r.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_r.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_r.ggCurrentLogicStatePosition == 0) {
						me._hs_r.style.left='54px';
						me._hs_r.style.top='1px';
					}
					else {
						me._hs_r.style.left='37px';
						me._hs_r.style.top='1px';
					}
				}
			}
			this._hs_r.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc.appendChild(this._hs_r);
			this._hs_l=document.createElement('div');
			this._hs_l__img=document.createElement('img');
			this._hs_l__img.className='ggskin ggskin_image';
			this._hs_l__img.setAttribute('src',basePath + 'images/hs_l.png');
			this._hs_l__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hs_l__img.className='ggskin ggskin_image';
			this._hs_l__img['ondragstart']=function() { return false; };
			me.player.checkLoaded.push(this._hs_l__img);
			this._hs_l.appendChild(this._hs_l__img);
			this._hs_l.ggId="hs L";
			this._hs_l.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hs_l.ggVisible=true;
			this._hs_l.className='ggskin ggskin_image ';
			this._hs_l.ggType='image';
			hs ='';
			hs+='height : 28px;';
			hs+='left : 19px;';
			hs+='position : absolute;';
			hs+='top : 1px;';
			hs+='visibility : inherit;';
			hs+='width : 18px;';
			hs+='pointer-events:auto;';
			this._hs_l.setAttribute('style',hs);
			this._hs_l.style[domTransform + 'Origin']='50% 50%';
			me._hs_l.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hs_l.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hs_l.ggCurrentLogicStatePosition = -1;
			this._hs_l.ggUpdateConditionTimer=function () {
				var newLogicStatePosition;
				if (
					(me.elementMouseOver['hs_pc'] == true)
				)
				{
					newLogicStatePosition = 0;
				}
				else {
					newLogicStatePosition = -1;
				}
				if (me._hs_l.ggCurrentLogicStatePosition != newLogicStatePosition) {
					me._hs_l.ggCurrentLogicStatePosition = newLogicStatePosition;
					me._hs_l.style[domTransition]='left 200ms ease 0ms, top 200ms ease 0ms';
					if (me._hs_l.ggCurrentLogicStatePosition == 0) {
						me._hs_l.style.left='2px';
						me._hs_l.style.top='1px';
					}
					else {
						me._hs_l.style.left='19px';
						me._hs_l.style.top='1px';
					}
				}
			}
			this._hs_l.ggUpdatePosition=function (useTransition) {
			}
			this._hs_pc.appendChild(this._hs_l);
			this.__div.appendChild(this._hs_pc);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				me.__div.ggUpdateConditionTimer();
				if (me.elementMouseOver['hs_pc']) {
				}
				me._open.ggUpdateConditionTimer();
				me._hs_dot.ggUpdateConditionTimer();
				me._hs_r.ggUpdateConditionTimer();
				me._hs_l.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		} else
		{
			this.__div=document.createElement('div');
			this.__div.ggId="ht_node";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='height : 5px;';
			hs+='left : 75px;';
			hs+='position : absolute;';
			hs+='top : 35px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				me.player.openNext(me.hotspot.url,"");
				me.player.playSound("Element01","0");
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['_div']=true;
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me.elementMouseOver['_div']=false;
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ontouchend=function (e) {
				me.elementMouseOver['_div']=false;
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._hsimage_node=document.createElement('div');
			this._hsimage_node__img=document.createElement('img');
			this._hsimage_node__img.className='ggskin ggskin_svg';
			this._hsimage_node__img.setAttribute('src',basePath + 'images/hsimage_node.svg');
			this._hsimage_node__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._hsimage_node__img['ondragstart']=function() { return false; };
			this._hsimage_node.appendChild(this._hsimage_node__img);
			this._hsimage_node__imgo=document.createElement('img');
			this._hsimage_node__imgo.className='ggskin ggskin_svg';
			this._hsimage_node__imgo.setAttribute('src',basePath + 'images/hsimage_node__o.svg');
			this._hsimage_node__imgo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;');
			this._hsimage_node__imgo['ondragstart']=function() { return false; };
			this._hsimage_node.appendChild(this._hsimage_node__imgo);
			this._hsimage_node.ggId="hsimage_node";
			this._hsimage_node.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hsimage_node.ggVisible=true;
			this._hsimage_node.className='ggskin ggskin_svg ';
			this._hsimage_node.ggType='svg';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 32px;';
			hs+='left : -16px;';
			hs+='position : absolute;';
			hs+='top : -16px;';
			hs+='visibility : inherit;';
			hs+='width : 32px;';
			hs+='pointer-events:auto;';
			this._hsimage_node.setAttribute('style',hs);
			this._hsimage_node.style[domTransform + 'Origin']='50% 50%';
			me._hsimage_node.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hsimage_node.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._hsimage_node.onmouseover=function (e) {
				me._hsimage_node__img.style.visibility='hidden';
				me._hsimage_node__imgo.style.visibility='inherit';
			}
			this._hsimage_node.onmouseout=function (e) {
				me._hsimage_node__img.style.visibility='inherit';
				me._hsimage_node__imgo.style.visibility='hidden';
			}
			this._hsimage_node.ggUpdatePosition=function (useTransition) {
			}
			this.__div.appendChild(this._hsimage_node);
			this._hotspot_preview=document.createElement('div');
			this._hotspot_preview.ggId="hotspot_preview";
			this._hotspot_preview.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._hotspot_preview.ggVisible=false;
			this._hotspot_preview.className='ggskin ggskin_container ';
			this._hotspot_preview.ggType='container';
			hs ='';
			hs+='height : 103px;';
			hs+='left : -73px;';
			hs+='position : absolute;';
			hs+='top : -128px;';
			hs+='visibility : hidden;';
			hs+='width : 153px;';
			hs+='pointer-events:none;';
			this._hotspot_preview.setAttribute('style',hs);
			this._hotspot_preview.style[domTransform + 'Origin']='50% 50%';
			me._hotspot_preview.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._hotspot_preview.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._hotspot_preview.ggCurrentLogicStateVisible = -1;
			this._hotspot_preview.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['_div'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._hotspot_preview.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._hotspot_preview.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._hotspot_preview.style[domTransition]='';
					if (me._hotspot_preview.ggCurrentLogicStateVisible == 0) {
						me._hotspot_preview.style.visibility=(Number(me._hotspot_preview.style.opacity)>0||!me._hotspot_preview.style.opacity)?'inherit':'hidden';
						me._hotspot_preview.ggVisible=true;
					}
					else {
						me._hotspot_preview.style.visibility="hidden";
						me._hotspot_preview.ggVisible=false;
					}
				}
			}
			this._hotspot_preview.ggUpdatePosition=function (useTransition) {
			}
			this._preview_picture_frame_=document.createElement('div');
			this._preview_picture_frame_.ggId="preview_picture_frame ";
			this._preview_picture_frame_.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._preview_picture_frame_.ggVisible=true;
			this._preview_picture_frame_.className='ggskin ggskin_rectangle ';
			this._preview_picture_frame_.ggType='rectangle';
			hs ='';
			hs+=cssPrefix + 'border-radius : 5px;';
			hs+='border-radius : 5px;';
			hs+='background : rgba(255,255,255,0.784314);';
			hs+='border : 1px solid #000000;';
			hs+='cursor : default;';
			hs+='height : 99px;';
			hs+='left : 0px;';
			hs+='position : absolute;';
			hs+='top : 0px;';
			hs+='visibility : inherit;';
			hs+='width : 149px;';
			hs+='pointer-events:auto;';
			this._preview_picture_frame_.setAttribute('style',hs);
			this._preview_picture_frame_.style[domTransform + 'Origin']='50% 50%';
			me._preview_picture_frame_.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._preview_picture_frame_.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			this._preview_picture_frame_.ggUpdatePosition=function (useTransition) {
			}
			this._hotspot_preview.appendChild(this._preview_picture_frame_);
			this._preview_nodeimage=document.createElement('div');
			this._preview_nodeimage__img=document.createElement('img');
			this._preview_nodeimage__img.className='ggskin ggskin_nodeimage';
			this._preview_nodeimage__img.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
			this._preview_nodeimage.ggNodeId=nodeId;
			this._preview_nodeimage__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._preview_nodeimage__img.className='ggskin ggskin_nodeimage';
			this._preview_nodeimage__img['ondragstart']=function() { return false; };
			this._preview_nodeimage.appendChild(this._preview_nodeimage__img);
			this._preview_nodeimage.ggId="Preview NodeImage";
			this._preview_nodeimage.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._preview_nodeimage.ggVisible=true;
			this._preview_nodeimage.className='ggskin ggskin_nodeimage ';
			this._preview_nodeimage.ggType='nodeimage';
			hs ='';
			hs+='height : 90px;';
			hs+='left : 5px;';
			hs+='position : absolute;';
			hs+='top : 5px;';
			hs+='visibility : inherit;';
			hs+='width : 140px;';
			hs+='pointer-events:auto;';
			this._preview_nodeimage.setAttribute('style',hs);
			this._preview_nodeimage.style[domTransform + 'Origin']='50% 50%';
			me._preview_nodeimage.ggIsActive=function() {
				return me.player.getCurrentNode()==this.ggElementNodeId();
			}
			me._preview_nodeimage.ggElementNodeId=function() {
				return this.ggNodeId;
			}
			this._preview_nodeimage.ggUpdatePosition=function (useTransition) {
			}
			this._hotspot_preview.appendChild(this._preview_nodeimage);
			this.__div.appendChild(this._hotspot_preview);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				if (me.elementMouseOver['_div']) {
				}
				me._hotspot_preview.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		}
	};
	this.addSkinHotspot=function(hotspot) {
		return new SkinHotspotClass(me,hotspot);
	}
	this.addSkin();
};