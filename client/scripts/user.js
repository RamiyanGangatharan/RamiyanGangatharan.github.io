"use strict";
var core;
(function (core) {
    class User {
        constructor(firstName = "", lastName = "", address = "", phoneNumber = "", emailAddress = "", username = "", password = "") {
            this._firstName = firstName;
            this._lastName = lastName;
            this._address = address;
            this._phoneNumber = phoneNumber;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }
        _firstName;
        get firstName() {
            return this._firstName;
        }
        set firstName(value) {
            this._firstName = value;
        }
        _lastName;
        get lastName() {
            return this._lastName;
        }
        set lastName(value) {
            this._lastName = value;
        }
        _address;
        get address() {
            return this._address;
        }
        set address(value) {
            this._address = value;
        }
        _phoneNumber;
        get phoneNumber() {
            return this._phoneNumber;
        }
        set phoneNumber(value) {
            this._phoneNumber = value;
        }
        _emailAddress;
        get emailAddress() {
            return this._emailAddress;
        }
        set emailAddress(value) {
            this._emailAddress = value;
        }
        _username;
        get username() {
            return this._username;
        }
        set username(value) {
            this._username = value;
        }
        _password;
        get password() {
            return this._password;
        }
        set password(value) {
            this._password = value;
        }
        toString() {
            return `First Name: ${this._firstName}\nLast Name: ${this._lastName}\n
             Email Address: ${this._emailAddress}\nUsername: ${this._username}`;
        }
        toJSON(FirstName, LastName, Address, PhoneNumber, EmailAddress, Username, Password) {
            return {
                FirstName: this._firstName,
                LastName: this._lastName,
                Address: this._address,
                PhoneNumber: this._phoneNumber,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            };
        }
        fromJSON(data) {
            this._firstName = data.firstName;
            this._lastName = data.lastName;
            this._address = data.address;
            this._phoneNumber = data.phoneNumber;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data.password;
        }
        serialize() {
            if (this._firstName !== "" && this._lastName !== "" && this._address !== "" && this._phoneNumber !== ""
                && this._emailAddress !== "" && this._username !== "" && this._password !== "") {
                return `${this._firstName}, ${this._lastName}, ${this._address}, ${this._phoneNumber}, ${this._emailAddress}, ${this._username}, ${this._password}`;
            }
            console.error("One or more of the user properties are missing or invalid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(", ");
            this._firstName = propertyArray[0];
            this._lastName = propertyArray[1];
            this._address = propertyArray[2];
            this._phoneNumber = propertyArray[3];
            this._emailAddress = propertyArray[4];
            this._username = propertyArray[5];
            this._password = propertyArray[6];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map