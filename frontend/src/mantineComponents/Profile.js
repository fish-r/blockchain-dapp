import React, { useEffect, useState } from 'react';
import { ProfileHeader } from './ProfileHeader'; // Import ProfileHeader component
import MantineStack from './MantineStack';
import useEthers from '../hooks/useEthers';
import { useNavigate } from 'react-router-dom';
import ProfileStack from './ProfileStack';

export function Profile() {
    const [activeTab, setActiveTab] = useState('My Rights'); // State to track the active tab

    const { getListings, connectWallet, data } = useEthers();
    const [isLoading, setLoading] = useState(false);
    console.log(data.listings)

    const allListings = data.myListings

    useEffect(() => {

        getListings();
        connectWallet();
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
