export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }

    get token() {
        const currentTimestamp = new Date();
        if (!this._tokenExpirationDate || currentTimestamp > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}