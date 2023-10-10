import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@mui/material";
import * as React from "react";
import styles from "./modal.module.css";
import { isMobile } from "react-device-detect";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "75vw" : "40vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalPopup(props: any) {
  const {
    game,
    setIsModalOpen,
    setDifficulty,
    isModalOpen,
    difficulty,
    setIsTimerPaused,
    rules,
    description,
  } = props;

  return (
    <Grid>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <Box sx={style}>
          <Typography variant="h4" component="h2" textAlign={"center"}>
            Rules
          </Typography>
          {rules?.map((rule: String, index: number) => {
            return (
              <ListItem
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ mt: 1 }}>{`${
                  index + 1
                }. ${rule}`}</Typography>
              </ListItem>
            );
          })}
        </Box>
      </Modal>
    </Grid>
  );
}
