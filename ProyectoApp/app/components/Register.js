import React from 'react';
import { TouchableOpacity,ActivityIndicator,ListView,Alert,Button,StyleSheet, Text, View,AppRegistry,TextInput } from 'react-native';
import { createStackNavigator} from 'react-navigation';
//Insert
class InputUsers extends React.Component{
  static navigationOptions={
    title:'Register User'
  }
    constructor(props){
        super(props);
        this.state={
            InputNombre:'',
            InputApellido:'',
            InputMail:'',
            InputCedula:'',
            InputDireccion:'',
            InputTelefono:'',
            InputNick:'',
            InputPass:'',
            isLoading: true,
            mailvalidate:false
        }
    }

    InsertDataToServer = () =>{
      
      if(this.state.mailvalidate==true){
        const {InputNombre} =this.state;
        const {InputApellido} =this.state;
        const {InputMail} =this.state;
        const {InputCedula} =this.state;
        const {InputDireccion} =this.state;
        const {InputTelefono} =this.state;
        const {InputNick} =this.state;
        const {InputPass} =this.state;

      
        fetch('http://10.92.108.146/ProyectoApp/insert.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            nombre_usuario:InputNombre,
            apellido_usuario:InputApellido,
            mail_usuario: InputMail,
            cedula_usuario:InputCedula,
            direccion_usuario:InputDireccion,
            telefono_usuario:InputTelefono,
            nick_usuario:InputNick,
            pass_usuario:InputPass
          })
        }).then((response)=>response.json())
        .then((responseJson)=>{
          Alert.alert(responseJson);
          this.props.navigation.navigate('Second');
        }).catch((error)=>{
          console.error(error);
        });
      }else{
        Alert.alert('Error','Asegurese de ingresar bien los datos');
      }
        
    }
  ViewUsersList=()=>{
    this.props.navigation.navigate('Second');
  }

  mailvalidate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({InputMail:text})
    return false;
      }
    else {
      this.setState({InputMail:text,mailvalidate:true})
      console.log("Email is Correct");
    }
    }
  render() {
    return (
      
      <View style={styles.Container}>
        <TextInput 
        placeholder="Name"
        onChangeText={InputNombre => this.setState({InputNombre})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle2}/>

        <TextInput 
        placeholder="Lastname"
        onChangeText={InputApellido => this.setState({InputApellido})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        placeholder="ID"
        onChangeText={InputCedula => this.setState({InputCedula})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={10}/>

        <TextInput 
        placeholder="Address"
        onChangeText={InputDireccion => this.setState({InputDireccion})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        placeholder="Mail"
        onChangeText={(text) => this.mailvalidate(text)} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        placeholder="Phone"
        onChangeText={InputTelefono=> this.setState({InputTelefono})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={10}/>

        <TextInput 
        placeholder="Username"
        onChangeText={InputNick => this.setState({InputNick})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={InputPass => this.setState({InputPass})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertDataToServer}>
          <Text style={styles.TextStyle}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.ViewUsersList}>
          <Text style={styles.TextStyle}>SHOW USERS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class ViewDataUser extends React.Component{
  static navigationOptions = {
    title:'View Users'
}

  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      
    }
  }
  componentDidMount(){
    return fetch('http://10.92.108.146/ProyectoApp/view.php')
            .then((response)=>response.json())
            .then((responseJson)=>{
              let ds =  new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2})
              this.setState({
                isLoading:false,
                dataSource: ds.cloneWithRows(responseJson)
              },function(){})
            }).catch((error)=>{
              console.error(error);
            })
  }
  reload = () => 
{
    //RELOAD COMPONENT
    this.componentDidMount();
};
  Action_Click(id_usuario,nombre_usuario,apellido_usuario,cedula_usuario,direccion_usuario,mail_usuario,telefono_usuario,nick_usuario,pass_usuario){
    this.props.navigation.navigate('Thire',{
      id_usuario:id_usuario,
      nombre_usuario:nombre_usuario,
      apellido_usuario:apellido_usuario,
      cedula_usuario:cedula_usuario,
      direccion_usuario:direccion_usuario,
      mail_usuario:mail_usuario,
      telefono_usuario:telefono_usuario,
      nick_usuario:nick_usuario,
      pass_usuario:pass_usuario
    })
    //Alert.alert(nombre_usuario,apellido_usuario);
  }

  ListViewItemSeparator=()=>{
    return(
      <View
      style = {{
        height:.5,
        width:'100%',
        backgroundColor:'#2196F3'
      }}
      />
    )
  }
  
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1,paddingTop:1}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={styles.ContainerDataUsers}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData)=>
            <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
                rowData.id_usuario,
                rowData.nombre_usuario,
                rowData.apellido_usuario,
                rowData.cedula_usuario,
                rowData.direccion_usuario,
                rowData.mail_usuario,
                rowData.telefono_usuario,
                rowData.nick_usuario,
                rowData.pass_usuario
              )}>
              {rowData.nombre_usuario}
            </Text>
          }
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
          <Text style={styles.TextStyle}>Reload List</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}
class UpdateAndDeleteUser extends React.Component{
  static navigationOptions={
    title:'Update And Delete Users'
  }
  constructor(props){
    super(props)
    this.state = {
      InputId:'',
      InputNombre:'',
      InputApellido:'',
      InputCedula:'',
      InputDireccion:'',
      InputMail:'',
      InputTelefono:'',
      InputNick:'',
      InputPass:'',
      mailvalidate:true
    }
  }
  componentDidMount(){
    this.setState({
      InputId: this.props.navigation.state.params.id_usuario,
      InputNombre: this.props.navigation.state.params.nombre_usuario,
      InputApellido: this.props.navigation.state.params.apellido_usuario,
      InputCedula: this.props.navigation.state.params.cedula_usuario,
      InputDireccion: this.props.navigation.state.params.direccion_usuario,
      InputMail: this.props.navigation.state.params.mail_usuario,
      InputTelefono: this.props.navigation.state.params.telefono_usuario,
      InputNick: this.props.navigation.state.params.nick_usuario,
      InputPass: this.props.navigation.state.params.pass_usuario,
    })
  }
  UpdateUsers=()=>{
    if(this.state.mailvalidate==true){
      fetch('http://10.92.108.146/ProyectoApp/update.php',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id_usuario:this.state.InputId,
          nombre_usuario:this.state.InputNombre,
          apellido_usuario:this.state.InputApellido,
          mail_usuario: this.state.InputMail,
          cedula_usuario:this.state.InputCedula,
          direccion_usuario:this.state.InputDireccion,
          telefono_usuario:this.state.InputTelefono,
          nick_usuario:this.state.InputNick,
          pass_usuario:this.state.InputPass
        })
      }).then((response)=>response.json())
      .then((responseJson)=> {
        Alert.alert(responseJson);
        this.props.navigation.navigate('Second');
      }).catch((error)=> {
        console.error(error);
      })
      this.props.navigation.navigate('Second')
    }else{
      Alert.alert('Error','Asegurese de ingresar bien los datos');
    }
    
  }
  DeleteUsers=()=>{
    fetch('http://10.92.108.146/ProyectoApp/delete.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id_usuario:this.state.InputId
          })
        }).then((response)=>response.json())
        .then((responseJson)=>{
          Alert.alert(responseJson);
          this.props.navigation.navigate('Second');
        }).catch((error)=>{
          console.error(error);
        })
        this.props.navigation.navigate('Second')
  }
  mailvalidate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({InputMail:text,mailvalidate:false})
    return false;
      }
    else {
      this.setState({InputMail:text,mailvalidate:true})
      console.log("Email is Correct");
    }
    }
 
  render(){
    return(
      <View style={styles.Container}>
      
        <TextInput
        value = {this.state.InputNombre} 
        placeholder="Nombre"
        onChangeText={InputNombre => this.setState({InputNombre})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle2}/>

        <TextInput 
        value = {this.state.InputApellido}
        placeholder="Apellido"
        onChangeText={InputApellido => this.setState({InputApellido})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        value = {this.state.InputCedula}
        placeholder="Cedula"
        onChangeText={InputCedula => this.setState({InputCedula})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={10}/>

        <TextInput 
        value = {this.state.InputDireccion}
        placeholder="Direccion"
        onChangeText={InputDireccion => this.setState({InputDireccion})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        value = {this.state.InputMail}
        placeholder="Mail"
        onChangeText={(text) => this.mailvalidate(text)}
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        />

        <TextInput 
        value = {this.state.InputTelefono}
        placeholder="Telefono"
        onChangeText={InputTelefono=>this.setState({InputTelefono})}
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
        keyboardType='numeric'
        maxLength={10}/>

        <TextInput 
        value = {this.state.InputNick}
        placeholder="Nombre de Usuario"
        onChangeText={InputNick => this.setState({InputNick})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>

        <TextInput 
        secureTextEntry={true}
        value = {this.state.InputPass}
        placeholder="Contrasena"
        onChangeText={InputPass => this.setState({InputPass})} 
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}/>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateUsers}>
          <Text style={styles.TextStyle}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle2} onPress={this.DeleteUsers}>
          <Text style={styles.TextStyle}>DELETE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default App=createStackNavigator({
  First:{screen:InputUsers},
  Second:{screen:ViewDataUser},
  Thire:{screen:UpdateAndDeleteUser}
  //<Button title='GUARDAR' onPress={this.InsertDataToServer} color='#2196F3'/>
        
});


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop:5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputStyle:{
    textAlign:'center',
    marginBottom:7,
    height:40,
    width:'85%',
    borderWidth:1,
    borderColor:'#2196F3',
    borderRadius:5
  },
  TextInputStyle2:{
    textAlign:'center',
    marginTop:20,
    marginBottom:7,
    height:40,
    width:'85%',
    borderWidth:1,
    borderColor:'#2196F3',
    borderRadius:5
  },
  TextStyle:{
    color:'#fff',
    textAlign:'center',

  },
  TouchableOpacityStyle:{
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width:'50%',
    backgroundColor:'#00BCD4',
    
  },
  
  TouchableOpacityStyle2:{
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width:'50%',
    backgroundColor:'#FF5722'
  },
  TouchableOpacityStyle3:{
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width:'100%',
    backgroundColor:'#00BCD4',
    
  },
  ContainerDataUsers:{
    flex:1,
    paddingTop:20,
    marginLeft:5,
    marginRight:5
  },
  rowViewContainer:{
    textAlign:'center',
    fontSize:20,
    paddingTop:10,
    paddingRight:10,
    paddingBottom:10,
    
  },
  tittle:{
    fontSize:30,
    marginTop:50,
    color:'white',
    //backgroundColor:'rgba{0,0,0,0}'
  },
});