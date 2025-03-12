import { type Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { userUpdateSchema, userAddressUpdateSchema } from '../../../db/user.schema';
import type { HonoVariables } from '../../../types/HonoVariables';
import type { ValidatorContext } from '../../../types/ValidatorContext';
import { updateUser_Service } from './user.update.service';

export const updateUser_SchemaValidator = zValidator('json',
    userUpdateSchema.omit({
        // unallowed fields
        id: true,
        // email: true,
    }).partial()
        .extend({
            address: userAddressUpdateSchema.omit({
                userId: true,
            }).optional(),
        })
)

export const updateUser_Handler = async (c: Context<
    HonoVariables,
    "/:userId",
    ValidatorContext<typeof updateUser_SchemaValidator>
>) => {
    return c.json({
        data: await updateUser_Service(
            c.req.param('userId'),
            c.req.valid('json')
        ),
        error: null 
    }, 200);
} 