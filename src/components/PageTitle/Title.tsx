import { Chip } from "@mui/material";

export default function PageTitle(props: any) {
  // Destructure the 'label' prop
  const label = props?.label;

  return (
    // A Material-UI Chip component for displaying a page title
    <Chip
      label={label}
      style={{
        backgroundColor: "#c42b35", // Background color of the Chip
        color: "#fcf3f2", // Text color of the Chip
        minHeight: "50px", // Minimum height of the Chip
        minWidth: "175px", // Minimum width of the Chip
        fontSize: "22px", // Font size of the text
        fontWeight: 600, // Font weight of the text
        margin: "0 0 5vh 0", // Margin applied to the Chip
      }}
    />
  );
}
