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
    if (typeof unsafeWindow.Global !== "undefined" && unsafeWindow.Global.patients)
    {
        const patients = unsafeWindow.Global.patients;
        const room_patients = [];

        for (const patient of patients)
        {
            if (patient.room == 0)
                continue;

            room_patients.push(patient);
        }
        return room_patients;
    }
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