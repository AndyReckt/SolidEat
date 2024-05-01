import { Map } from "./_schemas";

export let userToDirections: Map<string> = {};

export function setUserDirections(user: string, directions: string) {
    userToDirections[user] = directions;
    setTimeout(() => {
        if (userToDirections[user] == directions) {
            delete userToDirections[user];
        }
    }, 5 * 60 * 1000); //5 minutes
}

export function getUserDirections(user: string) {
    return userToDirections[user];
}
