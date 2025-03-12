import { usersTable, userAddressTable } from "../../../db/user.schema";
import db from "../../../db/drizzle";
import { eq, type InferInsertModel } from "drizzle-orm";

export const updateUser_Service = async (
    userId: string,
    data: Partial<InferInsertModel<typeof usersTable>> & {
        address?: Partial<InferInsertModel<typeof userAddressTable>>
    }
) => {
    return await db.transaction(async (tx) => {
        const {
            // unallowed fields 
            id,
            // email,
            
            // allowed fields
            // other user tables
            address,
            ...userData
        } = data;

        const updates = [];

        if (Object.keys(userData).length > 0) {
            updates[updates.length] = tx.update(usersTable)
                .set(userData)
                .where(eq(usersTable.id, userId));
        }

        // Update address data if provided
        if (address) {
            const { userId: _, ...addressData } = address;
            if (Object.keys(addressData).length > 0) {
                updates[updates.length] = tx.insert(userAddressTable)
                    .values({ ...addressData, userId })
                    .onConflictDoUpdate({
                        target: userAddressTable.userId,
                        set: addressData
                    });
            }
        }
        return await Promise.all(updates);
    })
}