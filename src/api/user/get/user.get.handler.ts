import { zValidator } from "@hono/zod-validator";
import { userSelectSchema, userAddressSelectSchema } from "../../../db/user.schema";
import { z } from "zod";
import type { ValidatorContext } from "../../../types/ValidatorContext";
import type { Context } from "hono";
import type { HonoVariables } from "../../../types/HonoVariables";
import { getUser_Service } from "./user.get.service";

export const getUser_SchemaValidator = zValidator('json', z.object({
    columns: z.object({
        ...Object.fromEntries(
            Object.keys(userSelectSchema.shape).map(key => [key, z.boolean().optional()])
        ),
        address: z.object(
            Object.fromEntries(
                Object.keys(userAddressSelectSchema.shape).map(key => [key, z.boolean().optional()])
            )
        ).optional(),
    }) as z.ZodType<Parameters<typeof getUser_Service>[1]>
}))

export const getUser_Handler = async (c: Context<
    HonoVariables,
    "/:userId",
    ValidatorContext<typeof getUser_SchemaValidator>
>) => {
    return c.json({
        data: await getUser_Service(
            c.req.param('userId'),
            c.req.valid('json').columns
        ),
        error: null
    }, 200);
} 