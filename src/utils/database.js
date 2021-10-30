const userAPI = "user-api"
const donationAPI = "donation-api"
const donatorAPI = "donator-api"
const campaignAPI = "campaign-api"
const tagAPI = "tag-api"

async function fetchFromServer(apiName){
    const res = await fetch(`http://127.0.0.1:8000/api/${apiName}/`)
    const data = await res.json()
    // console.log(data)
    return data
}

async function fetchById(apiName,id){
    const res = await fetch(`http://127.0.0.1:8000/api/${apiName}/${id}/`)
    return res.json()
}

// USERS
export async function fetchUsers(){
    return fetchFromServer(userAPI)
}

export async function fetchUser(id){
    return fetchById(userAPI,id)
}

// CAMPAIGNS
export async function fetchCampaigns(){
    return fetchFromServer(campaignAPI)
}

export async function fetchCampaign(id){
    return fetchById(campaignAPI,id)
}

// DONATORS
export async function fetchDonators(){
    return fetchFromServer(donatorAPI)
}

export async function fetchDonator(id){
    return fetchById(donatorAPI,id)
}

// DONATIONS
export async function fetchDonationStatus(){
    return fetchFromServer("donation-api/status")
}

export async function fetchDonations(){
    return fetchFromServer(donationAPI)
}

export async function fetchDonation(id){
    return fetchById(donationAPI,id)
}

//tags
export async function fetchTags() {
    return fetchFromServer(tagAPI)
}

export async function fetchTag(id) {
    return fetchById(tagAPI,id)
}