"use strict";

namespace core {
    export class Router {
        private _activeLink: string;
        private _routingTable: string[];
        private _linkData: string;

        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }

        public get LinkData(): string {
            return this._linkData;
        }

        public set LinkData(link: string) {
            this._linkData = link;
        }

        public get ActiveLink(): string {
            return this._activeLink;
        }

        public set ActiveLink(link: string) {
            this._activeLink = link;
        }

        public Add(route: string) {
            this._routingTable.push(route);
        }

        public AddTable(routingTable: string []) {
            this._routingTable = routingTable;
        }

        public Find(route: string): number {
            return this._routingTable.indexOf(route);
        }

        public Remove(route: string): boolean {
            if (this.Find(route) > -1) {
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        public toString(): string {
            return this._routingTable.toString();
        }
    }
}

let router: core.Router = new core.Router();

router.AddTable([
    "/",
    "/home",
    "/blog",
    "/contact",
    "/event-planning",
    "/events",
    "/fact",
    "/gallery",
    "/login",
    "/logout",
    "/privacy-policy",
    "/portfolio",
    "/register",
    "/services",
    "/statistics",
    "/team",
    "/TOS"
]);

let route: string = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
    ? ((route === "/") ? "home" : route.substring(1))
    : ("404");
