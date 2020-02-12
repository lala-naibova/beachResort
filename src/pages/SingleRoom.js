import React, { Component } from 'react'
import {RoomContext} from '../context'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import Styledhero from '../components/Styledhero'

export default class SingleRoom extends Component {
    static contextType = RoomContext;
    constructor(props){
        super(props);
        this.state={
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }
    componentDidMount(){}
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        console.log(room)
        if(!room){
            return(
                <div className='error'>
                    <h3>no such room has found</h3>
                    <Link to='/rooms' className='btn-primary'>Back to rooms</Link>
                </div>
            )
        }
        const {name, description, capacity, size, breakfast,extras, pets,price, images} = room
        const [mainImg, ...otherRooms] = images
        return (

                <>
                <Styledhero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className='btn-primary'>
                            back to rooms
                        </Link>
                    </Banner>
                </Styledhero>
                <section className='single-room'>
                    <div className='single-room-images'>
                    {otherRooms.map((img,index)=>{
                    return  <img key={index} src={img} alt='img'></img>} )}
                    </div> 
                    <div className='single-room-info'>
                        <article className='desc'>
                            <h3>detail</h3>
                            <p>{description}</p>
                        </article>
                        <article className='info'>
                            <h3>Info</h3>
                            <h6>price : ${price}</h6>
                            <h6>Size : {size} SQFT</h6>
                            <h6>max capacity : {capacity} {capacity>1?"people":"person"}</h6>
                            <h6>{pets?"pets allowed":"no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                            <h6></h6>
                        </article>
                    </div>
                </section>
                <section className='room-extras'>
                    <h6>extras</h6>
                    <ul className='extras'>
                        {extras.map((extra,id)=>{
                            return  <li key={id}>- {extra}</li>
                        })}
                    </ul>
                </section>
                </>
        )
    }
}
