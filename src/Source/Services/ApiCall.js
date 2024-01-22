
async function GetRequest(url) {
    let data = await fetch(url)
    data = await data.json()
    // console.log("GetRequest", data)
    return data
}


async function PostRequest(url, data={}) {
    let token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        console.log('token now found ', token)
    }
    try {
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        // console.log("Success:", result);
        return result
    } catch (error) {
        console.error("Error:", error);
    }
}


function GetDataFromToken(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    let result = JSON.parse(jsonPayload);
    // console.log("auth", result);


    return result

}



async function PatchRequest(url, data={}) {
    let token = JSON.parse(localStorage.getItem('token'))
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(url, requestOptions)
    const jsonData = await response.json()
    return jsonData
}
async function DeleteRequest(url) {
    let token = JSON.parse(localStorage.getItem('token'));
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response, 'llllllll')

        const result = await response.json();
        // console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        // Handle any errors that occur during the request
    }
}

export { GetRequest, PostRequest, GetDataFromToken, PatchRequest, DeleteRequest };
