import React,{Component} from 'react';
import Todos from './Components/Todos';
import Header from './Components/layout/Header'
import AddTodo from './Components/AddTodo'
//import uuid from 'uuid'
import axios from 'axios';

class App extends Component {
  state = {
    todos : []
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res =>this.setState({todos : res.data}));
  }
  //Toggle
  markComplete = (id) =>{
    this.setState({ todos: this.state.todos.map(todo =>{
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
}

//Delete
  delTodo = (id) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then( res =>this.setState({ todos: [...this.state.todos.filter(todo => todo.id !==id )]}) );
  }

  //Add todo
  addTodo =(title)=>{
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed : false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    ;
  }
  
  render(){
    //console.log(this.state.todos);
    return (
      <div className="App">
        
        <div className = "container">
        <Header/>
        <AddTodo addTodo = {this.addTodo}/>
        <Todos todos = {this.state.todos}
        markComplete = {this.markComplete}
        delTodo = {this.delTodo}/>
        </div>
        
      </div>
    );

  }
}

export default App;
