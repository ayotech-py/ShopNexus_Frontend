const getUser = async () => {
    const token = window.localStorage.getItem('accessToken')
    const username = window.localStorage.getItem('username')
    const response = await fetch('https://shop-nexus-fpb869sps-ayotech-py.vercel.app/get-user-details/', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'user': username,
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();

    } else {
        // Handle error response, e.g., display an error message
        //const { error } = await response.json();

        // Handle the error response
    }
}

export default getUser;