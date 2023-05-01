import fs from "fs";
import {User} from "./users.interface";
import {usersFile} from "./users.constants";
import axios from "axios";

export function getUsersFromFile(): User[] {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data) as User[];
}

export function saveUsersToFile(users: User[]): void {
    fs.writeFileSync(usersFile, JSON.stringify(users));
}

export async function getGenderByName(name : string): Promise<string> {
    const genderUrl = `https://api.genderize.io/?name=${name}`;
    const genderResponse = await axios.get(genderUrl);
    const genderProbability = genderResponse.data.probability;
    return genderProbability > 0.95 ? genderResponse.data.gender : "undetermined";
}

export async function getRichData(gender:string): Promise<Object> {
    const richDataUrl = `https://randomuser.me/api/?gender=${gender === "female" ? "female" : "male"}`
    const richDataResponse = await axios.get(richDataUrl);
    return richDataResponse.data?.results[0]
}

export function saveUsers(users, user) {
    users[0][user.id] = user
    saveUsersToFile(users);
}
