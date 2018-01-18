//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
!function(e){
// IE doesn't support Array#indexOf, so have a simple replacement
function n(e,n){for(var t=e.length;t--;)if(e[t]===n)return t;return-1}
// for comparing mods before unassignment
function t(e,n){if(e.length!=n.length)return!1;for(var t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}function o(e){for(a in d)d[a]=e[k[a]]}
// handle keydown event
function r(e){var t,r,f,c,u,a;// right command on webkit, command on Gecko
if(t=e.keyCode,-1==n(y,t)&&y.push(t),
// if a modifier key, set the key.<modifierkeyname> property to true and return
93!=t&&224!=t||(t=91),t in d){d[t]=!0;
// 'assignKey' from inside this closure is exported to window.key
for(f in h)h[f]==t&&(i[f]=!0)}else
// see if we need to ignore the keypress (filter() can can be overridden)
// by default ignore key presses if a select, textarea, or input is focused
if(o(e),i.filter.call(this,e)&&t in s)
// for each potential shortcut
for(a=l(),c=0;c<s[t].length;c++)
// see if it's in the current scope
if((r=s[t][c]).scope==a||"all"==r.scope){
// check if modifiers match if any
u=r.mods.length>0;for(f in d)(!d[f]&&n(r.mods,+f)>-1||d[f]&&-1==n(r.mods,+f))&&(u=!1);
// call the handler and stop the event if neccessary
(0!=r.mods.length||d[16]||d[18]||d[17]||d[91])&&!u||!1===r.method(e,r)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}
// parse and assign shortcut
function i(e,n,t){var o,r;o=f(e),void 0===t&&(t=n,n="all");
// for each shortcut
for(var i=0;i<o.length;i++)
// set modifier keys if any
r=[],(e=o[i].split("+")).length>1&&(r=c(e),e=[e[e.length-1]]),
// convert to keycode and...
e=e[0],
// ...store handler
(e=v(e))in s||(s[e]=[]),s[e].push({shortcut:o[i],scope:n,method:t,key:o[i],mods:r})}function l(){return p||"all"}
// abstract key logic for assign and unassign
function f(e){var n;return e=e.replace(/\s/g,""),""==(n=e.split(","))[n.length-1]&&(n[n.length-2]+=","),n}
// abstract mods logic for assign and unassign
function c(e){for(var n=e.slice(0,e.length-1),t=0;t<n.length;t++)n[t]=h[n[t]];return n}
// cross-browser events
function u(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent&&e.attachEvent("on"+n,function(){t(window.event)})}var a,s={},d={16:!1,18:!1,17:!1,91:!1},p="all",
// modifier keys
h={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},
// special keys
g={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},v=function(e){return g[e]||e.toUpperCase().charCodeAt(0)},y=[];for(a=1;a<20;a++)g["f"+a]=111+a;var k={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};
// initialize key.<modifier> to false
for(a in h)i[a]=!1;
// set the handlers globally on document
u(document,"keydown",function(e){r(e)}),// Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
u(document,"keyup",
// unset modifier keys on keyup
function(e){var t,o=e.keyCode,r=n(y,o);if(
// remove key from _downKeys
r>=0&&y.splice(r,1),93!=o&&224!=o||(o=91),o in d){d[o]=!1;for(t in h)h[t]==o&&(i[t]=!1)}}),
// reset modifiers to false whenever the window is (re)focused.
u(window,"focus",function(){for(a in d)d[a]=!1;for(a in h)i[a]=!1});
// store previously defined key
var m=e.key;
// set window.key and window.key.set/get/deleteScope, and the default filter
e.key=i,e.key.setScope=
// set current scope (default 'all')
function(e){p=e||"all"},e.key.getScope=l,e.key.deleteScope=
// delete all handlers for a given scope
function(e){var n,t,o;for(n in s)for(t=s[n],o=0;o<t.length;)t[o].scope===e?t.splice(o,1):o++},e.key.filter=function(e){var n=(e.target||e.srcElement).tagName;
// ignore keypressed in any elements that support keyboard data input
return!("INPUT"==n||"SELECT"==n||"TEXTAREA"==n)},e.key.isPressed=
// Returns true if the key with code 'keyCode' is currently down
// Converts strings into key codes.
function(e){return"string"==typeof e&&(e=v(e)),-1!=n(y,e)},e.key.getPressedKeyCodes=function(){return y.slice(0)},e.key.noConflict=
// restore previously defined key and return reference to our key object
function(){var n=e.key;return e.key=m,n},e.key.unbind=
// unbind all handlers for given key in current scope
function(e,n){var o,r,i,u,a,d=[];for(o=f(e),u=0;u<o.length;u++){if((r=o[u].split("+")).length>1&&(d=c(r),e=r[r.length-1]),e=v(e),void 0===n&&(n=l()),!s[e])return;for(i=0;i<s[e].length;i++)
// only clear handlers if correct scope and mods match
(a=s[e][i]).scope===n&&t(a.mods,d)&&(s[e][i]={})}},"undefined"!=typeof module&&(module.exports=i)}(this);