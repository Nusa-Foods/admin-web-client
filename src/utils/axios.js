import axios from "axios";

export const localRequest = axios.create({
    baseURL: "http://localhost:3000",
});

// export const localRequest = axios.create({
//     baseURL: "http://localhost:3000",
// });
