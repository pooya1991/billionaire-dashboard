
export function getConfig(token,key,klass) {
    var data = []
    data.push('DataItems=TimeFrame')
    fetch('/api/DataItems/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '.concat(token),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }).then(r => r.json())
    .then(r => {
        klass.setState({[key]:r.data})
    }).catch(e => {console.log(e)})
}

export function getStrategies(token,key,klass) {
    fetch("/api/UserStrategies/", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '.concat(token)
        }
    }).then(r => r.json())
    .then(r => {
        klass.setState({[key]:r.data})
    }).catch(e => {console.log(e)})
}

export function getSymbols(token,key,klass) {
    fetch("/api/symbols", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '.concat(token)
        }
    }).then(r => r.json())
    .then(r => {
        klass.setState({[key]:r.data})
    }).catch()
}