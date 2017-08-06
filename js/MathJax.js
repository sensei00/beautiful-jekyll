/*
 *  
 *
 *  Copyright (c) 2009-2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

  var replaceScript = function (script, src) {
    //
    //  Make redirected script
    //
    var newScript = document.createElement('script');
    newScript.src = newMathJax + src.replace(/.*?(\?|$)/, '$1');
    //
    //  Move onload and onerror handlers to new script
    //
    newScript.onload = script.onload; 
    newScript.onerror = script.onerror;
    script.onload = script.onerror = null;
    //
    //  Move any content (old-style configuration scripts)
    //
    while (script.firstChild) newScript.appendChild(script.firstChild);
    //
    //  Copy script id
    //
    if (script.id != null) newScript.id = script.id;
    //
    //  Replace original script with new one
    //
    script.parentNode.replaceChild(newScript, script);
    //
    //  Issue a console warning
    //
    console.warn('WARNING: cdn.mathjax.org has been retired. Check https://www.mathjax.org/cdn-shutting-down/ for migration tips.')
  }

  if (document.currentScript) {
    var script = document.currentScript;
    replaceScript(script, script.src);
  } else {
    //
    // Look for current script by searching for one with the right source
    //
    var n = oldMathJax.length;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      var src = (script.src || '').replace(/.*?:\/\//,'');
      if (src.substr(0, n) === oldMathJax) {
        replaceScript(script, src);
        break;
      }
    }
  }
})();
