import { usersTable, userAddressTable } from "../../../db/user.schema";
import db from "../../../db/drizzle";
import { eq } from "drizzle-orm";

export const deleteUser_Service = async (
    userId: string
) => {
    return await db.transaction(async (tx) => {
        // Delete address data first (due to foreign key constraint)
        await tx.delete(userAddressTable)
            .where(eq(userAddressTable.userId, userId));
        
        // Delete user data
        const [deletedUser] = await tx.delete(usersTable)
            .where(eq(usersTable.id, userId))
            .returning();
        
        return deletedUser;
    });
} 