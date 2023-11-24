import React from "react";
import Paper from "@mui/material/Paper";

interface TsukurepoReturn {
  date: string;
  message: string;
  tsukurepo_id: number;
  tsukurepo_image: string;
  recipe_image: string;
  recipe_title: string;
}

const Component = () => {
  const paperData = ["apple", "banana", "ichigo"];

  const [selectedValue, setSelectedValue] = React.useState("");

  const handlePaperClick = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      {paperData.map((item, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{
            padding: "20px",
            marginBottom: "10px",
            cursor: "pointer",
            backgroundColor: selectedValue === item ? "#e0e0e0" : "#ffffff",
          }}
          onClick={() => handlePaperClick(item)}
        >
          Content for {item}
        </Paper>
      ))}
      <p>{selectedValue}</p>
    </div>
  );
};

export default Component;
