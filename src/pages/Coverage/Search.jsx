import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Install with: npm install react-icons

const Search = ({ serviceCenters, transferData }) => {
    const [searchText, setSearchText] = useState('');
    const [activeCoords, setActiveCoords] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = serviceCenters.find(d =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
        }
    };

    transferData(activeCoords);

    return (
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto px-4">
            <div className="flex items-center bg-[#f5f8fa] rounded-full overflow-hidden shadow-sm">
                <div className="px-4 text-gray-500">
                    <FiSearch className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search here"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="flex-grow py-3 px-2 bg-transparent focus:outline-none text-sm text-gray-700"
                />
                <button
                    type="submit"
                    className="bg-[#d4f055] hover:bg-[#c7e841] text-black font-semibold text-sm px-6 py-2 rounded-full transition-all"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default Search;
