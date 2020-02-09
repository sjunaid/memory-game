import React from 'react';

const Card = ({ id, isSelected, handleClick, imgUrl, didMatch }) => {
    const turned = isSelected || didMatch ? 'card flipped' : 'card';
    var imageStyle = {
        width: "100%",
        height: '100%',
        backgroundImage: `url(${imgUrl})`,
        display: isSelected || didMatch ? 'block': 'none',
        borderRadius: '10px'
      };

    return (
        <div className='flip' id={id} onClick={handleClick} >
            <div className={turned} >
                <img src={imgUrl} alt={turned} style={imageStyle}></img>
            </div>
        </div>
    );
};

export default Card;