import { Hono } from "hono";
import { getUser_Handler, getUser_SchemaValidator } from "./get/user.get.handler";
import { updateUser_Handler, updateUser_SchemaValidator } from "./update/user.update.handler";
import { createUser_Handler, createUser_SchemaValidator } from "./create/user.create.handler";
import { deleteUser_Handler, deleteUser_SchemaValidator } from "./delete/user.delete.handler";

export const userRouter = new Hono()
    .post(
        "/",
        createUser_SchemaValidator,
        createUser_Handler
    )
    .post(
        "/:userId",
        getUser_SchemaValidator,
        getUser_Handler
    )
    .patch(
        "/:userId",
        updateUser_SchemaValidator,
        updateUser_Handler
    )
    .delete(
        "/:userId",
        deleteUser_SchemaValidator,
        deleteUser_Handler
    )