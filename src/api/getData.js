const getProjects = async function() {
    const response = await fetch("./data.json")
    if (response.status == 200) {
        let data = await response.json()
        // console.log(data.projects)
        return data.projects
    } else {
        new Error(response.statusText)
    }
}

const getModels = async function() {
    const response = await fetch("./models.json")
    if (response.status == 200) {
        let data = await response.json()
        // console.log(data.projects)
        return data
    } else {
        new Error(response.statusText)
    }
} 


export { getProjects, getModels}
