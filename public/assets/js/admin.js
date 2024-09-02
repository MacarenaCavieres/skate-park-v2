const token = localStorage.getItem("token");
const username = document.querySelector("#username");

if (!token) {
    alert("Inicie sesión");
    window.location.href = "/admin/login";
}

logout.addEventListener("click", () => {
    window.location.href = "/admin/login";
});

const getAdmin = async () => {
    try {
        const { data } = await axios.get("/admin/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        username.textContent = data.data.username;
    } catch (error) {
        console.error(error);
    }
};

// const getSkaters = async()=>{
//     try {

//         const {data} = await axios.get("/admin")
//         conso

//     } catch (error) {
//         console.error(error);
//     }
// }

getAdmin();
