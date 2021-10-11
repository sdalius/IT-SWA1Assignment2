export default window  => {
const latest_measurements_body = document.getElementById('latestMeasurementdata')
const five_Days_Min_Temp_Table = document.getElementById('fivedaysTempBody')
const five_Days_Max_Temp_Table = document.getElementById('fivedayMaxTempBody')
const five_Days_Total_Precipitation = document.getElementById('fivedayTotalPrecipitationBody')
const five_Days_Avg_Wind_Speed = document.getElementById('avgWindSpeedBody')
const prediction_for_24hours = document.getElementById('predictionfor24hoursBody')


const getLatestMeasurementData = () => {
        clearAllOftheTables()
        const request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:8080/data/Horsens')
        request.send()
        request.onerror = () => {displayError(request.responseText)}
        request.onload = () => {
        if (request.status != 200) {
            displayError(request.responseText)
        }
        const measurementData = JSON.parse(request.responseText)
        const getLatestMeasurementDate = () => measurementData.reduce((oldest, measurementData) => ( Date.parse(measurementData.time) > Date.parse(oldest.time)) ? oldest = measurementData : oldest)
        const latestMeaurements = () => measurementData.filter(measurementData => Date.parse(measurementData.time) >= Date.parse(getLatestMeasurementDate().time))
        addMeasurements(latestMeaurements())
        minTempFiveDays(measurementData, getLatestMeasurementDate().time)
        maxTempFiveDays(measurementData, getLatestMeasurementDate().time)
        totalPrecipitaion(measurementData, getLatestMeasurementDate().time)
        avgWindSpeed(measurementData, getLatestMeasurementDate().time)
        predictions24hours('Horsens')

        request.open('GET', 'http://localhost:8080/data/Aarhus')
        request.send()
        request.onerror = () => {displayError(request.responseText)}
        if (request.status != 200) {
            displayError(request.responseText)
        }
        request.onload = () => {
        const measurementData = JSON.parse(request.responseText)
        const getLatestMeasurementDate = () => measurementData.reduce((oldest, measurementData) => ( Date.parse(measurementData.time) > Date.parse(oldest.time)) ? oldest = measurementData : oldest)
        const latestMeaurements = () => measurementData.filter(measurementData => Date.parse(measurementData.time) >= Date.parse(getLatestMeasurementDate().time))
        addMeasurements(latestMeaurements())
        minTempFiveDays(measurementData, getLatestMeasurementDate().time)
        maxTempFiveDays(measurementData, getLatestMeasurementDate().time)
        totalPrecipitaion(measurementData, getLatestMeasurementDate().time)
        avgWindSpeed(measurementData, getLatestMeasurementDate().time)
        predictions24hours('Aarhus')

        request.open('GET', 'http://localhost:8080/data/Copenhagen')
        request.send()
        request.onerror = () => {displayError(request.responseText)}
        if (request.status != 200) {
            displayError(request.responseText)
        }
        request.onload = () => {
        const measurementData = JSON.parse(request.responseText)
        const getLatestMeasurementDate = () => measurementData.reduce((oldest, measurementData) => ( Date.parse(measurementData.time) > Date.parse(oldest.time)) ? oldest = measurementData : oldest)
        const latestMeaurements = () => measurementData.filter(measurementData => Date.parse(measurementData.time) >= Date.parse(getLatestMeasurementDate().time))
        addMeasurements(latestMeaurements())
        minTempFiveDays(measurementData, getLatestMeasurementDate().time)
        maxTempFiveDays(measurementData, getLatestMeasurementDate().time)
        totalPrecipitaion(measurementData, getLatestMeasurementDate().time)
        avgWindSpeed(measurementData, getLatestMeasurementDate().time)
        predictions24hours('Copenhagen')
        }
    }
}
}

const clearAllOftheTables = () =>{
    while(latest_measurements_body.firstChild) latest_measurements_body.removeChild(latest_measurements_body.firstChild)
    while(five_Days_Min_Temp_Table.firstChild) five_Days_Min_Temp_Table.removeChild(five_Days_Min_Temp_Table.firstChild)
    while(five_Days_Total_Precipitation.firstChild) five_Days_Total_Precipitation.removeChild(five_Days_Total_Precipitation.firstChild)
    while(five_Days_Max_Temp_Table.firstChild) five_Days_Max_Temp_Table.removeChild(five_Days_Max_Temp_Table.firstChild)
    while(five_Days_Avg_Wind_Speed.firstChild) five_Days_Avg_Wind_Speed.removeChild(five_Days_Avg_Wind_Speed.firstChild)
    while(prediction_for_24hours.firstChild) prediction_for_24hours.removeChild(prediction_for_24hours.firstChild)
}
const addMeasurements = (p) => {
    const tr = latest_measurements_body.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(p[0].place))

    for(let i = 0; i < p.length; i++)
    {
        if(p[i].type === 'temperature')
        {
            tr.insertCell().appendChild(document.createTextNode(p[i].value + " " + p[i].unit))
        }
        else if (p[i].type === 'precipitation')
        {
            tr.insertCell().appendChild(document.createTextNode(p[i].value + " " + p[i].unit + " " + p[i].precipitation_type))
        }
        else if (p[i].type === 'wind speed'){
            tr.insertCell().appendChild(document.createTextNode(p[i].value + " " + p[i].unit + " " + p[i].direction))
        }
        else if (p[i].type === 'cloud coverage')
        {
            tr.insertCell().appendChild(document.createTextNode(p[i].value + " " + p[i].unit))
        }
    }
}

const minTempFiveDays = (measurementData, date) => {
    // Getting current date
    var currDate = new Date(date)
    var fiveDaysBefore = new Date(currDate)
    // Setting fiveDaysBefore 5 days before current date
    fiveDaysBefore.setDate( fiveDaysBefore.getDate() - 5)
    // Filtering data so that it would be in between current date and 5 days before current date, and then getting the minimum temperature out of those 5 days
    const getLatestMeasurementDate = () => measurementData.filter(data => Date.parse(data.time) <= Date.parse(currDate) && Date.parse(data.time) >= Date.parse(fiveDaysBefore) && data.type === 'temperature').reduce((minimumTemperature, currValue) => ( currValue.value < minimumTemperature.value) ? minimumTemperature = currValue : minimumTemperature)
    // Adding it to the Minimum temperature table
    const tr = five_Days_Min_Temp_Table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(getLatestMeasurementDate().place))
    tr.insertCell().appendChild(document.createTextNode(getLatestMeasurementDate().value + " " + getLatestMeasurementDate().unit))
}

const maxTempFiveDays = (measurementData, date) => {
    // Getting current date
    var currDate = new Date(date)
    var fiveDaysBefore = new Date(currDate)
    // Setting fiveDaysBefore 5 days before current date
    fiveDaysBefore.setDate( fiveDaysBefore.getDate() - 5)
    // Filtering data so that it would be in between current date and 5 days before current date, and then getting the maximum temperature out of those 5 days
    const getLatestMeasurementDate = () => measurementData.filter(data => Date.parse(data.time) <= Date.parse(currDate) && Date.parse(data.time) >= Date.parse(fiveDaysBefore) && data.type === 'temperature').reduce((minimumTemperature, currValue) => ( currValue.value > minimumTemperature.value) ? minimumTemperature = currValue : minimumTemperature)
    // Adding it to the Maximum temperature table
    const tr = five_Days_Max_Temp_Table.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(getLatestMeasurementDate().place))
    tr.insertCell().appendChild(document.createTextNode(getLatestMeasurementDate().value + " " + getLatestMeasurementDate().unit))
}

const totalPrecipitaion = (measurementData, date) => {
    // Getting current date
    var currDate = new Date(date)
    var fiveDaysBefore = new Date(currDate)
    // Setting fiveDaysBefore 5 days before current date
    fiveDaysBefore.setDate( fiveDaysBefore.getDate() - 5)
    // Filtering data so that it would be in between current date and 5 days before current date
    const getLatestMeasurementDate = () => measurementData.filter(data => Date.parse(data.time) <= Date.parse(currDate) && Date.parse(data.time) >= Date.parse(fiveDaysBefore) && data.type === 'precipitation')
    // Summing all of the preticipation out of those 5 days
    const sumOfPrecipitation = () => getLatestMeasurementDate().map(data => data.value).reduce((sum, currValue) => currValue + sum, 0)
    // Adding it to the Total precipitation table
    const tr = five_Days_Total_Precipitation.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(getLatestMeasurementDate()[0].place))
    tr.insertCell().appendChild(document.createTextNode(Number(sumOfPrecipitation()).toFixed(2) + " " + getLatestMeasurementDate()[0].unit))
}

const avgWindSpeed = (measurementData, date) => {
    // Getting current date
    var currDate = new Date(date)
    var fiveDaysBefore = new Date(currDate)
    // Setting fiveDaysBefore 5 days before current date
    fiveDaysBefore.setDate( fiveDaysBefore.getDate() - 5)
    // Filtering data so that it would be in between current date and 5 days before current date
    const getLatestMeasurementDate = () => measurementData.filter(data => Date.parse(data.time) <= Date.parse(currDate) && Date.parse(data.time) >= Date.parse(fiveDaysBefore) && data.type === 'wind speed')
    // Getting average wind speed out of those 5 days
    const avgOfWindSpeed = () => getLatestMeasurementDate().map(data => data.value).reduce((sum, currValue) => sum + currValue, 0) / getLatestMeasurementDate().length
    // Adding it to the Average wind speed table
    const tr = five_Days_Avg_Wind_Speed.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(getLatestMeasurementDate()[0].place))
    tr.insertCell().appendChild(document.createTextNode(Number(avgOfWindSpeed()).toFixed(2) + " " + getLatestMeasurementDate()[0].unit))
}

const predictions24hours = (place) => {
    var forTracking
    var precipitations = ''
    const currDate = new Date()
    const next24hours = new Date(currDate)
    const request = new XMLHttpRequest()
    next24hours.setHours(next24hours.getHours() + 24)
    request.open('GET', 'http://localhost:8080/forecast/' + place)
    request.send()
    request.onerror = () => {displayError(request.responseText)}
    request.onload = () => {
    if (request.status != 200) {
        displayError(request.responseText)
    }
    const measurementData = JSON.parse(request.responseText)
    const getLatestPredictions = () => measurementData.filter(data => Date.parse(data.time) > Date.parse(currDate) && Date.parse(data.time) < Date.parse(next24hours))
    let tr = prediction_for_24hours.appendChild(document.createElement('tr'))
    tr.insertCell().appendChild(document.createTextNode(getLatestPredictions()[0].place))
    tr.insertCell().appendChild(document.createTextNode(new Date(getLatestPredictions()[0].time).toLocaleString('da-DK')))
    console.log()
        for(let i = 0; i < getLatestPredictions().length; i++)
        {   
            if(getLatestPredictions()[i].type === 'temperature')
            {        
                forTracking = getLatestPredictions()[i]

                if ( forTracking.type === getLatestPredictions()[i].type && i > 0)
                {
                    tr = prediction_for_24hours.appendChild(document.createElement('tr'))
                    tr.insertCell().appendChild(document.createTextNode(getLatestPredictions()[i].place))
                    tr.insertCell().appendChild(document.createTextNode(new Date(getLatestPredictions()[i].time).toLocaleString('da-DK')))
                }
                tr.insertCell().appendChild(document.createTextNode('From: ' + getLatestPredictions()[i].from + getLatestPredictions()[i].unit + " " + 'To: ' + getLatestPredictions()[i].to + getLatestPredictions()[i].unit))
            }
            else if (getLatestPredictions()[i].type === 'precipitation')
            {
                tr.insertCell().appendChild(document.createTextNode('From: ' + getLatestPredictions()[i].from + getLatestPredictions()[i].unit + " " + 'To: ' + getLatestPredictions()[i].to + getLatestPredictions()[i].unit))
                getLatestPredictions()[i].precipitation_types.forEach(element => precipitations += element + ", ");
                if (precipitations.length > 0){
                    tr.insertCell().appendChild(document.createTextNode(precipitations.slice(0, -2)))
                    precipitations = ''
                }
                else{
                    tr.insertCell().appendChild(document.createTextNode('none'))
                    precipitations = ''
                }
            }
            else if (getLatestPredictions()[i].type === 'wind speed'){
                tr.insertCell().appendChild(document.createTextNode('From: ' + getLatestPredictions()[i].from + getLatestPredictions()[i].unit + " " + 'To: ' + getLatestPredictions()[i].to + getLatestPredictions()[i].unit))
                getLatestPredictions()[i].directions.forEach(element => precipitations += element + ", ");
                tr.insertCell().appendChild(document.createTextNode(precipitations.slice(0, -2)))
                precipitations = ''
            }
            else if (getLatestPredictions()[i].type === 'cloud coverage')
            {
                tr.insertCell().appendChild(document.createTextNode('From: ' + getLatestPredictions()[i].from + getLatestPredictions()[i].unit + " " + 'To: ' + getLatestPredictions()[i].to + getLatestPredictions()[i].unit))
            }
        }
    }
}

function displayError(e) {
    console.log(e)
}
return { getLatestMeasurementData }
}