// post request that uploads file to the server
async function sendFile(url, formData) {
    let options = {
        method: "POST",
        body: formData,
    };

    if (url === "/message") {
        options.headers = {
            "Content-Type": "application/json",
        };
        options.body = JSON.stringify(formData)
    }
   

    try {
        return fetch(url, options).then((response) => response);
    } catch (err) {
        console.log(err);
    }
}

export { sendFile };
