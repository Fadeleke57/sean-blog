import React, {useState} from 'react'

function FilterBar({setTag, setCurrentPage}) {
  const [active, setActive] = useState(1)

  const choices = [
    { id: 1, name: "All"},
    { id: 2, name: "Finance"},
    { id: 3, name: "IR"},
    { id: 4, name: "Personal"},
  ]
 
  function onClick(choice) {
    setActive(choice.id);
    setCurrentPage(1);
    setTag(choice.name);
  }

  function handleSelectChange(event) {
    const selectedChoice = choices.find(choice => choice.id === parseInt(event.target.value));
    onClick(selectedChoice);
  }

  return (
    <div className="filter-bar">
        <div className='bar-wrapper'>
          {choices.map((choice, id) => (
            <p
              key={id}
              className={active === choice.id ? "active" : ""}
              onClick={() => onClick(choice)}
            >
              {choice.name}
            </p>
          ))}
        </div> 
        <div className='select-wrapper'>
          <select onChange={handleSelectChange} value={active}>
            {choices.map((choice, id) => (
              <option value={choice.id} key={id}>
                {choice.name}
              </option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
          </svg>
        </div>
    </div>
  )
}

export default FilterBar