import React from 'react'
import Roomsfilter from './Roomsfilter'
import RoomsList from './RoomsList'
import {RoomConsumer} from '../context'
import Loading from './Loading'

export default function RoomsContainer() {
    return (       
        <RoomConsumer>
            {value=>{
                const {sortedRooms,loading,rooms} = value
            if(loading){
                return(
                    <Loading/>
                )
            }
                return  (
                <>
                    <Roomsfilter rooms={rooms}/>
                    <RoomsList rooms={sortedRooms}/>
                 </>
                )
            }}
        </RoomConsumer>
       
        
    )
}
