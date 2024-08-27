const token = localStorage.getItem("token");
console.log(token);

if (!token) {
    window.location.href = "/login";
}

const getProfile = async () => {
    try {
        const { data } = await axios.get("/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(data);
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
    }
};

getProfile();
