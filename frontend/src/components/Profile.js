import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAddress: '0xA58A...Bbee',
            joinedDate: 'November 2023',
            selectedTab: 'collected',
            collections: [], // This should be fetched from your backend or blockchain
        };
    }

    componentDidMount() {
        this.fetchUserData();
        this.fetchCollections();
    }

    fetchUserData = async () => {
        // Placeholder: Fetch user data from backend or blockchain
        // Update the state with user data
    };

    fetchCollections = async () => {
        // Placeholder: Fetch collections from backend or blockchain
        // For example:
        // const collectionsData = await fetchCollectionsFromAPI();
        // this.setState({ collections: collectionsData });
    };

    selectTab = (tabName) => {
        this.setState({ selectedTab: tabName });
    };

    renderCollected = () => {
        const { collections } = this.state;
        if (collections.length === 0) {
            return (
                <div className="no-collections">
                    <p>No items found for this search</p>
                    {/* Implement the logic to fetch all items when this button is clicked */}
                    <button onClick={this.fetchCollections}>Back to all items</button>
                </div>
            );
        } else {
            return (
                <div className="collections-grid">
                    {/* Map through collections and render each item */}
                    {collections.map((item, index) => (
                        <div key={index} className="collection-item">
                            {/* Replace with your layout for a collection item */}
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            );
        }
    };

    renderTabContent = () => {
        const { selectedTab } = this.state;
        switch (selectedTab) {
            case 'collected':
                return this.renderCollected();
            // Implement cases for other tabs if necessary
            default:
                return <div>Select a tab</div>;
        }
    };

    render() {
        const { userAddress, joinedDate } = this.state;

        return (
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image">
                        {/* Placeholder for user profile image */}
                        <div className="image-placeholder" />
                    </div>
                    <div className="profile-info">
                        <h1>Unnamed</h1>
                        <p className="user-address">{userAddress}</p>
                        <p>Joined {joinedDate}</p>
                    </div>
                </div>

                <div className="profile-nav">
                    {/* Navigation tabs */}
                    <button onClick={() => this.selectTab('collected')}>Collected</button>
                    <button onClick={() => this.selectTab('offersMade')}>Offers made</button>
                    <button onClick={() => this.selectTab('deals')}>Deals</button>
                    <button onClick={() => this.selectTab('created')}>Created</button>
                    <button onClick={() => this.selectTab('favorited')}>Favorited</button>
                    <button onClick={() => this.selectTab('activity')}>Activity</button>
                    {/* More tabs can be added if needed */}
                </div>

                <div className="profile-content">
                    {this.renderTabContent()}
                </div>
            </div>
        );
    }
}

export default Profile;
