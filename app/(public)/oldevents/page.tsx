'use client'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

export default function OldEvents() {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    return (
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <Listbox.Button>{selectedPerson.name}</Listbox.Button>
        <Listbox.Options>
            {people.map((person) => (
            <Listbox.Option
                key={person.id}
                value={person}
                disabled={person.unavailable}
            >
                {person.name}
            </Listbox.Option>
            ))}
        </Listbox.Options>
            </Listbox>
            </div>
    )
}








// import React, { useState } from 'react';

// const options = ['2022', '2023', '2024'];

// export default function OldEvent() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const toggling = () => setIsOpen(!isOpen);

//     const onOptionClicked = (value) => () => {
//         setSelectedOption(value);
//         setIsOpen(false);
//     };


//     return (
//         <>
// <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//         <div className="relative inline-flex min-w-[200px] rounded-md border border-sky-700 bg-white">
//             <a
//             href="#"
//             onClick={toggling}
//             className="w-[100%] rounded-l-md px-4 py-2 text-sm text-gray-600 no-underline hover:bg-gray-50 hover:text-gray-700"
//             >
//             {selectedOption || `Veuillez sélectionner une année`}
//             </a>
//             <div className="relative">
//             <button
//                 type="button"
//                 className={`button-${isOpen ? 'danger' : 'success'}
//                 hover:text-gray-700' inline-flex h-full items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50`}
//                 onClick={toggling}
//             >
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={(isOpen ? 'content show' : 'content', 'h-4 w-4')}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19 9l-7 7-7-7"
//                 />
//                 </svg>
//             </button>
//             </div>
//             {isOpen && (
//             <div className="absolute top-6 right-0 z-10 mt-4 min-w-[200px] origin-top-right rounded-md border border-gray-100 bg-white shadow-lg">
//                 {options.map((option) => (
//                 <div>
//                     <a
//                     href="#"
//                     onClick={onOptionClicked(option)}
//                     key={Math.random()}
//                     className="block rounded-lg px-4 py-2 text-sm text-gray-500 no-underline hover:bg-gray-50 hover:text-gray-700"
//                     >
//                     {option}
//                     </a>
//                 </div>
//                 ))}
//             </div>
//             )}
//         </div>
//     </div> 
//         </>
//     )
// }