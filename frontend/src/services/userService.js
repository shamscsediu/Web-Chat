import api from "./api";

const searchUsers = async (term) => {
    // const users = await api
    //     .get(`/user/search?term=${term}`)
    //     .then((response) => {
    //         return response.data.results;
    //     });
    try {
        const users = await api.get(`/user/search?term=${term}`)
        return users.data.results;
    } catch (err) {
        console.log(err)
    }
};

const UserService = {
    searchUsers
};

export default UserService;