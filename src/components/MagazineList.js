import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CreateMagazine from "./CreateMagazine";
import UpdateMagazine from "./UpdateMagazine";
import SubscribeToMagazine from "./SubscribeToMagazine";
import CancelSubscription from "./CancelSubscription";
import {
  ConnectWallet,
  useAddress,
  useChainId,
  useContract,
} from "@thirdweb-dev/react";
import {
  getMagazinesWithSubscriptionStatus,
  isSubscribed,
  removeMagazine,
  getSubscribedMagazines,
} from "../services/MagazinesSubsService";
import MagazinesSubs from "../contracts/MagazinesSubs.json";

const MagazineList = () => {
  const [magazines, setMagazines] = useState([]);
  const [subscribedMagazines, setSubscribedMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedMagazineId, setSelectedMagazineId] = useState(null);
  const walletAddress = useAddress();
  const [chainName, setChainName] = useState("");
  const { contract, isLoading, error } = useContract(
    MagazinesSubs.networks[13381],
    MagazinesSubs.abi
  );
  useEffect(() => {
    fetchMagazines();
  }, [contract]);

  const fetchMagazines = async () => {
    try {
      if (contract) {
        const subedMag = await getSubscribedMagazines(contract, walletAddress);
        const response = await getMagazinesWithSubscriptionStatus(
          contract,
          walletAddress
        );
        console.log(subedMag);
        console.log(response);
        // Convert subedMag to array of integers
        const subedMagIntegers = subedMag.map(bigInt => parseInt(bigInt.toString()));

        setSubscribedMagazines(subedMagIntegers);
        setMagazines(response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("deleting id", id);
      await removeMagazine(contract, walletAddress, id);
      fetchMagazines();
    } catch (error) {
      console.error("Error deleting magazine:", error);
    }
  };

  const handleUpdateClick = (id) => {
    setSelectedMagazineId(id);
    setShowUpdatePopup(true);
  };

  const handleCloseUpdatePopup = () => {
    setShowUpdatePopup(false);
  };

  return (
    <div>
      <ConnectWallet />
      <h1>Magazines</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <CreateMagazine
            contract={contract}
            walletaddress={walletAddress}
            refreshList={fetchMagazines}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Subscribe</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {magazines.map((magazine) => {
                  const isSubscriber = subscribedMagazines.includes(
                    magazine.id
                  );
                  return (
                    <TableRow key={magazine.id}>
                      <TableCell>{magazine.id}</TableCell>
                      <TableCell>{magazine.name}</TableCell>
                      <TableCell>{magazine.price.toString()}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDelete(magazine.id)}
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleUpdateClick(magazine.id)}
                          variant="outlined"
                          color="primary"
                        >
                          Update
                        </Button>
                      </TableCell>
                      {isSubscriber == true ? (
                        <TableCell>
                          <CancelSubscription
                            contract={contract}
                            walletaddress={walletAddress}
                            userId={1}
                            magazineId={magazine.id}
                            refreshList={fetchMagazines}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <SubscribeToMagazine
                            contract={contract}
                            walletaddress={walletAddress}
                            userId={1}
                            magazineId={magazine.id}
                            refreshList={fetchMagazines}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {/* Update Magazine Popup */}
      <Dialog open={showUpdatePopup} onClose={handleCloseUpdatePopup}>
        <DialogTitle>Update Magazine</DialogTitle>
        <DialogContent>
          <UpdateMagazine
            contract={contract}
            walletaddress={walletAddress}
            id={selectedMagazineId}
            refreshList={fetchMagazines}
            handleCloseUpdatePopup={handleCloseUpdatePopup}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdatePopup}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MagazineList;
