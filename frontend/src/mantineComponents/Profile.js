import React, { useState } from 'react';
import { Container } from '@mantine/core';
import { ProfileHeader } from './ProfileHeader'; // Import ProfileHeader component
import { RightsTable } from './RightsTable'; // Import RightsTable component

export function Profile() {
    const [activeTab, setActiveTab] = useState('My Rights'); // State to track the active tab

    // Function to render the content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'My Rights':
                return <RightsTable />; // Render the RightsTable when 'My Rights' is active
            // You can add more cases if there are other tabs
            default:
                return null; // Render nothing if no tab matches
        }
    };

    return (
        <div>
            <ProfileHeader />
            <Container size="md">
                {renderContent()}
            </Container>
        </div>
    );
}
