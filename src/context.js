import React, { Component} from 'react'
import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms :[],
        loading : true,
        type:'all',
        capacity:0,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    }
    formatData=(items)=>{
        let filteredItems = items.map(item=>{
            let id = item.sys.id;
            let images = item.fields.images.map(image=>
                image.fields.file.url)
            let room = {...item.fields, images, id};
            return room;
        })
        return filteredItems;
    }
    getData = async ()=>{
        try{
            let responce = await Client.getEntries({
                content_type:"beachResortRoom"
            })
        let rooms = this.formatData(responce.items);
        let featuredRooms = rooms.filter(item=>item.featured === true);
        let maxPrice= Math.max(...rooms.map(room=>room.price));
        let maxSize = Math.max(...rooms.map(room=>room.size));
        this.setState({rooms, 
            featuredRooms, 
            sortedRooms:rooms, 
            loading : false,    
            price:maxPrice,
            maxPrice,
            maxSize
        });
        }catch(error){
            console.log(error)
        }
    }
    componentDidMount(){
        this.getData()
    }
    getRoom = (slug)=>{
        let temprooms = [...this.state.rooms]
        let room = temprooms.find(room=> room.slug===slug);
        return room;
    }
    handleChange = (event)=>{
        const target = event.target;
        const type = target.type;
        const name = target.name;
        const value = type==='checkbox'? target.checked : target.value;
        this.setState({[name]:value}, this.filterRooms);
    }
    filterRooms =()=>{
        let{
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state;
        //all rooms
        let temp = [...rooms];
        //transform the capacity
        capacity = parseInt(capacity);
        //trasnfrom the price
        price= parseInt(price);
        //filter capacity
        if(capacity !== 1){
            temp = temp.filter(elem=>elem.capacity >= capacity)
        }
        //filter type
        if(type !== 'all'){
            temp = temp.filter(elem=>elem.type===type)    
        }
        //filter breakfast
        if(breakfast){
            temp = temp.filter(elem=>elem.breakfast===breakfast)
        }
        //filter pets
        if(pets){
            temp = temp.filter(elem=>elem.pets===pets)
        }
        //filter price
        temp = temp.filter(elem=>elem.price <= price)
        //filter size
        temp= temp.filter(elem=> elem.size >= minSize && elem.size <= maxSize)
        //change state
        this.setState({sortedRooms:temp})
    }
    render() {
        return (
            <RoomContext.Provider value={{...this.state, 
            getRoom: this.getRoom, 
            handleChange:this.handleChange, 
            filterRooms:this.filterRooms}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}
const RoomConsumer = RoomContext.Consumer;

export{RoomContext, RoomConsumer, RoomProvider}
