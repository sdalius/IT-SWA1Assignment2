export const request = (path,f) => {

    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    fetch(`http://localhost:8080/${path}`,)
        .then(res => {
            if (res.ok)
                return res
            else
                return Promise.reject(res.statusText)
        })
        .then(res => res.json())
        .then(measurement => f(measurement))
}