import { usersTable, userAddressTable } from "../../../db/user.schema";
import db from "../../../db/drizzle";
import { type InferInsertModel } from "drizzle-orm";

export const createUser_Service = async (
    data: InferInsertModel<typeof usersTable> & {
        address?: Partial<InferInsertModel<typeof userAddressTable>>
    }
) => {
    return await db.transaction(async (tx) => {
        const {
            // other user tables
            address,
            ...userData
        } = data;

        // Insert user data
        const [user] = await tx.insert(usersTable)
            .values(userData)
            .returning();

        let userAddress;
        // Insert address data if provided
        if (address) {
            const { userId: _, ...addressData } = address;
            if (Object.keys(addressData).length > 0) {
                const [insertedAddress] = await tx.insert(userAddressTable)
                    .values({ ...addressData, userId: user.id })
                    .returning();
                userAddress = insertedAddress;
            }
        }

        return {
            ...user,
            address: userAddress
        };
    });
} 