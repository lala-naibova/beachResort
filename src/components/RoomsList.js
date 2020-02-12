import React from 'react'
import Room from './Room'

export default function RoomsList({rooms}) {
    if(rooms.length===0){
        return(
            <div className='empty-search'>
                <h3>unfornunately no rooms match your search parameters</h3>
            </div>
        )
    }
    return (
        <section className='roomslist'> 
        <div className='roomslist-center'>
                {rooms.map((room,inx)=>{
                    return <Room key={inx} room={room}/>
                })}
        </div>
            
        </section>
    )
}
