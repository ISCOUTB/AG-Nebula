

const Chip = ({children, className}) => {
  return (
    <div className={`flex justify-center items-center w-fit h-6 px-2 gap-2 font-cabin font-medium text-sm ${className}`}>
        {children}
    </div>
  )
}

export default Chip