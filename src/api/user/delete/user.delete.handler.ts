import { type Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { HonoVariables } from '../../../types/HonoVariables';
import type { ValidatorContext } from '../../../types/ValidatorContext';
import { deleteUser_Service } from './user.delete.service';

export const deleteUser_SchemaValidator = zValidator('json', z.object({}).optional())

export const deleteUser_Handler = async (c: Context<
    HonoVariables,
    "/:userId",
    ValidatorContext<typeof deleteUser_SchemaValidator>
>) => {
    return c.json({
        data: await deleteUser_Service(
            c.req.param('userId')
        ),
        error: null 
    }, 200);
} 