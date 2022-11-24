import React, { useState }from "react";
import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import CountryPhoneList from "../CountryPhoneList/CountryPhoneList";

const PhoneFormControl = () => {
    const [codeNumber, setCodeNumber] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleCodeNumber = (value) => {
        setCodeNumber(value)
    }

  return (
    <>
      <FormControl mt={4}>
        <FormLabel
          color={"acsys.subtitleColor"}
          mb="1"
          fontWeight={"600"}
          fontSize={"13px"}
        >
          Telefono
        </FormLabel>
        <CountryPhoneList onSelect={handleCodeNumber}/>

        <InputGroup>
          <InputLeftAddon
            // width="80px"
            children={`+${codeNumber}`}
            // children="+591"
            height="35px"
            fontSize="15px"
            backgroundColor="acsys.backgroundColor"
          />
          <Input
            focusBorderColor="acsys.primaryColor"
            size={"sm"}
            // width={330}
            
            placeholder=""
            spellCheck="false"
            borderRadius={"5px"}
            fontSize={"15px"}
            height="35px"
            color="acsys.iconColor"
            type={"number"}
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

export default PhoneFormControl;
