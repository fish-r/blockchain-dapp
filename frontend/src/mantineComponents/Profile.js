import React, { useEffect, useState } from 'react';
import { ProfileHeader } from './ProfileHeader'; // Import ProfileHeader component

import { useNavigate } from 'react-router-dom';
import ProfileStack from './ProfileStack';
import useEthers from '../hooks/useEthers';

export function Profile() {
    const { getListings, connectWallet, data } = useEthers();

    const [isLoading, setLoading] = useState(false);

    const myListings = data.myListings;

    useEffect(() => {
        // getMyCopyrights()
        connectWallet();
        getListings()
        if (!data.selectedAddress) {
            console.log('no sel')
        }

    }, [isLoading])

    return (
        <div>
            <ProfileHeader />
            <ProfileStack listings={myListings} setLoading={setLoading} isLoading={isLoading} />
        </div>
    );
}
