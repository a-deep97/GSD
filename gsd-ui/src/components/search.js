import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TopNavbar from './utilities/top-navbar';
import SearchContainer from './search-containers/search-container';

const SearchPage = () => {
    
    return (
        <div>
            <TopNavbar/>
            <SearchContainer/>       
        </div>
    );
};

export default SearchPage;