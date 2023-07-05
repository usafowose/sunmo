import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    // TODO(afowose): instead of passing it the controller and action pass it the direct handler to handle this route 
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]