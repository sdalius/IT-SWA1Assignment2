import {request} from "./baseFunction.js";

export function service() {

    const getLatestMeasurementData = (city) => {
        const path = `data/${city}`
        request(path,(response) => {

            let temp = ["temperature","precipitation","cloud coverage","wind speed"].
            map(type => response.filter(data => data.type === type)
                .sort((a,b) => new Date(b.time) - new Date(a.time))
                .slice(0,1))


            let tempVal = []
            temp.forEach((item,index)=>{tempVal.push(JSON.stringify(item[0]))})


            document.getElementById(`latestMeasurement`).textContent += `${city}:${tempVal}`
        })
    }

    const getMinOrMaxTemp = (city,minOrMax) =>{
        const path = `data/${city}`
        request(path,(response)=>{
            let temp = response.filter(data => data.type == "temperature")
                .sort((a,b) => new Date(b.time) - new Date(a.time))

            let d = new Date(temp[0].time);
            d.setDate(d.getDate()-5)


            temp = temp
                .filter(a => new Date(a.time) >= d)
                .reduce((accumulator,currVal)=> minOrMax == "min" ? Math.min(accumulator,currVal.value) : Math.max(accumulator,currVal.value),[])

            document.getElementById(`${minOrMax}Temp5days`).textContent += `${city}:${temp}`
        })
    }

    const getTotalPrecipitation = (city) =>{
        const path = `data/${city}`

        request(path,(response)=>{
            let temp = response.filter(data => data.type == "precipitation")
                .sort((a,b) => new Date(b.time) - new Date(a.time))

            let d = new Date(temp[0].time);
            d.setDate(d.getDate()-5)


            temp = temp
                .filter(a => new Date(a.time) >= d)
                .reduce((accumulator,currVal)=> accumulator + currVal.value,0)

            document.getElementById(`precLast5days`).textContent += `${city}:${temp}`
        })
    }

    const getWindSpeed = (city) =>{
        const path = `data/${city}`

        request(path,(response)=>{
            let temp = response.filter(data => data.type == "wind speed")
                .sort((a,b) => new Date(b.time) - new Date(a.time))

            let d = new Date(temp[0].time);
            d.setDate(d.getDate()-5)

            temp
                .filter(a => new Date(a.time) >= d)
            let length = temp.length
            let averageVal = temp.reduce((a, b) => (a + b.value),0) / length

            document.getElementById(`averageWindSpeed`).textContent += `${city}:${averageVal}`
        })
    }

    const getHourlyPredictionForNext24Hours = (city) => {
        const path = `forecast/${city}`
        request(path,(response)=>{
            let temp = response
                .sort((a,b) => new Date(b.time) - new Date(a.time))
            let d = new Date(temp[0].time);
            d.setDate(d.getDate()+1)

            temp
                .filter(a => new Date(a.time) <= d)
            let tempVal = temp.map((item) => JSON.stringify(item))

            document.getElementById(`predictions`).textContent += `${city}:${tempVal}`
        })

    }



    return{
        getLatestMeasurementData,
        getMinOrMaxTemp,
        getTotalPrecipitation,
        getWindSpeed,
        getHourlyPredictionForNext24Hours
    }
}








