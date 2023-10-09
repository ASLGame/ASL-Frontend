import { Chip } from "@mui/material";

export default function PageTitle(props: any) {
  const label = props?.label;
  return (
    <Chip
      label={label}
      style={{
        backgroundColor: "#c42b35",
        color: "#fcf3f2",
        minHeight: "50px",
        minWidth: "175px",
        fontSize: "22px",
        fontWeight: 600,
        margin: "0 0 5vh 0",
      }}
    />
  );
}
