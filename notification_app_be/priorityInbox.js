const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYXBhdGxha2F2eWFzcmlAZ21haWwuY29tIiwiZXhwIjoxNzgwNjM3MjA0LCJpYXQiOjE3ODA2MzYzMDQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiODMwNWE0Ni00MzA4LTQwYzQtYTZjYi0xNjNkNTM5YzgyM2YiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJiYXBhdGxhIGthdnlhIHNyaSIsInN1YiI6ImJmYzc0MzA3LTAzOWEtNDIyOS1iNWE1LWJkMjY4NTE5MDg4MSJ9LCJlbWFpbCI6ImJhcGF0bGFrYXZ5YXNyaUBnbWFpbC5jb20iLCJuYW1lIjoiYmFwYXRsYSBrYXZ5YSBzcmkiLCJyb2xsTm8iOiIyM2JxMWEwNTIwIiwiYWNjZXNzQ29kZSI6IlFRZEVZeSIsImNsaWVudElEIjoiYmZjNzQzMDctMDM5YS00MjI5LWI1YTUtYmQyNjg1MTkwODgxIiwiY2xpZW50U2VjcmV0IjoicmhDc3dZWVBwWlRVS1puZiJ9.CWGTmYDmka2Xpiqhd0rasiBxQZtczu15YQX9uzgv8ns";
const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
};

async function getPriorityNotifications() {
    try {
        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        const notifications = response.data.notifications;

        notifications.sort((a, b) => {

            const weightDifference =
                weights[b.Type] - weights[a.Type];

            if (weightDifference !== 0) {
                return weightDifference;
            }

            return (
                new Date(b.Timestamp) -
                new Date(a.Timestamp)
            );
        });

        const topTen = notifications.slice(0, 10);

        console.log("\nTOP 10 PRIORITY NOTIFICATIONS\n");

        topTen.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.Type} | ${item.Message} | ${item.Timestamp}`
            );
        });

    } catch (error) {
       console.log("Status:", error.response?.status);
console.log("Response:", error.response?.data);
    }
}

getPriorityNotifications();