import { Chip } from "@mui/material";

export default function PageTitle(props: any) {
  const label = props?.label;
  return (
    <Chip
      label={label}
      style={{
        backgroundColor: "#1976d2",
        color: "#FAFAFA",
        minHeight: "50px",
        minWidth: "175px",
        fontSize: "22px",
        fontWeight: 600,
        margin: "0 0 5vh 0",
      }}
    />
  );
}
