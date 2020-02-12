import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Services extends Component {
    state={
        icons:[
            {
                icon:<FaCocktail/>,
                title :"Free cocktails",
                info:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum "
            },
            {
                icon:<FaHiking/>,
                title :"Endless hiking",
                info:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum "
            },
            {
                icon:<FaShuttleVan/>,
                title :"Free Shuttle",
                info:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum "
            },
            {
                icon:<FaBeer/>,
                title :"Strongest Beer",
                info:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum "
            }
        ]
    }
    render() {
        return (
            <section className='services'>
                <Title title='Services'/>
                <div className='services-center'>
                {this.state.icons.map((item,index) =>{
                        return (<article key={index} className='service'>
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>)
                })}
                </div>
                
            </section>
        )
    }
}
