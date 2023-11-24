// Tabs.js
import { useState } from 'react';
import { Tabs as MantineTabs } from '@mantine/core';

function Tabs() {
    const [activeTab, setActiveTab] = useState('collected');

    return (
        <MantineTabs active={activeTab} onTabChange={setActiveTab} variant="outline">
            <MantineTabs.Tab label="Collected" tabKey="collected">
                {/* Content for the Collected tab */}
            </MantineTabs.Tab>
            <MantineTabs.Tab label="Offers made" tabKey="offers">
                {/* Content for Offers made tab */}
            </MantineTabs.Tab>
            <MantineTabs.Tab label="Deals" tabKey="deals">
                {/* Content for Deals tab */}
            </MantineTabs.Tab>
            {/* Add more tabs as needed */}
        </MantineTabs>
    );
}

export default Tabs;
