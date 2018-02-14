import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';



export default class PollList extends React.Component {
    
 constructor(props) {
    super(props);

    this.state = {
      value: '02134',
      nearbyZipcodes: [],
      sortType: 'popular'
    };
   
  }
  
  handleZipUpdate = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  
  handleSortChange = (event,index,type) => this.setState({sortType: type})

  componentDidMount(){
   this.genNearbyZipcodes()
   /* let apiUrl = 'https://secure.geonames.org/findNearbyPostalCodesJSON?postalcode=02134&country=US&radius=3&username=cjlynch12'
    axios.get(apiUrl).then((res) => {
      if (this.unmounted) return;
      console.log(res.data.postalCodes);
      let zipResults = res.data.postalCodes.map((item) => {
          return (item.postalCode)
        })
      console.log(zipResults);
      this.setState({nearbyZipcodes: zipResults});
    })*/
  }


      
  genNearbyZipcodes = () => {
    
    let { value } = this.state
    let { radius } = this.state
    //let apiUrl = 'https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972'
    }
componentWillUnmount(){
    this.unmounted = true;
  }


  render() {
    return (
      <div>
        <div style={{margin: '0 auto', display: 'flex', alignItems: 'baseline', justifyContent: 'center', border: '2px solid black', width:'80%'}}>
          <p style={{marginRight: '10px'}}>Popular dishes near:</p>
          <TextField
            id="text-field-controlled"
            value={this.state.value}
            onChange={this.handleZipUpdate}
            maxLength="5"
            style={{

            }}
          />
          <FlatButton
            label="Search"
            onClick={this.genNearbyZipcodes}
          />
        </div>
        <div className="sort-container">
          <h3>Show</h3>
          <SelectField
            style={{boxShadow: 'none'}}
            value={this.state.sortType}
            onChange={this.handleSortChange}
          >
            <MenuItem style={{boxShadow: 'none'}} value="popular" primaryText="most popular" />
            <MenuItem style={{boxShadow: 'none'}} value="recent" primaryText="most recent" />
          </SelectField>
          <h3>dishes near:</h3>
        </div>
        <List>
          {this.state.nearbyZipcodes.map((item) => {
            return(
              <ListItem key={item.toString()} primaryText={item} />
            )}
          )}
        </List>
      </div>
    );
  }
}