import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const TextFormControl = ({labelName, paddingSpace}) => {

    
  return (
    <>
      <FormControl mt={paddingSpace}>
        <FormLabel
          color={"acsys.subtitleColor"}
          mb="1"
          fontWeight={"600"}
          fontSize={"13px"}
        >
          {labelName}
        </FormLabel>
        <Input
          focusBorderColor="acsys.primaryColor"
          size={"sm"}
        //   width={337}
        //    borderColor="gray.300"
          spellCheck="false"
          borderRadius={"5px"}
          fontSize={"15px"}
          height="35px"
          color="acsys.iconColor"
          placeholder=""
        />
      </FormControl>
    </>
  );
};

export default TextFormControl;
