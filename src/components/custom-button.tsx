import React from "react";
import { Button, makeStyles, ButtonProps } from "@material-ui/core";

interface BtnProps extends ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(5),
  },
}));

export const CustomButton: React.VFC<BtnProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        color="primary"
        className={classes.button}
      >
        {text}
      </Button>
    </>
  );
};
