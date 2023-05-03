import fs from "fs";
import {User} from "./users.interface";
import {usersFile} from "./users.constants";
import axios from "axios";

export function getUsersFromFile(): User[] {
    try {
        const data = fs.readFileSync(usersFile, "utf-8");
        return JSON.parse(data) as User[];
    } catch (err) {
        console.error('Error reading from file:', err);
        return null;
    }
}

export function saveUsersToFile(users: User[]): void {
    fs.writeFileSync(usersFile, JSON.stringify(users));
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users));
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

async function getDataFromExternalLink(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        throw new Error(`Error reading from external link: ${err.message}`);
    }
}
export async function getGenderByName(name : string): Promise<string> {
    const genderUrl = `https://api.genderize.io/?name=${name}`;
    try {
        const data = await getDataFromExternalLink(genderUrl);
        const genderProbability = data.probability;
        return genderProbability > 0.95 ? data.gender : "undetermined";
    } catch (err) {
        console.error(err);
    }
}

export async function getRichData(gender:string): Promise<Object> {
    const richDataUrl = `https://randomuser.me/api/?gender=${gender === "female" ? "female" : "male"}`
    try {
        const data = await getDataFromExternalLink(richDataUrl);
        return data?.results[0]
    } catch (err) {
        console.error(err);
    }
}

export function saveUsers(users, user) {
    users[0][user.id] = user
    saveUsersToFile(users);
}
