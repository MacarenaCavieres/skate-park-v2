const formRegister = document.querySelector("#formRegister");
const formLogin = document.querySelector("#formLogin");
// import { verifyToken } from "./data.js";

if (formRegister) {
    formRegister.addEventListener("submit", async () => {
        const email = formRegister.email.value;
        const nombre = formRegister.nombre.value;
        const password = formRegister.password.value;
        const rePassword = formRegister.rePassword.value;
        const years_experience = formRegister.years_experience.value;
        const specialty = formRegister.specialty.value;
        const photo = formRegister.photo.files[0];

        if (
            !password.trim() ||
            !rePassword.trim() ||
            !email.trim() ||
            !nombre.trim() ||
            !years_experience.trim() ||
            !specialty.trim() ||
            !photo
        )
            return alert("Debe completar todos los datos");

        if (password !== rePassword) return alert("Contraseñas no coinciden");
    });
}

if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = formLogin.email.value;
        const password = formLogin.password.value;

        try {
            const { data } = await axios.post("/check", {
                email,
                password,
            });
            if (data) {
                localStorage.setItem("token", data.token);
                window.location.href = "/data";
            }
        } catch (error) {
            console.log(error);
        }
    });
}

const token = localStorage.getItem("token");

// if (!token) {
//     return (window.location.href = "/login");
// }

const getProfile = async () => {
    try {
        const { data } = await axios.get("/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

getProfile();
