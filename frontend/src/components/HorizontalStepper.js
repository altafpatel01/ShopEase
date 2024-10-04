import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
// import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { FaShippingFast } from "react-icons/fa";
// import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { MdDoneAll } from "react-icons/md";
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { FaPiggyBank } from "react-icons/fa";
// import "./CheckoutSteps.css";

const CheckoutSteps = ({ step}) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: < FaShippingFast />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdDoneAll />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <FaPiggyBank />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel step={step} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={step === index ? true : false}
            completed={step >= index ? true : false}
          >
            <StepLabel
              style={{
                color: step >= index ? "#A3C4D8" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;