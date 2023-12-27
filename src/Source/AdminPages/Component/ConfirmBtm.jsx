import React from "react";
import { Button } from "@chakra-ui/react";

const ConfirmBtn = ({
  func,
  title='Button',
  warn = "Are you sure you want to delete this?",
  ...args
}) => {
  const handleConfirm = () => {
    const confirmed = window.confirm(warn);
    if (confirmed) {
      // Perform the delete action here
      // console.log("Deleting...", func);
      
      if (func && typeof func === "function") {
        func();
      }
    }
  };

  return (
    <Button {...args} onClick={handleConfirm}>
      {title}
    </Button>
  );
};

export default ConfirmBtn;
