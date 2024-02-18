import Web3 from 'web3';
import MagazinesSubs from '../contracts/MagazinesSubs.json';
import { convertToReadableQuantity } from '@thirdweb-dev/sdk';


  // Function to add a new magazine
export const addMagazine = async (contract,_walletaddress,_name, _price) => {
    try {
        const result = await contract.call("addMagazine",[_name, _price],{from: _walletaddress });
        return result;
    } catch (error) {
        console.error('Error adding magazine:', error);
        throw error;
    }
};

// Function to subscribe to a magazine
export const subscribe = async (contract,walletAddress,_magazineId) => {
    try {
        const result = await contract.call("subscribe",[_magazineId],{ from: walletAddress });
        return result;
    } catch (error) {
        console.error('Error subscribing:', error);
        throw error;
    }
};

// Function to unsubscribe from a magazine
export const unsubscribe = async (contract,walletAddress,_magazineId) => {
    try {
        const result = await contract.call("unsubscribe",[_magazineId],{ from: walletAddress });
        return result;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        throw error;
    }
};

// Function to update a magazine
export const updateMagazine = async (contract,walletAddress,_magazineId, _newName, _newPrice) => {
    try {
        const result = await contract.call("updateMagazine",[_magazineId, _newName, _newPrice],{ from: walletAddress });
        return result;
    } catch (error) {
        console.error('Error updating magazine:', error);
        throw error;
    }
};

// Function to remove a magazine
export const removeMagazine = async (contract,walletAddress,_magazineId) => {
    try {
        const result = await contract.call("removeMagazine",[_magazineId],{ from: walletAddress });
        return result;
    } catch (error) {
        console.error('Error removing magazine:', error);
        throw error;
    }
};

// Function to get the next magazine ID
export const getNextMagazineId = async (contract) => {
    try {
        const result = await contract.call("nextMagazineId");
        return result;
    } catch (error) {
        console.error('Error getting next magazine ID:', error);
        throw error;
    }
};

// Function to get magazine information
export const getSubscribedMagazines = async (contract,walletAddress) => {
    try {
        const result = await contract.call("getSubscribedMagazines",[walletAddress]);
        return result;
    } catch (error) {
        console.error('Error getting magazine info:', error);
        throw error;
    }
};

// Function to get magazine information
export const getMagazineInfo = async (contract,_magazineId) => {
    try {
        const result = await contract.call("magazines",[_magazineId]);
        return result;
    } catch (error) {
        console.error('Error getting magazine info:', error);
        throw error;
    }
};

export const isSubscribed = async (contract,_magazineId, _subscriber) => {
    try {
        const result = await contract.call("isSubscribed",[_magazineId, _subscriber]);
        return result;
    } catch (error) {
        console.error('Error checking subscription:', error);
        throw error;
    }
};

export const getMagazinesWithSubscriptionStatus = async (contract,currentUserAddress) => {
    try {
        // Get the next magazine ID
        const nextMagazineId = await getNextMagazineId(contract);

        // Initialize an empty array to store magazine information
        const magazinesWithSubscriptionStatus = [];

        // Iterate through each magazine
        for (let i = 1; i <= nextMagazineId; i++) {
            // Get magazine information
            const magazineInfo = await getMagazineInfo(contract,i);

            // Check if the current user is subscribed to this magazine
            const isUserSubscribed = await isSubscribed(contract,i, currentUserAddress);

            // Construct magazine object with subscription status
            const magazineWithSubscriptionStatus = {
                id: i,
                name: magazineInfo.name,
                price: magazineInfo.price,
                isSubscribed: isUserSubscribed
            };
            if (magazineWithSubscriptionStatus.price>0)
            // Push the magazine object to the array
            magazinesWithSubscriptionStatus.push(magazineWithSubscriptionStatus);
        }

        return magazinesWithSubscriptionStatus;
    } catch (error) {
        console.error('Error getting magazines with subscription status:', error);
        throw error;
    }
};