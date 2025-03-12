import db from "../../../db/drizzle";
import { usersTable, userAddressTable } from "../../../db/user.schema";
import { eq } from "drizzle-orm";
import type { NonEmpty } from "../../../types/typeUtils";


export const getUser_Service = async (
    userId: string,
    columns?: Partial<Record<keyof typeof usersTable.$inferSelect, boolean>> & {
        address?: Partial<Record<keyof typeof userAddressTable.$inferSelect, boolean>>
    }
) => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, userId),
        columns: columns,
        with: {
            ...(columns?.address && {
                address: {
                    columns: columns.address
                }
            }),
        }
    })

    // this typing is to make sure typing work with hono rpc.
    // https://hono.dev/docs/guides/rpc
    // api never returns {} but drizzle adds a {} when there is no "with" query ...
    type userType = NonNullable<typeof user>;

    type address = userType['address'] // this has | {}
    type nonEmptyAddress = NonEmpty<address> // this has not 

    type newUserType = (
        Omit<
            userType,
            'address'
        > & {
            address?: nonEmptyAddress
        }
    ) | undefined

    return user as newUserType
}