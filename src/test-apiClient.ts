import { apiClient, type createUserRequestType } from "./apiClient";

export const getUserWithAddressCity = async (
    userId: string
) => {
    return await (await apiClient.api.user[':userId'].$post({
        param: {
            userId: userId
        },
        json: {
            columns: {
                address: {
                    city: true
                }
            }
        }
    })).json()
}

export const updateUserWithAddressCity = async (
    userId: string,
    addressCity: string
) => {
    return await (await apiClient.api.user[':userId'].$patch({
        param: {
            userId: userId
        },
        json: {
            address: {
                city: addressCity
            }
        }
    })).json()
}

export const createUser = async (
    json: createUserRequestType
) => {
    return await (await apiClient.api.user.$post({
        json
    })).json()
}

export const deleteUser = async (
    userId: string
) => {
    return await (await apiClient.api.user[':userId'].$delete({
        param: {
            userId: userId
        }
    })).json()
}