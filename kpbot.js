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

function CleanRooms()
{
    if (typeof unsafeWindow.Global !== "undefined" && unsafeWindow.Global.rooms)
    {
         const rooms = unsafeWindow.Global.rooms;

        for (const room of rooms)
        {
            printTreatmentEndTime(room);

            const room_id = room.topleft;

            if (room.name == "Nemocniční lůžko")
                continue;

            if (!room.cleanup)
                continue;

            console.log(`Cleaning room ${room.name}`);
            cleanRoom(room_id, 1);
        }
    }
}
    

    window.onload = function()
    {
        CleanRooms();

        const room_patients = GetPacientsInRooms();

        for (const patient of room_patients)
        {
            const room_id_str = patient.room;
            const room_id = room_id_str.replace('r', '');

            const is_cured = patient.cured;
            const seat = patient.seat;
            const pacient_id = patient.id;

            if (is_cured)
                cashUpPatient(pacient_id, room_id, seat, 1);

            const diseases = patient.diseases;
            for (const disease of diseases)
            {
                //giveMed(room_id, 1, disease);
            }

        }
    };

})();