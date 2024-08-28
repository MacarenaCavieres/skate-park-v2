const token = localStorage.getItem("token");
console.log(token);

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
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
    }
};

getProfile(token);
