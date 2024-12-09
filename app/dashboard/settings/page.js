"use client";  
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React from 'react';

// Main Settings Page
function SettingsPage() {
  const { user } = useKindeBrowserClient();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Display Current User Info */}
      {user && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">User Information</h2>
          <p><strong>Name:</strong> {user?.given_name} {user?.family_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add other user properties as needed */}
        </div>
      )}

      {/* Kinde Logout Button */}
      <div className="mt-8">
        <LogoutLink className="px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition duration-300 ease-in-out">
          Log out
        </LogoutLink>
      </div>
    </div>
  );
}

export default SettingsPage;
