import AsyncStorage from '@react-native-async-storage/async-storage';

export class Person {
    public _id: number;
    public src: string;
    public _phone: string;

    constructor(id: number, src: string, phone: string) {
        this._id = id;
        this.src = src;
        this._phone = phone;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get phone(): string {
        return this._phone;
    }

    public set phone(value: string) {
        this._phone = value;
    }
}

export const persons: Person[] = [];

export const savePersonsToStorage = async () => {
    try {
        const jsonValue = JSON.stringify(persons);
        await AsyncStorage.setItem('persons', jsonValue);
    } catch (e) {
        console.error('Error saving persons to AsyncStorage:', e);
    }
};

export const loadPersonsFromStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('persons');
        if (jsonValue != null) {
            const loadedPersons = JSON.parse(jsonValue);
            persons.length = 0;
            loadedPersons.forEach((p: Person) => {
                persons.push(new Person(p._id, p.src, p._phone));
            });
        }
    } catch (e) {
        console.error('Error loading persons from AsyncStorage:', e);
    }
};
