import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

const getUnique =(item, type)=>{
    return [...new Set(item.map(room=>room[type]))];
}
export default function Roomsfilter({rooms}) {
    const context = useContext(RoomContext);

    const { 
        handleChange, 
        type, 
        capacity, 
        price, 
        minPrice, 
        maxPrice, 
        minSize, 
        maxSize,
        breakfast,
        pets } = context;
        //
        let types = getUnique(rooms,'type');
        types = ['all', ...types];
        types= types.map( (item,indx) =>{
            return <option key={indx} value={item}>{item}</option>
        })
        //
        let capacities = getUnique(rooms, 'capacity');
        capacities = [...capacities];
        capacities = capacities.map((item,id)=>{
            return <option key={id} value={item}>{item}</option>
        })
    return (
        <section className='filter-container'>
            <Title title='search rooms'/>
            <form className='filter-form'>
                {/* select type*/}
                <div className='form-group'>
                    <label htmlFor='type'>room type</label>
                    <select name='type' id='type' value={type}
                    onChange={handleChange} className='form-control'>
                        {types}
                    </select>
                </div>
                {/* end of select type */}
                 {/* select guest*/}
                 <div className='form-group'>
                    <label htmlFor='capacity'>Guests</label>
                    <select name='capacity' 
                    id='capacity' 
                    value={capacity}
                    onChange={handleChange} 
                    className='form-control'>
                        {capacities}
                    </select>
                </div>
                {/* end of select guest */}
                {/* select price*/}
                <div className='form-group'>
                    <label htmlFor='price'>room price ${price}</label>
                    <input type='range' name='price' 
                    id='price' 
                    max={maxPrice}
                    min={minPrice}
                    value={price}
                    onChange={handleChange} 
                    className='form-control'>
                    </input>
                </div>
                {/* end of select price */}
                {/* select size*/}
                <div className='form-group'>
                    <label htmlFor='size'>size</label>
                    <div className='size-inputs'>
                        <input type='number' 
                        id='size' 
                        name='minSize'
                        value={minSize} className='size-input' onChange={handleChange}></input>
                        <input type='number' 
                        id='size'
                        name='maxSize'
                        value={maxSize} className='size-input' onChange={handleChange}></input>
                    </div>
                </div>
                {/* end of select size */}
                {/* extras */}
                <div className='form-group'>
                    <div className='single-extra'>
                    <input type='checkbox' name='breakfast' id='breakfast' 
                    checked={breakfast}
                    onChange={handleChange}/>
                    <label htmlFor='breakfast'>breakfast</label>
                    </div>
                    <div className='single-extra'>
                    <input type='checkbox' name='pets' id='pets'
                    checked={pets}
                    onChange={handleChange}/>
                    <label htmlFor='pets'>pets</label>
                    </div>
                </div>
                {/* end of extrs */}
            </form>
        </section>
    )
}
