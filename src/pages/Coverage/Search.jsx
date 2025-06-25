import React, { useState } from 'react';

const Search = ({ serviceCenters, transferData }) => {

    const [searchText, setSearchText] = useState('');
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = e => {
        e.preventDefault();
        console.log('entered');
        const district = serviceCenters.find(d => d.district.toLowerCase().includes(searchText.toLowerCase()));

        if (district) {
            console.log('entered into if block');
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
        console.log('exiting submit function');
    }
    console.log(searchText);
    transferData(activeCoords);

    return (
        <form
            onSubmit={handleSearch}
        >
            <div className='flex'>
                <input
                    className='input'
                    type="text"
                    placeholder='Enter District Name'
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    name="search" />
                <button className="btn">Search</button>
            </div>
        </form>
    );
};

export default Search;