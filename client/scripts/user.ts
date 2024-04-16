/**
 * @Author Joy Tejada
 * @Date 2024-02-24
 * Description: For Login and Registration
 */

"use strict";

namespace core {
    export class User {
        constructor(firstName = "", lastName = "", address = "", phoneNumber = "",
                    emailAddress = "", username = "", password = "") {
            this._firstName = firstName;
            this._lastName = lastName;
            this._address = address;
            this._phoneNumber = phoneNumber;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        // Constructor
        private _firstName: string;

        public get firstName(): string {
            return this._firstName;
        }

        public set firstName(value: string) {
            this._firstName = value;
        }

        private _lastName: string;

        public get lastName(): string {
            return this._lastName;
        }

        public set lastName(value: string) {
            this._lastName = value;
        }

        private _address: string;

        public get address(): string {
            return this._address;
        }

        public set address(value: string) {
            this._address = value;
        }

        private _phoneNumber: string;

        public get phoneNumber(): string {
            return this._phoneNumber;
        }

        public set phoneNumber(value: string) {
            this._phoneNumber = value;
        }

        private _emailAddress: string;

        public get emailAddress(): string {
            return this._emailAddress;
        }

        public set emailAddress(value: string) {
            this._emailAddress = value;
        }

        private _username: string;

        public get username(): string {
            return this._username;
        }

        public set username(value: string) {
            this._username = value;
        }

        private _password: string;

        public get password(): string {
            return this._password;
        }

        public set password(value: string) {
            this._password = value;
        }

        // Overridden methods
        public toString() {
            return `First Name: ${this._firstName}\nLast Name: ${this._lastName}\n
             Email Address: ${this._emailAddress}\nUsername: ${this._username}`;
        }

        // Write to JSON
        public toJSON(FirstName: string, LastName: string, Address: string, PhoneNumber: string, EmailAddress: string, Username: string, Password: string): {
            FirstName: string;
            LastName: string;
            Address: string;
            PhoneNumber: string;
            EmailAddress: string;
            Username: string;
            Password: string
        } {
            return {
                FirstName: this._firstName,
                LastName: this._lastName,
                Address: this._address,
                PhoneNumber: this._phoneNumber,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            }
        }

        // Read JSON
        public fromJSON(data: User) {
            this._firstName = data.firstName;
            this._lastName = data.lastName;
            this._address = data.address;
            this._phoneNumber = data.phoneNumber;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data.password;
        }

        /**
         * Serialize for writing to localStorage
         */
        public serialize(): string | null {
            if (this._firstName !== "" && this._lastName !== "" && this._address !== "" && this._phoneNumber !== ""
                && this._emailAddress !== "" && this._username !== "" && this._password !== "") {
                return `${this._firstName}, ${this._lastName}, ${this._address}, ${this._phoneNumber}, ${this._emailAddress}, ${this._username}, ${this._password}`;
            }
            console.error("One or more of the user properties are missing or invalid")
            return null;
        }

        /**
         * Deserialize means to read data from localStorage
         */
        public deserialize(data: string) {
            let propertyArray = data.split(", ");
            this._firstName = propertyArray[0];
            this._lastName = propertyArray[1];
            this._address = propertyArray[2];
            this._phoneNumber = propertyArray[3]
            this._emailAddress = propertyArray[4];
            this._username = propertyArray[5];
            this._password = propertyArray[6];
        }
    }
}