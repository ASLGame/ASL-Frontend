import {
  Grid,
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Store } from "react-notifications-component";

// Styling for the modal
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "75vw" : "40vw",
  bgcolor: "background.paper",
  borderRadius: "12px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Function to display a notification if no difficulty is chosen
function difficultyNotification() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9698D6",
        borderLeft: "8px solid #4D4CAC",
      }}
    >
      <div>
        <h4>Please choose a difficulty first.</h4>
      </div>
    </div>
  );
}

export default function ModalPopup(props: any) {
  const {
    game,
    setIsModalOpen,
    setDifficulty,
    isModalOpen,
    difficulty,
    setIsTimerPaused,
    setPlayable,
  } = props;

  const isDesktop = useMediaQuery("(min-width:1660px)");

  useEffect(() => {
    // Close the modal if a difficulty is chosen
    if (difficulty) {
      closeModal();
    }
  }, [difficulty]);

  const closeModal = () => {
    if (difficulty) {
      // Handle gameplay based on the selected game
      if (game?.name === "Hang Man") {
        setPlayable(true);
      } else if (game?.name !== "Wordle") {
        setIsTimerPaused(false);
      }
      setIsModalOpen(false);
    } else {
      // Show a notification if no difficulty is chosen
      Store.addNotification({
        content: difficultyNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    }
  };

  return (
    <Grid>
      <Modal open={difficulty ? isModalOpen : true} onClose={closeModal}>
        <Box sx={style}>
          <Typography variant="h4" component="h2" textAlign={"center"}>
            Rules
          </Typography>
          <List>
            {game?.rules?.split("/n").map((rule: String, index: number) => {
              return (
                <ListItem
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant={isDesktop ? "h5" : "h6"} sx={{ mt: 1 }}>
                    {rule}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
          <Typography
            variant="h4"
            component="h2"
            textAlign={"center"}
            style={{ marginTop: "18px" }}
          >
            Description
          </Typography>
          <Typography
            textAlign={"center"}
            variant={isDesktop ? "h5" : "h6"}
            sx={{ mt: 1 }}
          >
            {game.description}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            textAlign={"center"}
            style={{ marginTop: "18px" }}
          >
            Choose a difficulty
          </Typography>
          <Grid
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#ff808b",
                fontWeight: "bold",
                border: "1px solid black",
                borderRadius: "8px",
                fontSize: isDesktop ? "21px" : "18px",
              }}
              onClick={() => {
                setDifficulty("easy");
              }}
            >
              Easy
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#ff808b",
                fontWeight: "bold",
                border: "1px solid black",
                borderRadius: "8px",
                margin: "0px 10px",
                fontSize: isDesktop ? "21px" : "18px",
              }}
              onClick={() => {
                setDifficulty("medium");
              }}
            >
              Medium
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#ff808b",
                fontWeight: "bold",
                border: "1px solid black",
                borderRadius: "8px",
                fontSize: isDesktop ? "21px" : "18px",
              }}
              onClick={() => {
                setDifficulty("hard");
              }}
            >
              Hard
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
