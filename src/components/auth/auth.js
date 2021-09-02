import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    personalEmail: yup.string().required().email(),
    role: yup.string().required(),
    profilePicture: yup.string().required().url(),
    _id: yup.string().required().length(24)
});

const save = (data) => {
    try {
        schema.isValid(data).then(() => {
            localStorage.setItem("user", JSON.stringify(data));
            console.log("user logged in");
        }).catch(error => {
            throw error;
        });
    } catch (error) {
        console.error(error);
    }
};

const user = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        console.error(error);
        return null;
    }
};

const remove = () => {
    try {
        localStorage.removeItem("user");
        console.log("user logged out");
    } catch (error) {
        console.error(error);
    }
};

export {
    save,
    user,
    remove
};