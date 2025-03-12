import { apiClient, type createUserRequestType } from "./apiClient";

/**
 * Test script for CRUD operations on the user API
 */
export const testCRUDOperations = async () => {
  const logs = [];
  logs.push("Starting CRUD operations test...");
  
  // Test CREATE operation
  logs.push("\n--- Testing CREATE operation ---");
  const newUser: createUserRequestType = {
    name: "Test User",
    email: `test.user.${Date.now()}@example.com`, // Ensure unique email
    age: 30,
    address: {
      address1: "123 Test Street",
      address2: "Apt 456",
      city: "Test City",
      state: "Test State",
      postalCode: "12345",
      country: "Test Country",
      lat: 40.7128,
      lng: -74.0060
    }
  };
  
  logs.push("Creating user with data:", JSON.stringify(newUser, null, 2));
  const createdUser = await (await apiClient.api.user.$post({
    json: newUser
  })).json();
  
  logs.push("Created user:", JSON.stringify(createdUser, null, 2));
  const userId = createdUser.data.id;
  
  // Test READ operation
  logs.push("\n--- Testing READ operation ---");
  logs.push(`Getting user with ID: ${userId}`);
  const readUser = await (await apiClient.api.user[':userId'].$post({
    param: {
      userId: userId
    },
    json: {
      columns: {
        name: true,
        address: {
          city: true,
        }
      }
    }
  })).json();
  
  logs.push("Retrieved user:", JSON.stringify(readUser, null, 2));
  
  // Test UPDATE operation
  logs.push("\n--- Testing UPDATE operation ---");
  const updateData = {
    name: "Updated Test User",
    age: 31,
    address: {
      city: "Updated City"
    }
  };
  
  logs.push(`Updating user with ID: ${userId} with data:`, JSON.stringify(updateData, null, 2));
  const updatedUser = await (await apiClient.api.user[':userId'].$patch({
    param: {
      userId: userId
    },
    json: updateData
  })).json();
  
  logs.push("Updated user:", JSON.stringify(updatedUser, null, 2));
  
  // Verify the update
  logs.push("\n--- Verifying UPDATE operation ---");
  const verifyUpdate = await (await apiClient.api.user[':userId'].$post({
    param: {
      userId: userId
    },
    json: {
      columns: {
        address: {
          city: true
        }
      }
    }
  })).json();
  
  logs.push("Verified updated user:", JSON.stringify(verifyUpdate, null, 2));
  
  // Test DELETE operation
  logs.push("\n--- Testing DELETE operation ---");
  logs.push(`Deleting user with ID: ${userId}`);
  const deleteResult = await (await apiClient.api.user[':userId'].$delete({
    param: {
      userId: userId
    }
  })).json();
  
  logs.push("Delete result:", JSON.stringify(deleteResult, null, 2));
  
  // Verify the delete
  logs.push("\n--- Verifying DELETE operation ---");
  try {
    const verifyDelete = await (await apiClient.api.user[':userId'].$post({
      param: {
        userId: userId
      },
      json: {
        columns: {
          address: {
            city: true
          }
        }
      }
    })).json();
    
    logs.push("User still exists after delete:", JSON.stringify(verifyDelete, null, 2));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logs.push("User successfully deleted, received error as expected:", errorMessage);
  }
  
  logs.push("\nCRUD operations test completed!");
  return logs;
}