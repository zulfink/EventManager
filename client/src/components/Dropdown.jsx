import React, { useState } from 'react'

const Dropdown = ({item,onSelect}) =>{
    const [selectedItem, setSelectedItem] = useState("")

   const handleSelectChange = (event) =>{
setSelectedItem(event?.target?.value)
onSelect(event)
   }
  
  return (
    < >
    <select name={item.name} value={selectedItem} onChange={handleSelectChange} className="dropdown text-sm placeholder-gray-500 pl-10 pr-4  rounded-xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400">
      <option value="">Select an item</option>
      {item?.data?.map((option, index) => {
        return( <><option value={option?.id}>{option?.name}</option>
</>
        )
      })}
    </select>
    
  </>
  )
}

export default Dropdown 