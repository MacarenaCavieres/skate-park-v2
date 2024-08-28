const token = localStorage.getItem("token");
const username = document.querySelector("#username");

if (!token) {
    window.location.href = "/login";
}

const getProfile = async (token) => {
    try {
        const { data } = await axios.get("/users/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
        username.textContent = data.data.nombre;
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
    }
};

getProfile(token);
