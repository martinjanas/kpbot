// ==UserScript==
// @name         Kapi Hospital Bot
// @namespace    http://tampermonkey.net/
// @version      0.1.8
// @description  Kapi Hospital experimental bot
// @author       Martin Janás
// @match        https://s1.cz.kapihospital.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require      https://raw.githubusercontent.com/martinjanas/kpbot/refs/heads/main/utils.js
// @updateURL    https://raw.githubusercontent.com/martinjanas/kpbot/refs/heads/main/kpbot.js
// @downloadURL  https://raw.githubusercontent.com/martinjanas/kpbot/refs/heads/main/kpbot.js
// ==/UserScript==

(function()
{
    'use strict';
    window.onload = function()
    {
        main();
    };
})();