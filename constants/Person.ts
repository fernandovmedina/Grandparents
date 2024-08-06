export class Person {
    private _id: number;
    public src: string;
    private _phone: string;

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
