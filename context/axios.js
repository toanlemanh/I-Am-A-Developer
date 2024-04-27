import axios from 'axios'

const BACKEND_URL =
    'https://fb-login-demo-93174-default-rtdb.firebaseio.com/'

export async function storeExpense(data, dataname) {
    await axios.post(BACKEND_URL + `/${dataname}.json`, data);
}

export async function fetchUserData(uid) {
    const response = await axios.get(BACKEND_URL + `/users/${uid}.json`)
    return response
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json')

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}

export function postUserId( userId, data) {
     axios.post(BACKEND_URL + `/${userId}.json`, data).then((response) => console.log(">>>response::",response));
}
export function getUserId( userId ) {
    return axios.get(BACKEND_URL + `/${userId}.json`).then((response) => {
        // Parse response data into an object
        const current = Object.values(response.data)[0];
        console.log("current", current);
        const key = (Object.keys(response.data)[0]);
        console.log(key + "as");
        return {key, current}
      })};
