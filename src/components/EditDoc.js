import React from 'react';
import CreateDoc from './CreateDoc'

  export default class EditDoc extends React.Component {
    constructor(props){
        super(props)
        this.state={
            currentDoc: null, 
        }
    }


    componentDidMount(){
    // fetch Document by ID to database and then set the state of current doc 
    // fetch request to server 
    // this.setState({

    // })
    fetch()

     }

    render(){
        return (
            <CreateDoc /> 

        )

    }


  }



