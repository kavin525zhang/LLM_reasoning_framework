import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    // A number specifying the number of VUs to run concurrently.
    vus: 50,
    // A string specifying the total duration of the test run.
    duration: '30s',
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
    const url = 'http://127.0.0.1:8001/id';
    const payload = JSON.stringify({
        "query": [
            "Q: 你是谁"
        ]
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);
}
