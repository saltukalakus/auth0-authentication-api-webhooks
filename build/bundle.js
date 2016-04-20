module.exports=function(e){function n(o){if(t[o])return t[o].exports;var l=t[o]={exports:{},id:o,loaded:!1};return e[o].call(l.exports,l,l.exports,n),l.loaded=!0,l.exports}var t={};return n.m=e,n.c=t,n.p="/build/",n(0)}([function(e,n,t){(function(n){"use strict";function o(e,t){var o=e.webtaskContext,s=["AUTH0_DOMAIN","AUTH0_GLOBAL_CLIENT_ID","AUTH0_GLOBAL_CLIENT_SECRET","WEBHOOK_URL"],c=s.filter(function(e){return!o.data[e]});return c.length?t.status(400).send({message:"Missing settings: "+c.join(", ")}):void e.webtaskContext.storage.get(function(s,c){if(s&&404!==s.output.statusCode)return t.status(s.code).send(s);var a="undefined"==typeof c?null:c.checkpointId,f=new l({domain:o.data.AUTH0_DOMAIN,clientID:o.data.AUTH0_GLOBAL_CLIENT_ID,clientSecret:o.data.AUTH0_GLOBAL_CLIENT_SECRET});r.waterfall([function(e){console.log("STEP 1: Getting access token"),f.getAccessToken(function(n){return n&&console.log("Error authenticating:",n),e(n)})},function(e){console.log("STEP 2: Downloading logs");var t=function o(t){console.log("Downloading logs from: "+(t.checkpointId||"Start")+"."),t.logs=t.logs||[],f.getLogs({take:200,from:t.checkpointId},function(l,i){return l?e(l):i&&i.length?(i.forEach(function(e){return t.logs.push(e)}),t.checkpointId=t.logs[t.logs.length-1]._id,n(function(){return o(t)})):(console.log("Total logs: "+t.logs.length+"."),e(null,t))})};t({checkpointId:a})},function(e,n){var t=parseInt(o.data.LOG_LEVEL)||0,l=function(e){return u[e.type]?u[e.type].level>=t:!0},i=o.data.LOG_TYPES&&o.data.LOG_TYPES.split(",")||[],r=function(e){return i&&i.length?e.type&&i.indexOf(e.type)>=0:!0};e.logs=e.logs.filter(function(e){return"sapi"!==e.type&&"fapi"!==e.type}).filter(l).filter(r),console.log("Filtered logs on log level '"+t+"': "+e.logs.length+"."),o.data.LOG_TYPES&&console.log("Filtered logs on '"+o.data.LOG_TYPES+"': "+e.logs.length+"."),n(null,e)},function(e,n){if(!e.logs.length)return n(null,e);var t=o.data.WEBHOOK_URL,l=o.data.WEBHOOK_CONCURRENT_CALLS||5;console.log("Sending to '"+t+"' with "+l+" concurrent calls."),r.eachLimit(e.logs,l,function(e,n){i.post(t).send(e).set("Content-Type","application/json").end(function(e,t){return e?(console.log("Error sending request:",e),n(e)):t.ok?void n():(console.log("Unexpected response while sending request:",JSON.stringify(t.body)),n(new Error("Unexpected response from webhook.")))})},function(t){return t?n(t):(console.log("Upload complete."),n(null,e))})}],function(n,o){return n?(console.log("Job failed."),e.webtaskContext.storage.set({checkpointId:a},{force:1},function(e){return e?t.status(500).send(e):void t.status(500).send({error:n})})):(console.log("Job complete."),e.webtaskContext.storage.set({checkpointId:o.checkpointId,totalLogsProcessed:o.logs.length},{force:1},function(e){return e?t.status(500).send(e):void t.sendStatus(200)}))})})}var l=t(3),i=t(4),r=t(5),s=t(6),c=t(7),a=s(),u={s:{event:"Success Login",level:1},seacft:{event:"Success Exchange",level:1},feacft:{event:"Failed Exchange",level:3},f:{event:"Failed Login",level:3},w:{event:"Warnings During Login",level:2},du:{event:"Deleted User",level:1},fu:{event:"Failed Login (invalid email/username)",level:3},fp:{event:"Failed Login (wrong password)",level:3},fc:{event:"Failed by Connector",level:3},fco:{event:"Failed by CORS",level:3},con:{event:"Connector Online",level:1},coff:{event:"Connector Offline",level:3},fcpro:{event:"Failed Connector Provisioning",level:4},ss:{event:"Success Signup",level:1},fs:{event:"Failed Signup",level:3},cs:{event:"Code Sent",level:0},cls:{event:"Code/Link Sent",level:0},sv:{event:"Success Verification Email",level:0},fv:{event:"Failed Verification Email",level:0},scp:{event:"Success Change Password",level:1},fcp:{event:"Failed Change Password",level:3},sce:{event:"Success Change Email",level:1},fce:{event:"Failed Change Email",level:3},scu:{event:"Success Change Username",level:1},fcu:{event:"Failed Change Username",level:3},scpn:{event:"Success Change Phone Number",level:1},fcpn:{event:"Failed Change Phone Number",level:3},svr:{event:"Success Verification Email Request",level:0},fvr:{event:"Failed Verification Email Request",level:3},scpr:{event:"Success Change Password Request",level:0},fcpr:{event:"Failed Change Password Request",level:3},fn:{event:"Failed Sending Notification",level:3},sapi:{event:"API Operation"},fapi:{event:"Failed API Operation"},limit_wc:{event:"Blocked Account",level:4},limit_ui:{event:"Too Many Calls to /userinfo",level:4},api_limit:{event:"Rate Limit On API",level:4},sdu:{event:"Successful User Deletion",level:1},fdu:{event:"Failed User Deletion",level:3}};a.get("/",o),a.post("/",o),e.exports=c.fromExpress(a)}).call(n,t(1).setImmediate)},function(e,n,t){(function(e,o){function l(e,n){this._id=e,this._clearFn=n}var i=t(2).nextTick,r=Function.prototype.apply,s=Array.prototype.slice,c={},a=0;n.setTimeout=function(){return new l(r.call(setTimeout,window,arguments),clearTimeout)},n.setInterval=function(){return new l(r.call(setInterval,window,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(e){e.close()},l.prototype.unref=l.prototype.ref=function(){},l.prototype.close=function(){this._clearFn.call(window,this._id)},n.enroll=function(e,n){clearTimeout(e._idleTimeoutId),e._idleTimeout=n},n.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},n._unrefActive=n.active=function(e){clearTimeout(e._idleTimeoutId);var n=e._idleTimeout;n>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},n))},n.setImmediate="function"==typeof e?e:function(e){var t=a++,o=arguments.length<2?!1:s.call(arguments,1);return c[t]=!0,i(function(){c[t]&&(o?e.apply(null,o):e.call(null),n.clearImmediate(t))}),t},n.clearImmediate="function"==typeof o?o:function(e){delete c[e]}}).call(n,t(1).setImmediate,t(1).clearImmediate)},function(e,n){function t(){a=!1,r.length?c=r.concat(c):u=-1,c.length&&o()}function o(){if(!a){var e=setTimeout(t);a=!0;for(var n=c.length;n;){for(r=c,c=[];++u<n;)r&&r[u].run();u=-1,n=c.length}r=null,a=!1,clearTimeout(e)}}function l(e,n){this.fun=e,this.array=n}function i(){}var r,s=e.exports={},c=[],a=!1,u=-1;s.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];c.push(new l(e,n)),1!==c.length||a||setTimeout(o,0)},l.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=i,s.addListener=i,s.once=i,s.off=i,s.removeListener=i,s.removeAllListeners=i,s.emit=i,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,n){e.exports=require("auth0@0.8.2")},function(e,n){e.exports=require("superagent")},function(e,n){e.exports=require("async")},function(e,n){e.exports=require("express")},function(e,n,t){function o(e){return function(n,t,o){var l=r(t.x_wt.jtn);return t.originalUrl=t.url,t.url=t.url.replace(l,"/"),t.webtaskContext=s(n),e(t,o)}}function l(e){var n;return e.ext("onRequest",function(e,t){var o=r(e.x_wt.jtn);e.setUrl(e.url.replace(o,"/")),e.webtaskContext=n}),function(t,o,l){var i=e._dispatch();n=s(t),i(o,l)}}function i(e){return function(n,t,o){var l=r(t.x_wt.jtn);return t.originalUrl=t.url,t.url=t.url.replace(l,"/"),t.webtaskContext=s(n),e.emit("request",t,o)}}function r(e){var n="^/api/run/[^/]+/",t="(?:[^/?#]*/?)?";return new RegExp(n+(e?t:""))}function s(e){function n(e,n,o){var l=t(8);"function"==typeof n&&(o=n,n={}),o(l.preconditionFailed("Storage is not available in this context"))}function o(n,o,l){var i=t(8),r=t(9);"function"==typeof o&&(l=o,o={}),r({uri:e.secrets.EXT_STORAGE_URL,method:"GET",headers:o.headers||{},qs:{path:n},json:!0},function(e,n,t){return e?l(i.wrap(e,502)):404===n.statusCode&&Object.hasOwnProperty.call(o,"defaultValue")?l(null,o.defaultValue):n.statusCode>=400?l(i.create(n.statusCode,t&&t.message)):void l(null,t)})}function l(e,n,o,l){var i=t(8);"function"==typeof o&&(l=o,o={}),l(i.preconditionFailed("Storage is not available in this context"))}function i(n,o,l,i){var r=t(8),s=t(9);"function"==typeof l&&(i=l,l={}),s({uri:e.secrets.EXT_STORAGE_URL,method:"PUT",headers:l.headers||{},qs:{path:n},body:o},function(e,n,t){return e?i(r.wrap(e,502)):n.statusCode>=400?i(r.create(n.statusCode,t&&t.message)):void i(null)})}return e.read=e.secrets.EXT_STORAGE_URL?o:n,e.write=e.secrets.EXT_STORAGE_URL?i:l,e}n.fromConnect=n.fromExpress=o,n.fromHapi=l,n.fromServer=n.fromRestify=i},function(e,n){e.exports=require("boom")},function(e,n){e.exports=require("request")}]);