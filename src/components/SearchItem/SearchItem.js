import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'SEARCH_ITEM';

const SearchItem = ({ item, index, moveSearch, handleOnClick, removeSearch }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover(draggedItem) {
            if (draggedItem.index !== index) {
                moveSearch(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    
    return (
        <div
            ref={(node) => ref(drop(node))}
            className="recent-searches__item"
            onClick={() => handleOnClick(item)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleOnClick(item);
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Search weather for ${item.name} at ${item.temp} degrees`}>
            <span className="recent-searches__remove" onClick={(e) => { e.stopPropagation(); removeSearch(index); }}>
                &times;
            </span>
            {item.name} - {item.temp}°C
        </div>
    );
};

export default SearchItem;