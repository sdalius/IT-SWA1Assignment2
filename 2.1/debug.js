
Debug();
function Debug(){
    let tempobj1 = Temperature(new Date(2020,3,6,1,1,1,1), 'Aarhus', 'C', 50)
    let tempobj2 = Temperature(new Date(2020,2,1,1,1,1,1), 'Copenhagen', 'C', 40)
    let tempobj3 = Temperature(new Date(2020,2,17,1,1,1,1), 'Vejen', 'C', 15)
    let tempobj4 = Temperature(new Date(2020,2,24,1,1,1,1), 'Odense', 'F', 70)

    let precObj1 = Precipitation(new Date(2020,3,6,1,1,1,1), 'Aarhus', 'IN', '50', 'Rain')
    let precObj2 = Precipitation(new Date(2020,2,1,1,1,1,1), 'Copenhagen', 'MM', '40', 'Sleeze')
    let precObj3 = Precipitation(new Date(2020,2,17,1,1,1,1), 'Vejen', 'IN', '12', 'Snow')
    let precObj4 = Precipitation(new Date(2020,2,24,1,1,1,1), 'Odense', 'MM', '13', 'Rain')

    let tempPredObj1 = TemperaturePrediction(new Date(2020,3,6,1,1,1,1), 'Aarhus', 'C', 6, 12 )
    let tempPredObj2 = TemperaturePrediction(new Date(2020,3,6,1,1,1,1), 'Horsens', 'C', 9, 18 )
    let tempPredObj3 = TemperaturePrediction(new Date(2020,3,6,1,1,1,1), 'Vejle', 'C', 12, 20 )
    let tempPredObj4 = TemperaturePrediction(new Date(2020,3,6,1,1,1,1), 'Vojens', 'C', 14, 28 )

    let tempArray = new Array()
    tempArray.push(tempPredObj1, tempPredObj2, tempPredObj3, tempPredObj4)

    // let precArray = new Array()
    // precArray.push(precObj1, precObj2, precObj3, precObj4)
    
    let weatherHisObj = WeatherForecast(tempArray)
    let dateInt = DateInterval(new Date(2020,2,0,0,0,0,0), new Date(2020,4,1,1,1,1,1))
    console.log('FROM:', dateInt.getFrom())
    console.log('TO:', dateInt.getTo())
    //weatherHisObj = weatherHisObj.forPlace('Aarhus')
    //weatherHisObj = weatherHisObj.forType('Wind')
    //weatherHisObj = weatherHisObj.including(precArray)
    // weatherHisObj = weatherHisObj.convertToInternationalUnits()

    // weatherHisObj = weatherHisObj.convertToUSUnits()
    //     weatherHisObj.getData().forEach(element => {
    //     console.log(element.getValue(), element.getUnit())
    // });

    weatherHisObj.getPredictions().forEach(element => console.log(element.getValue()))
    console.log(weatherHisObj.getAverageMinValue())
    //console.log(weatherHisObj.getAverageMaxValue())
    // var last = weatherHisObj.lowestValue()
    // console.log(last)
}
