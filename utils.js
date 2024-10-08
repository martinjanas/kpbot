function sendRequest(url, method, data, callback)
{
    GM_xmlhttpRequest(
    {
        method: method,
        url: url,
        data: data ? JSON.stringify(data) : null,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        onload: function(response)
        {
            if (response.status === 200)
            {
                if (callback)
                {
                    callback(JSON.parse(response.responseText));
                }
            }
        }
    });
}

function GetPacientsInRooms()
{
    const patients = unsafeWindow.Global.patients;
    const room_patients = [];
    for (const patient of patients)
    {
        if (patient.room === 0)
            continue;

        room_patients.push(patient);
    }
    return room_patients;
}

function cleanRoom(room, level)
{
    const url = `https://s1.cz.kapihospital.com/service.room.php?mode=cleaner&position=${room}&level=${level}`;

    sendRequest(url, 'POST', null, function(data)
    {
        const msg = data.message;
        console.log(`Message: ${msg}`);
    });
}

function printTreatmentEndTime(room)
{
    if (!(room.patientid > 0))
        return;

    if (room.name == "Nemocniční lůžko")
        return;

    const currentJobEnds = room.currentjobends;
    if (currentJobEnds > 0)
    {
        const endTime = new Date(currentJobEnds * 1000);

        const formattedTime = endTime.toLocaleString();

        console.log(`Patient ID: ${room.patientid} - Treatment ends at: ${formattedTime}`);
    }
    else console.log(`Patient ID: ${room.patientid} - No ongoing treatment.`);
}

function giveMed(room, level, med_id)
{
    const url = `https://s1.cz.kapihospital.com/service.meds.php?room=${room}&lvl=${level}&med=${med_id}`;

    sendRequest(url, 'POST', null, function(data)
    {
        const msg = data.message;
        console.log(`Message: ${msg}`);
    });
}

function cashUpPatient(patientId, roomId, seat, level)
{
    const url = `https://s1.cz.kapihospital.com/service.patient.php?lvl=${level}&room=${roomId}&patientid=${patientId}&seat=${seat}&mode=cashup`;

    sendRequest(url, 'POST', null, function(responseData)
    {
        const message = responseData.message;
        console.log(`Cashing up patient ${patientId} in room ${roomId}, seat ${seat}: ${message}`);
    });
}

function getMenuUpdate()
{
    const url = "https://s1.cz.kapihospital.com/menu-update.php";

    sendRequest(url, 'GET', null, function(user_data)
    {
        const cash = user_data.cash;
        console.log(`Cash: ${cash}`);
    });
}

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

function MovePacientToAnotherRoom()
{
    const patients = GetPacientsInRooms();

    for (const patient of patients)
    {
        if (patient.room != 164)
            continue;

        const len = patient.diseases.length;
        console.log(`diseases length: ${len}`);
    }
}

function main()
{
    MovePacientToAnotherRoom();

    //CleanRooms();

    //const room_patients = GetPacientsInRooms();

    // for (const patient of room_patients)
    // {
    //     const room_id_str = patient.room;
    //     const room_id = room_id_str.replace('r', '');

    //     const is_cured = patient.cured;
    //     const seat = patient.seat;
    //     const pacient_id = patient.id;

    //     if (is_cured)
    //         cashUpPatient(pacient_id, room_id, seat, 1);

    //     const diseases = patient.diseases;
    //     for (const disease of diseases)
    //     {
    //         //giveMed(room_id, 1, disease);
    //     }

    // }
}
