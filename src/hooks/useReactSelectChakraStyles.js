import { useTheme } from '@chakra-ui/react'

const useReactSelectChakraStyles = () => {
  const theme = useTheme()

  const normal = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused
        ? '#109AC6'
        : theme.colors.gray[200],
      borderRadius: theme.radii.md,
      boxShadow: state.isFocused ? `0 0 0 1px #109AC6` : '',
      ':hover': {
        borderColor: state.isFocused
          ? '#109AC6'
          : theme.colors.gray[300]
      },
      miWidth: '100%',
      fontSize: theme.fontSizes.sm,
    //   fontWeight: theme.fontWeights.light,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.blue[500]
        : state.isFocused
        ? 'Highlight' // Utiliza el color predeterminado del sistema para el fondo en hover
        : 'transparent',
      color: state.isSelected ? theme.colors.white : '#384a66',
      cursor: 'pointer',
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.normal,
       padding: '4px 12px',
      ':active': {
        backgroundColor: theme.colors.blue[500]
      },
    }),
    menu: provided => ({
      ...provided,
      borderRadius: theme.radii.md,
      zIndex: 10
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#5D6A7E",
      fontSize: theme.fontSizes.sm,
    }),
  }

  const error = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused
        ? '#109AC6'
        : theme.colors.red[500],
      borderRadius: theme.radii.md,
      boxShadow: state.isFocused ? `0 0 0 1px #109AC6` : `0 0 0 1px ${theme.colors.red[500]}`,
      ':hover': {
        borderColor: state.isFocused
        ? '#109AC6'
        : theme.colors.red[500],
      },
      miWidth: '100%',
      fontSize: theme.fontSizes.sm,
    //   fontWeight: theme.fontWeights.light,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.red[500]
        : state.isFocused
        ? 'Highlight' // Utiliza el color predeterminado del sistema para el fondo en hover
        : 'transparent',
      color: state.isSelected ? theme.colors.white : '#384a66',
      cursor: 'pointer',
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.normal,
       padding: '4px 12px',
      ':active': {
        backgroundColor: '#109AC6'
      },
    }),
    menu: provided => ({
      ...provided,
      borderRadius: theme.radii.md,
      zIndex: 10
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#5D6A7E",
      fontSize: theme.fontSizes.sm,
    }),
  }

  return {
    normal, 
    error
  }
}

export default useReactSelectChakraStyles
