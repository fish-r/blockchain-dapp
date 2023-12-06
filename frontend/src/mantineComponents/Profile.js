import React, { useEffect, useState } from 'react';
import { ProfileHeader } from './ProfileHeader'; // Import ProfileHeader component
import MantineStack from './MantineStack';

import { useNavigate } from 'react-router-dom';
import ProfileStack from './ProfileStack';
import useEthers from '../hooks/useEthers';

export function Profile() {
    const { getMyCopyrights, getListings, connectWallet, data } = useEthers();
    const [activeTab, setActiveTab] = useState('My Rights'); // State to track the active tab

    const [isLoading, setLoading] = useState(false);
    console.log(data.myListings)

    const allListings = data.myListings;

    useEffect(() => {
        // getMyCopyrights()
        connectWallet();
        getListings()
        if (!data.selectedAddress) {
            console.log('no sel')
        }

    }, [])

    return (
        <div>
            <ProfileHeader />
            <ProfileStack listings={allListings} setLoading={setLoading} />
        </div>
    );
}
