const token = localStorage.getItem("token");
const username = document.querySelector("#username");
const inputState = document.querySelector("#inputState");
const stateSkater = document.querySelectorAll(".check");

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

stateSkater.forEach((item) => {
    item.addEventListener("click", async (e) => {
        const state = e.target.checked;
        const id = e.target.id;

        const data = {
            id,
            state,
        };

        const response = await axios.put("/users/state", data);

        if (!response.data.ok)
            return alert("Ups... hubo un problema en actualizar el estado, intentelo más tarde");

        return alert(response.data.msg + " Skater: " + response.data.data.nombre);
    });
});

getAdmin();
