import axios from 'axios';

const BACKEND_URL =
    'https://fb-login-demo-93174-default-rtdb.firebaseio.com/'

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}

export function postUserId(userId, data) {
    axios.post(BACKEND_URL + `/${userId}.json`, data).then((response) => console.log(">>>response::", response));
}
export function getUserId(userId) {
    return axios.get(BACKEND_URL + `/${userId}.json`).then((response) => {
        // Parse response data into an object
        const current = Object.values(response.data)[0];
        //   console.log("current", current);
        const key = (Object.keys(response.data)[0]);
        //     console.log(key + "as");
        return { key, current }
    })
};
export function putUserData(userId, currentKey, userData) {
    axios.put(BACKEND_URL + `/${userId}/${currentKey}.json`, userData).then(response => {
        console.log(">>>>> response put: ", response.data)
    });
}