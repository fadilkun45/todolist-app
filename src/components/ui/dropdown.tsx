import Select from 'react-select';

interface DropdownProps {
  onChange: (value: any) => void;
  options: { value: string; label: string }[];
  value: any;
  placeholder?: string;
  disabled?: boolean
}

const Dropdown = ({
  onChange,
  options = [],
  value,
  disabled,
  placeholder = "Select an option",
}: DropdownProps) => {
  return (
    <Select
    isDisabled={disabled}
      styles={{
        control: (provided) => ({
          ...provided,
        }),
        container: (provided) => ({
          ...provided,
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? '#009496'
            : state.isFocused
              ? '#009496'
              : '#fff',
          color: state.isSelected || state.isFocused ? '#FFFF' : '#009496',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#22223b',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 10,
        }),
      }}
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
    />
  )
}

export default Dropdown