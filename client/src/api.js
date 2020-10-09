const API_URL = 'http://192.168.2.9:1137'


export const listLogEntry = async ()=>{

    const response = await fetch(`${API_URL}/api/logs`)
    return response.json()
}


export const createLogEntry = async (entry)=>{

    const response = await fetch(`${API_URL}/api/logs`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(entry)
        
    })
    return response.json()
}