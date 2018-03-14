import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from './infinite-scroll';
import EndIndicator from './end-indicator';
import SpaceItem from './space-item';
import Loader from './loader';

const mapSpaceToProps = space => ({
    ...space,
    squareFootage: space.square_footage,
    dailyPrice: space.daily_price,
    hourlyPrice: space.hourly_price,
    viewsCount: space.views_count,
    image: space.primary_photo_css_url_small
});

export default function SpacesList({spaces, isLoading, isEnd, onLoadMore}) {
    return (
        <InfiniteScroll onLoadMore={onLoadMore}>
            {({onRef}) => (
                <div ref={onRef} className="space-list__list">
                    {spaces.map(space => (
                        <SpaceItem key={space.id} {...mapSpaceToProps(space)}/>
                    ))}

                    {isEnd && <EndIndicator/>}
                    {isLoading && <Loader/>}
                </div>
            )}
        </InfiniteScroll>
    );
}

SpacesList.defaultProps = {
    onLoadMore() {}
};

SpacesList.propTypes = {
    onLoadMore: PropTypes.func,
    isLoading: PropTypes.bool,
    isEnd: PropTypes.bool,
    spaces: PropTypes.array
};
