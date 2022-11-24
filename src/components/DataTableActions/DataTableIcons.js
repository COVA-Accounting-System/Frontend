import React from "react";
import "./DataTableIcons.scss";
import {
  Button,
  // ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import {ChevronDownIcon} from '@chakra-ui/icons'

const DataTableIcons = (props) => {
  const { data, openModal, dispatchAction, setData } = props;

  const onClickDelete = () => {
    dispatchAction("delete");
    setData(data);
    openModal();
  };

  const onClickEdit = () => {
    dispatchAction("edit");
    setData(data);
    openModal();
  };

  return (
    <div>
      <div className="icons-container">
        <div className="icon-container">
          <span
            className="material-symbols-outlined icon icon-edit"
            title="Editar"
            onClick={onClickEdit}
          >
            edit
          </span>
        </div>
        <div className="icon-container">
          <span
            id="delete"
            className="material-symbols-outlined icon icon-delete"
            title="Eliminar"
            onClick={onClickDelete}
          >
            delete
          </span>
        </div>
      </div>

{/* <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Your Cats
  </MenuButton>
  <MenuList>
    <MenuItem minH='48px'>

      <span>Fluffybuns the Destroyer</span>
    </MenuItem>
    <MenuItem minH='40px'>

      <span>Simon the pensive</span>
    </MenuItem>
  </MenuList>
</Menu> */}
    </div>
  );
};

export default DataTableIcons;
