import React from "react";


import {
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@material-ui/core";

import { Delete } from "@material-ui/icons";
import { connect } from "react-redux";

import { deleteLabel } from "store/actions/label";

const EditLabelsModal: React.FC<{
  isModalOpen: boolean;
  labels?: object[];
  userID: string;
  closeModal: (val: boolean) => void;
  deleteLabel: (userID: string, labelID: string) => void;
}> = ({ isModalOpen, deleteLabel, labels = [], closeModal, userID }) => {
  return (
    <Dialog open={isModalOpen} onClose={() => closeModal(false)}>
      <DialogTitle>Edit labels</DialogTitle>
      <DialogContent style={{
       minWidth: "500px",
       maxWidth: '80%'
      }}>
          {labels.map((label: any, index: number) => (
            <Box display="flex" alignItems="center" key={index} >
              <IconButton
              size="small"           
                onClick={() => {
                  deleteLabel(userID, label.labelID);
                }}
              >
                <Delete />
              </IconButton>
              <Typography style={{
               marginLeft: '1rem'
              }}>{label.labelName}</Typography>
            </Box>
          ))}
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => ({
  userID: state.auth.user.userID,
});

const mapDispatchToProps = () => ({
  deleteLabel,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLabelsModal);
