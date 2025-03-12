import { type Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { userInsertSchema, userAddressInsertSchema } from '../../../db/user.schema';
import type { HonoVariables } from '../../../types/HonoVariables';
import type { ValidatorContext } from '../../../types/ValidatorContext';
import { createUser_Service } from './user.create.service';

export const createUser_SchemaValidator = zValidator('json',
    userInsertSchema.omit({
        // unallowed fields
        id: true,
    })
    .extend({
        address: userAddressInsertSchema.omit({
            userId: true,
        }).optional(),
    })
)

export const createUser_Handler = async (c: Context<
    HonoVariables,
    "/",
    ValidatorContext<typeof createUser_SchemaValidator>
>) => {
    return c.json({
        data: await createUser_Service(
            c.req.valid('json')
        ),
        error: null 
    }, 201);
} 