// ==UserScript==
// @name         Kapi Hospital Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automate Kapi Hospital actions
// @author       Your Name
// @match        https://s1.cz.kapihospital.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require      https://raw.githubusercontent.com/martinjanas/kpbot/refs/heads/main/utils.js
// ==/UserScript==

(function()
{
    'use strict';
    window.onload = function()
    {
        main();
    };
})();