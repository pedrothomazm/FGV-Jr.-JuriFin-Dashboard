import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const DropDownMenu = ({ items, buttonLabel, onChange }) => (
    <Menu as="div">
    <div>
      <Menu.Button className="justify-center items-center w-full h-16 inline-flex gap-x-1.5 rounded-3xl bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {buttonLabel}
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none absolute">
        <div className="py-1">
          {items.map((item) => (
            <Menu.Item key={item}>
              <Menu.Button
                className='text-gray-700 block px-4 py-2 text-sm w-full hover:bg-gray-100'
                onClick={() => onChange(item)}
              >
                {item}
              </Menu.Button>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default DropDownMenu;