cordova.define("com.reallyenglish.cordova.plugin.browser-media-recorder.MediaRecorder", function(require, exports, module) { navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
window.URL = window.URL || window.webkitURL;

function bind(func, context) {
  return function() {
    func.apply(context, arguments);
  };
}
// Feature detection.
var getUserMediaCheck = typeof(navigator.getUserMedia) === 'function';
var mediaRecorderCheck = typeof(window.MediaRecorder) === 'function';
var webAudioCheck = typeof(window.AudioContext) === 'function';

var Recorder = function(options) {
  this.initialize.call(this, options);
};

Recorder.getInstance = function(options) {
  // Use the MediaRecorder API. Currently only works in firefox.
  if (getUserMediaCheck && webAudioCheck && mediaRecorderCheck) {
    recorderClass = RecorderAPI;
  // Use HTML5 features (Web Audio API).
  } else if (getUserMediaCheck && webAudioCheck && !mediaRecorderCheck) {
    recorderClass = Recorder;
    // Use Flash.
  } else {
    recorderClass = RecorderFlash;
  }
  return new recorderClass(options);
};

Recorder.prototype.initialize = function(cfg) {
};

Recorder.prototype.record = function record() {
};

Recorder.prototype.clear = function clear() {
};

Recorder.prototype.play = function play() {
};

Recorder.prototype.stop = function stop() {
  this.recording = false;
};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Recorder;
}
var RecorderAPI = function() {
this.initialize.call(this);
};

RecorderAPI.prototype.constructor = Recorder;

RecorderAPI.prototype.initialize = function(cfg) {
  this.data = [];
};

RecorderAPI.prototype.clear = function() {
  this.data = [];
};

RecorderAPI.prototype.onError = function(cfg) {
};

RecorderAPI.prototype.onDataAvailabe = function(e) {
  this.data.push(e.data);
};

RecorderAPI.prototype.startRecording = function(stream) {
  this.data = [];
  this.mediaRecorder = new MediaRecorder(stream);
  this.mediaRecorder.ondataavailable = bind(this.onDataAvailabe, this);
  this.mediaRecorder.onerror = function(e){
    console.log('Error: ', e);
  };
  // parameter is number of milliseconds of data to return in a single Blob
  this.mediaRecorder.start(2000);
};

RecorderAPI.prototype.record = function() {
  navigator.getUserMedia({audio: true}, bind(this.startRecording, this), this.onError);
};

RecorderAPI.prototype.play = function() {
  this.audio = document.createElement('audio');
  var blob = new Blob(this.data, { type: "text/plain" });
  this.audio.src = window.URL.createObjectURL(blob);
  this.audio.play();
};

RecorderAPI.prototype.stop = function() {
  this.mediaRecorder.stop();
};
if(swfobject==undefined){
  /*	SWFObject v2.2 <http://code.google.com/p/swfobject/> is released under the MIT License <http://www.opensource.org/licenses/mit-license.php */
  var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+encodeURI(O.location).toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
}

var RecorderFlash = function(option) {
  this.initialize.call(this, option);
};

RecorderFlash.prototype.constructor = Recorder;

RecorderFlash.prototype.initialize = function(cfg) {
  //global handler for Flash
  window['recorder'] = this;
  this._events = [];
  this._initialized = false;
  this.swfSrc = 'recorder.swf';
  if (cfg.swfSrc) {
    this.swfSrc = cfg.swfSrc;
  }

  this._setupFlashContainer();
  this._loadFlash();
  this.bind('initialized', this._onInitialized);
  this.bind('microphoneMuted', this._showFlash);
  this.bind('record', this._hideFlash);
};

RecorderFlash.prototype._setupFlashContainer = function() {
  this.flashContainer = document.createElement("div");
  this.flashContainer.setAttribute("id", "recorderFlashContainer");
  this.flashContainer.setAttribute("style", "position: fixed; left: -9999px; top: -9999px; width: 230px; height: 140px; margin-left: 10px; border-top: 6px solid rgba(128, 128, 128, 0.6); border-bottom: 6px solid rgba(128, 128, 128, 0.6); border-radius: 5px 5px; padding-bottom: 1px; padding-right: 1px;");
  document.body.appendChild(this.flashContainer);
};

RecorderFlash.prototype._checkForFlashBlock = function() {
  window.setTimeout(bind(function(){
    if(!this._initialized){
      this._flashBlockCatched = true;
      this._showFlash();
    }
  }, this), 500);
};

RecorderFlash.prototype._onInitialized = function(e) {
  this._initialized = true;
  if(this._flashBlockCatched){
    this._hideFlash();
  }
};

RecorderFlash.prototype._showFlashRequiredDialog = function() {
  this.flashContainer.innerHTML = "<p>Adobe Flash Player 10.1 or newer is required to use this feature.</p><p><a href='http://get.adobe.com/flashplayer' target='_top'>Get it on Adobe.com.</a></p>";
  this.flashContainer.style.color = "white";
  this.flashContainer.style.backgroundColor = "#777";
  this.flashContainer.style.textAlign = "center";
  this._showFlash();
};

RecorderFlash.prototype._loadFlash = function() {
  var flashElement = document.createElement("div");
  flashElement.setAttribute("id", "recorderFlashObject");
  this.flashContainer.appendChild(flashElement);
  var fv = { playerInstance: 'window.recorder' };
  swfobject.embedSWF(this.swfSrc, "recorderFlashObject", "231", "141", "10.1.0", undefined, fv, {allowscriptaccess: "always"}, undefined, bind(this._flashLoaded, this));
};

RecorderFlash.prototype._flashLoaded = function(e) {
  if(e.success){
    this.swfObject = e.ref;
    this._checkForFlashBlock();
  }else{
    this._showFlashRequiredDialog();
  }
};

RecorderFlash.prototype._showFlash = function() {
  this.flashContainer.style.left   = ((window.innerWidth  || document.body.offsetWidth)  / 2) - 115 + "px";
  this.flashContainer.style.top    = ((window.innerHeight || document.body.offsetHeight) / 2) - 70  + "px";
};

RecorderFlash.prototype._hideFlash = function() {
  this.flashContainer.style.left = "-9999px";
  this.flashContainer.style.top  = "-9999px";
};

RecorderFlash.prototype.record = function() {
  this.flashInterface().recordStart();
};

RecorderFlash.prototype.play = function() {
  this.flashInterface().playback();
};

RecorderFlash.prototype.stop = function() {
  return this.flashInterface().recordStop();
};

RecorderFlash.prototype.flashInterface = function() {
  if(!this.swfObject){
    return null;
  }else if(this.swfObject.recordStart){
    return this.swfObject;
  }else if(this.swfObject.children[3].recordStart){
    return this.swfObject.children[3];
  }
};

RecorderFlash.prototype.bind = function(eventName, fn){
  if(!this._events[eventName]){ this._events[eventName] = [] }
  this._events[eventName].push(fn);
};

RecorderFlash.prototype.triggerEvent = function(eventName, arg0, arg1){
  if (!this._events[eventName]) {
    return;
  }
  for(var i = 0, len = this._events[eventName].length; i < len; i++){
    if(this._events[eventName][i]){
      this._events[eventName][i].apply(this, [arg0, arg1]);
    }
  }
};
var RecorderHtml5 = function(options) {
  this.initialize.call(this, options);
};

RecorderHtml5.prototype.constructor = Recorder;

RecorderHtml5.prototype.initialize = function(cfg) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  if (!AudioContext) {
    console.log('WebAudio not supported.');
  }
  if (!navigator.getUserMedia) {
    console.log('Navigator.getUserMedia not supported.');
  }

  this.audio_context = new AudioContext;
  this.recLength = 0;
  this.recBuffersL = [];
  this.recBuffersR = [];
  var config = cfg || {};
  this.bufferLen = config.bufferLen || 4096;
  this.sampleRate = this.audio_context.sampleRate;
  navigator.getUserMedia({audio: true}, bind(this.prepare, this), function(e) {
    console.log('No live audio input: ' + e);
  });
};

RecorderHtml5.prototype.prepare = function prepare(stream) {
  this.input = this.audio_context.createMediaStreamSource(stream);
  this.context = this.input.context;
  this.node = (this.context.createScriptProcessor ||
             this.context.createJavaScriptNode).call(this.context,
                                                     this.bufferLen, 2, 2);
  this.node.onaudioprocess = bind(this.onAudioProcess, this);
  this.input.connect(this.node);
  this.node.connect(this.context.destination);
};

RecorderHtml5.prototype.onAudioProcess = function onAudioProcess(e) {
  if (!this.recording) return;
  var buffer = [new Float32Array(e.inputBuffer.getChannelData(0)), new Float32Array(e.inputBuffer.getChannelData(1))];
  this.recBuffersL.push(buffer[0]);
  this.recBuffersR.push(buffer[1]);
  this.recLength += buffer[0].length;
};

RecorderHtml5.prototype.record = function record() {
  this.clear();
  this.recording = true;
};

RecorderHtml5.prototype.clear = function clear() {
  this.recLength = 0;
  this.recBuffersL = [];
  this.recBuffersR = [];
};

RecorderHtml5.prototype.getBuffer = function getBuffer() {
  var buffers = [];
  buffers.push( this.mergeBuffers(this.recBuffersL, this.recLength) );
  buffers.push( this.mergeBuffers(this.recBuffersR, this.recLength) );
  return buffers;
};

RecorderHtml5.prototype.mergeBuffers = function mergeBuffers(recBuffers, recLength){
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < recBuffers.length; i++){
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }
  return result;
};

RecorderHtml5.prototype.play = function play() {
  var buffers = this.getBuffer();
  var newBuffer = this.audio_context.createBuffer(2, buffers[0].length, this.audio_context.sampleRate);
  this.outputSource = this.audio_context.createBufferSource();
  newBuffer.getChannelData(0).set(buffers[0]);
  newBuffer.getChannelData(1).set(buffers[1]);
  this.outputSource.buffer = newBuffer;
  this.outputSource.connect(this.audio_context.destination);
  this.outputSource.start(0);
};

RecorderHtml5.prototype.stop = function stop() {
  this.recording = false;
};

});
