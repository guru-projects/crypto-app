
const SelectButton = ({ children, selected, onClick }) => {

  return (
    <span onClick={onClick} className={`${selected ? 'bg-gray-500 font-bold' : 'font-medium'} p-2 rounded hover:bg-gray-500`}>
      {children}
    </span>
  );
};

export default SelectButton;