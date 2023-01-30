import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "../Button/Button";

const FeaturesFormControl = ({
  listOfFeatures,
  onAddFeature,
  onRemoveFeature,
}) => {
  const [featureInputValue, setFeatureInputValue] = useState("");
  return (
    <FormControl>
      <FormLabel
        color="acsys.subtitleColor"
        mb="1"
        fontWeight="600"
        fontSize="13px"
      >
        Caracteristicas
      </FormLabel>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "330px",
          //   gap: '15px'
        }}
      >
        <Input
          focusBorderColor="acsys.primaryColor"
          size="sm"
          value={featureInputValue}
          onInput={(event) => {
            setFeatureInputValue(event.target.value);
          }}
          placeholder=""
          spellCheck="false"
          borderRadius="5px"
          fontSize="15px"
          height="35px"
          color="acsys.iconColor"
          type="string"
          marginRight="10px"
        />
        {/* <IconButton
            // colorScheme='teal'
            backgroundColor={'acsys.primaryColor'}
            color={'acsys.backgroundColor'}
            _hover={{ backgroundColor: 'acsys.primaryColor' }}
            aria-label='Agregar caracteristica'
            size='lg'
            icon={<AddIcon />}
            /> */}
        {featureInputValue !== "" ? (
          <Button
            label="+"
            type="add"
            system="accounting"
            onClick={(event) => {
              event.preventDefault();
              const newListOfFeatures = [...listOfFeatures];
              newListOfFeatures.push({ description: featureInputValue });
              onAddFeature(newListOfFeatures);
              setFeatureInputValue("");
            }}
          />
        ) : (
          <Button label="+" type="add-disabled" isDisabled={true}/>
        )}
      </div>
      <div className="features-list-container">
        <UnorderedList>
          {listOfFeatures.map((feature, index) => {
            return (
              <ListItem mb={1}>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <p>{feature.description}</p>
                  <div
                    style={{
                      display: "block",
                      // minHeight: '20px',
                      position: "absolute",
                      right: "0",
                      // justifyContent: 'center'
                    }}
                  >
                    <DeleteIcon
                      color="acsys.fontColor"
                      _hover={{
                        color: "acsys.redColor",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const newListOfFeatures = [...listOfFeatures];
                        newListOfFeatures.splice(index, 1);
                        onRemoveFeature(newListOfFeatures);
                      }}
                    />
                  </div>
                </div>
              </ListItem>
            );
          })}
        </UnorderedList>
      </div>
    </FormControl>
  );
};

export default FeaturesFormControl;
