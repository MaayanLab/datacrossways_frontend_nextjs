export default (req, res) => {

    fetch("http://localhost:5000/api/getcsrf", {
        method: "get"
    })
    .then((result) => { return result.json(); })
    .then((data) => {
        fetch("http://localhost:3000/api/setcookie", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: data["csrf"] }),
        }).then(res => {
            console.log("cookie set");
            //Router.push('/admin')
        });
    });
};