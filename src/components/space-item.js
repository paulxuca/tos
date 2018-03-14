import React from 'react';
import PropTypes from 'prop-types';
import {numerical} from '../lib/formatters';

const Eye = () => (
    <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
);

const PricingType = ({type, value}) => {
    if (!value) {
        return null;
    }

    return (
        <div className="space-list-item__pricing-item">
            <p className="space-list-item__pricing-item-price">
                <span>$</span>
                {numerical(value)}
            </p>
            <p className="space-list-item__pricing-item-type">{type}</p>
        </div>
    );
};

PricingType.propTypes = {
    value: PropTypes.any,
    type: PropTypes.string
};

export default function SpaceItem(props) {
    const {
        name = 'Listing',
        squareFootage,
        hourlyPrice,
        dailyPrice,
        viewsCount,
        image
    } = props;

    return (
        <div className="space-list-item__container">
            <div className="space-list-item__image" style={{backgroundImage: `url(${image})`}}>
                <div className="space-list-item__views-section">
                    <Eye/>
                    <p>{numerical(viewsCount)}</p>
                </div>
            </div>

            <div className="space-list-item__content">
                <h4 className="space-list-item__name">{name}</h4>

                <div>
                    {numerical(squareFootage)} sq ft.
                </div>
                
                <div className="space-list-item__pricing-section">
                    <PricingType type="Daily" value={dailyPrice}/>
                    <PricingType type="Hourly" value={hourlyPrice}/>
                </div>
            </div>
        </div>
    );
}

SpaceItem.propTypes = {
    squareFootage: PropTypes.number,
    hourlyPrice: PropTypes.number,
    viewsCount: PropTypes.number,
    dailyPrice: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string
};
