// -- Start of raw weather data -- \\

function Events(state){
    function getTime(){
        return state.time
    }
    function getPlace(){
        return state.place
    }
    return {getPlace, getTime}
}

function DataType(state){
    function getType(){
        return state.type
    }
    function getUnit(){
        return state.unit
    }
    return {getType, getUnit}
}

function WeatherData(state) {
    const EventsNature = Events(state)
    const DataTypeNature = DataType(state)
    function getValue() { return Number(state.value) }
    return { ...EventsNature, ...DataTypeNature, getValue }
}

function Temperature(time, place, unit, value){
    const state = {time, place, type: 'Temperature', unit, value}
    const WeatherDataNature = WeatherData(state)
    function convertToF(){
        if (state.unit === 'C' && state.type === 'Temperature') {
            state.value = Number((state.value * 1.8) + 32).toFixed(2)
            state.unit = 'F'
        }
        return Temperature(state.time, state.place, state.unit, state.value)
    }
    function convertToC(){
        if(state.unit === 'F' && state.type === 'Temperature'){
            state.value = Number(((state.value - 32) * (5/9))).toFixed(2)
            state.unit = 'C'
        }
        return Temperature(state.time, state.place, state.unit, state.value)
    }
    return {...WeatherDataNature, convertToF, convertToC}
}
 
function Precipitation(time, place, unit, value, precipitationType)
{
    const state = {time, place, type: 'Precipitation', unit, value, precipitationType}
    const WeatherDataNature = WeatherData(state)
    function getPrecipitationType(){
        return state.precipitationType
    }
    function convertToInches(){
        if (state.unit === 'MM' && state.type === 'Precipitation'){
            state.value = Number((state.value) / 2.54).toFixed(2)
            state.unit = 'IN'
        }
        return Precipitation(state.time, state.place, state.unit, state.value, state.precipitationType)
    }
    function convertToMM(){
        if (state.unit === 'IN' && state.type === 'Precipitation'){
            state.value = Number((state.value) * 2.54).toFixed(2)
            state.unit = 'MM'
        }
        return Precipitation(state.time, state.place, state.unit, state.value, state.precipitationType)
    }
    return {...WeatherDataNature, getPrecipitationType, convertToInches, convertToMM}
}


function Wind(time, place, unit, value, direction)
{
    const state = {time, place, type: 'Wind', unit, value, direction}
    const WeatherDataNature = WeatherData(state)
    function getDirection(){
        return state.direction
    }
    function convertToMPH()
    {
        if (state.unit === 'MS' && state.type === 'Wind') {
            state.value = Number((state.value) * 2.237).toFixed(2)
            state.unit = 'MPH'
        }
        return Wind(state.time, state.place, state.unit, state.value, state.direction)
    }
    function convertToMS()
    {
        if (state.unit == 'MPH' && state.type === 'Wind'){
            state.value = Number((state.value) / 2.237).toFixed(2)
            state.unit = 'MS'
        }
        return Wind(state.time, state.place, state.unit, state.value, state.direction)
    }
    return {...WeatherDataNature, getDirection, convertToMPH, convertToMS}
}

function CloudCoverage(time, place, value) {
    const State = {time, place, type: 'Cloud Coverage', unit:'Percentage', value}
    const WeatherDataNature = WeatherData(State)
    return {...WeatherDataNature}
}
// -- End of raw weather data -- \\

function DateInterval(from, to)
{
    const dates = {from, to}

    function getFrom(){
        return dates.from
    }
    function getTo(){
        return dates.to
    }
    function contains(d){
        if ( d instanceof Date )
            return true
        return false
    }
    return {getFrom, getTo, contains}
}

// -- Start of weather prediction data -- \\
function WeatherPrediction(state) {
    const WeatherDataNature = WeatherData(state)
    function getMin() {
        if (state.minValue){
            return state.minValue 
        }
        console.log("Prediction minimum number was not declared.")
    }
    function getMax() { 
        if (state.maxValue){
            return state.maxValue
        }
        console.log("Prediction maximum number was not declared.")
    }
    return { ...WeatherDataNature, getMin, getMax }
}

function TemperaturePrediction(time, place, unit, minValue, maxValue){
    const state = {time, place, type: 'Temperature', unit, value: Number(Math.random() * (maxValue - minValue) + minValue).toFixed(2), minValue, maxValue}
    const WeatherPredictionNature = WeatherPrediction(state)
    function convertToF(){
        if (state.unit === 'C' && state.type === 'Temperature') {
            state.value = Number((state.value * 1.8) + 32).toFixed(2)
            state.unit = 'F'
            return TemperaturePrediction(state.time, state.place, state.unit, state.minValue, state.maxValue)
        } else {
            console.log('You can not convert this value to Fahrenheit')
        }
    }
    function convertToC(){
        if(state.unit === 'F' && state.type === 'Temperature'){
            state.value = Number((state.value - 32) * (5/9)).toFixed(2)
            state.unit = 'C'
            return TemperaturePrediction(state.time, state.place, state.unit, state.minValue, state.maxValue)
        } else {
            console.log('You can not convert this value to Celsius')
        }
    }
    return {...WeatherPredictionNature, convertToF, convertToC}
}

function PrecipitationPrediction(time, place, unit, minValue, maxValue)
{
    const state = {time, place, type: 'Precipitation', unit, value: Number(Math.random() * (maxValue - minValue) + minValue).toFixed(2), minValue, maxValue}
    const WeatherPredictionNature = WeatherPrediction(state)
    function getPrecipitationTypes(){
        return ["Drizzle", "Rain", "Sleet", "Snow", "Graupel", "Hail"]
    }
    function matches(data){
        if (state.type === data.type && state.unit === data.unit && state.value === data.value) {
            return true
        }
        return false
    }
    function convertToInches(){
        if (state.unit === 'MM' && state.type === 'Precipitation'){
            state.value = Number((state.value) / 2.54).toFixed(2)
            state.unit = 'IN'
        }
        return PrecipitationPrediction(state.time, state.place, state.unit, state.minValue, state.maxValue)
    }
    function convertToMM(){
        if (state.unit === 'IN' && state.type === 'Precipitation'){
            state.value = Number((state.value) * 2.54).toFixed(2)
            state.unit = 'MM'
        }
        return PrecipitationPrediction(state.time, state.place, state.unit, state.minValue, state.maxValue)
    }
    return {...WeatherPredictionNature, getPrecipitationTypes, convertToInches, convertToMM, matches}
}

function WindPrediction(time, place, unit, minValue, maxValue)
{
    const state = {time, place, type: 'Wind', unit, value: Number(Math.random() * (maxValue - minValue) + minValue).toFixed(2), minValue, maxValue}
    const WeatherPredictionNature = WeatherPrediction(state)
    function getExpectedDirections(){
        return ['North', 'East', 'South', 'West']
    }
    function convertToMPH()
    {
        if (state.unit === 'MS' && state.type === 'Wind') {
            state.value = Number((state.value) * 2.237).toFixed(2)
            state.unit = 'MPH'
        }
        return WindPrediction(state.time, state.place, state.unit, state.minValue, state.maxValue)
    }
    function convertToMS()
    {
        if (state.unit == 'MPH' && state.type === 'Wind'){
            state.value = Number((state.value) / 2.237).toFixed(2)
            state.unit = 'MS'
        }
        return WindPrediction(state.time, state.place, state.unit, state.minValue, state.maxValue)
    }
    return {...WeatherPredictionNature, getExpectedDirections, convertToMPH, convertToMS}
}

function CloudCoveragePrediction(time, place, minValue, maxValue) {
    const State = {time, place, type: 'Cloud Coverage', unit: 'Percentage', value: Number(Math.random() * (maxValue - minValue) + minValue).toFixed(2), minValue, maxValue}
    const WeatherPredictionNature = WeatherPrediction(State)
    return {...WeatherPredictionNature}
}
// -- End of raw weather data -- \\

function WeatherHistory(data)
{
    data.filter(function (e) {
        try{
            if (e.getType() === 'Temperature' || 'Precipitation' || 'Cloud Coverage' || 'Wind')
            {
                return e
            }
        }
        catch{
            console.log('Object was not right, removing it from the array')
        }
    })

    function forPlace(place){
        let temp =data.filter(value => value.getPlace() === place)
        return WeatherHistory(temp)
    }
    function forType(type) {
        let temp =data.filter(value => value.getType() === type)
        return WeatherHistory(temp)
    }
    function forPeriod(period) {
        let temp =data.filter(value => value.getTime() >= period.getFrom() && value.getTime() <= period.getTo())
        return WeatherHistory(temp)
    }
    function including(setData){
        setData.filter(function (e) {
            try{
                if (e.getType() === 'Temperature' || 'Precipitation' || 'Cloud Coverage' || 'Wind')
                {
                    return e
                }
            }
            catch{
                console.log('Object was not right, removing it from the array')
            }
        })
        let result = data.concat(setData)
        return WeatherHistory(result)
    }

    function convertToUSUnits(){
        for (let i = 0; i < data.length; i++)
        {
            if ( data[i].getType() === 'Temperature' )
            {
                data[i].convertToF()
            }
            else if ( data[i].getType() === 'Precipitation' )
            {
                data[i].convertToInches()
            }
            else if ( data[i].getType() === 'Wind')
            {
                data[i].convertToMPH()
            }
        }
        return WeatherHistory(data)
    }
    function convertToInternationalUnits(){
        for (let i = 0; i < data.length; i++)
        {
            if ( data[i].getType() === 'Temperature')
            {
                data[i].convertToC()
            }
            else if (data[i].getType() === 'Precipitation')
            {
                data[i].convertToMM()
            }
            else if (data[i].getType() === 'Wind')
            {
                data[i].convertToMS()
            }
        }
        return WeatherHistory(data)
    }
    function lowestValue(){
        if (data.length > 0)
        {
            let previousObject
            for (let i = 0; i < data.length; i++)
            {
                if (i == 0)
                {
                    previousObject = data[i]
                }
                else{
                    previousObject = data[i - 1]

                    if (previousObject.getType() === data[i].getType())
                    {
                        continue;
                    }
                    else{
                        console.log('types are different. Returning.')
                        return undefined
                    }
                }
            }
        }
        const lowestNumber = data.map(element => element.getValue()).reduce((oldest, currValue) => ( currValue < oldest) ? oldest = currValue : oldest)
        return lowestNumber
     }

     function getData() {
        return [...data]
    }
    return {forPlace, forType, forPeriod, including, convertToUSUnits, convertToInternationalUnits, lowestValue, getData}
}


function WeatherForecast(data){

    data.filter(function (e) {
        try{
            if (e.getType() === 'Temperature' || 'Precipitation' || 'Cloud Coverage' || 'Wind')
            {
                return e
            }
        }
        catch{
            console.log('Object was not right, removing it from the array')
        }
    })

    function forPlace(place){
        let temp = data.filter(value => value.getPlace() === place)
        return WeatherForecast(temp)
    }

    function forType(type) {
        let temp = data.filter(value => value.getType() === type)

        return WeatherForecast(temp)
    }

    function forPeriod(period) {
        let temp = data.filter(value => value.getTime() >= period.getFrom() && value.getTime() <= period.getTo())
        return WeatherForecast(temp)
    }

    function including(setData){
        setData.filter(function (e) {
            try{
                if (e.getType() === 'Temperature' || 'Precipitation' || 'Cloud Coverage' || 'Wind')
                {
                    return e
                }
            }
            catch{
                console.log('Object was not right, removing it from the array')
            }
        })
        let result = data.concat(setData)
        return WeatherHistory(result)
    }

    function convertToUSUnits(){
        for (let i = 0; i < data.length; i++)
        {
            if ( data[i].getType() === 'Temperature' )
            {
                data[i].convertToF()
            }
            else if ( data[i].getType() === 'Precipitation' )
            {
                data[i].convertToInches()
            }
            else if ( data[i].getType() === 'Wind')
            {
                data[i].convertToMPH()
            }
        }
        return WeatherHistory(data)
    }

    function convertToInternationalUnits(){
        for (let i = 0; i < data.length; i++)
        {
            if ( data[i].getType() === 'Temperature')
            {
                data[i].convertToC()
            }
            else if (data[i].getType() === 'Precipitation')
            {
                data[i].convertToMM()
            }
            else if (data[i].getType() === 'Wind')
            {
                data[i].convertToMS()
            }
        }
        return WeatherHistory(data)
    }

    function getAverageMinValue(){
        let avg = data.reduce((a, b) => (a + b.getMin()),0) / data.length
        return avg
    }

    function getAverageMaxValue() {
        let avg = data.reduce((a, b) => (a + b.getMax()),0) / data.length
        return avg
    }

    function getPredictions() {
        return [...data]
    }
    return {forPlace,forType,forPeriod,including,getAverageMinValue,getAverageMaxValue,convertToUSUnits,convertToInternationalUnits,getPredictions }
}
