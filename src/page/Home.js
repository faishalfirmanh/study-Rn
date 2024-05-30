import { View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    FlatList,
    Button,
    Image,
    
 } from 'react-native'
import React, {useState, useEffect,useContext} from 'react'
import { getStorgaeKey } from '../component/HelperFunction';
import { css_global, height_device, width_device } from '../style/StyleGlobal';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import url from '../endpoint/Endpoint';
import { ReqApiStudy } from '../endpoint/RequestApi';
import { custom_toast } from '../component/ToastCustom';
import ButtonCustom from '../component/ButtonCustom';
import ComponentLoading from '../component/ComponentLoading';

import ModalForm from '../component/ModalForm';

export default function Home({navigation}) {

    const global_state = useContext(AppContext);
    //const token_ = global_state.userLogin.jwt_token ?  global_state.userLogin.jwt_token :  global_state.userLogin.data_api.jwt_token
    ///global_state.userLogin.data_api.jwt_token;
   

    const [isLoading, setLoading] = useState(true);
    const [tot_data, setCountData] = useState(0);
    const [employee, setEmployee] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [maxPage, setMaxPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    

    const handleOpenModal = (item) => {
      setModalVisible(true);
      setSelectedItem(item)
    };
  
    const handleCloseModal = () => {
      setSelectedItem(null);
      setModalVisible(false);
    };
  
    const handleSubmitForm = (values) => {
      const url_ = `${url.end_point}${url.study_saved}`;
      const param_page =   selectedItem ? {id : values.id,name : values.name,email : values.email} : {name : values.name,email : values.email};
      console.log(values)
      setLoading(true)
        ReqApiStudy(url_,param_page)
        .then(function(res){
          custom_toast("sukses saved")
          RequestGetAll(1)
        })
        .catch(function(err){
          custom_toast("gagal saved")
            console.log(err)
        })
        .finally(function(){
            setLoading(false);
            setCountData(10)
        })
     
    };
  
  
    const RequestGetAll = (pages) =>{
      console.log("------]] ---",pages)
        setLoading(true)
        const url_ = `${url.end_point}${url.study_get_all}`;
        const page_validation = pages > maxPage ? maxPage : pages;
        const param_page = {
            limit : 10,
            page : pages,
        }
        ReqApiStudy(url_,param_page)
        .then(function(res){
          setPage(res.data.data.current_page)
          setMaxPage(res.data.data.last_page);
            if (res.data.data.total > 0 && res.data.data.data.length > 0) {
                setCountData(10)
                setEmployee(res.data.data.data)
                setHasMore(res.data.data.data.length > 0);
                console.log("data page")
            }else{
              setCountData(0)
              console.log("***************")
              console.log(res.data.data.data.length)
              console.log(res.data.data.total)
              console.log("data page tidak ada")
            }
        })
        .catch(function(err){
             setCountData(0)
            console.log(err)
        })
        .finally(function(){
            setLoading(false);
        })

    }
  
    useEffect(()=>{  
       RequestGetAll(page)
    },[page])


    const handleLoadMore = () => {
        console.log('^^^^^^^^^');
        console.log("page ",page);
        console.log('^^^^^^^^^');
        if (hasMore) { 
           if (page + 1 > maxPage) {
             setPage(maxPage);
             console.log("stop ");
           } else{
             setPage((prevPage) => prevPage + 1);
             console.log("next ");
           }
        }
      
    };


    const renderFooter = () => {
        if (!isLoading) return null;
        return (
          <View style={{marginTop:-30 }}>
            <ComponentLoading/>
          </View>
        );
    };

    const deleteEmploye =  (idNya) =>{
        setLoading(true);
        const url_delete = `${url.end_point}${url.study_delete}`;
        const param = {id : idNya }
        ReqApiStudy(url_delete, param)
        .then((suk)=>{
          RequestGetAll(1)
        })
        .catch((err)=>{
           if(json_error.status == 400){
             console.log("error deleted -",err)
            }else{
              custom_toast("gagal hapus")
            }
        })
        .finally(()=>{
          setLoading(false)
        })
  
    }

    const itemRednerList = ({item, index}) =>{
       
        return(
          <View style={{height:(15 / 100) * height_device,left:10,top:10,marginBottom:10}}>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth:3,
              }}
            />
            <Text style={{fontSize:15,color:"black"}}>Name:  {item.name}</Text>
            <Text style={{color:"black"}}>Email : {item.email} </Text>
            <Text style={{fontSize:12,fontWeight:"bold",color:"red"}}>{item.id}</Text>
            <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity 
                onPress={ 
                  () => handleOpenModal({ id: item.id, name: item.name, email:item.email })
                }
                style={{backgroundColor: "white",borderStyle:"solid",borderWidth:2,
                     borderColor:"black",width:(10 / 100) * width_device,
                    height:(10 / 100) * width_device,top:(2 / 100) * width_device,left:10, borderRadius:8,...css_global.centerItemButton}}>
                    <Image 
                      source={require('../img/pencil2.png')} 
                      resizeMode="contain"
                      style={{
                          backgroundColor:"white",
                          width:(8 / 100) * width_device,
                          height:(8 / 100) * width_device,
                      }}
                    />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={(e)=>deleteEmploye(item.id)}
                style={{width:(10 / 100) * width_device,height:(10 / 100) * width_device,top:(2 / 100) * width_device,left:20, borderRadius:8}}>
                          <Image 
                            source={require('../img/trash.png')} 
                            resizeMode="contain"
                            style={{
                                width:(10 / 100) * width_device,
                                height:(10 / 100) * width_device,
                            }}
                          />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    


      const createNew = ()=>{
        setModalVisible(true);
      }

    
  return (
    <View>
        <View style={{flexDirection:'row',marginTop:20}}>
            <ButtonCustom 
                mLeft={12}
                mTop={5}
                f_size={13}
                widthCusBtn={90}
                heightBtnPercentDevice={5}
                text={"Create"} 
                isSuccess={true} 
                btnOnSubmitProps={() => createNew()} />

            <ButtonCustom 
                mLeft={12}
                mTop={5}
                f_size={13}
                widthCusBtn={90}
                heightBtnPercentDevice={5}
                text={"refresh"} 
                isSuccess={true} 
                btnOnSubmitProps={() => RequestGetAll(0)} />
        </View>
     <View style={style.wrapList}>
            {isLoading ? 
              <View style={{marginTop:30,marginLeft:"20%"}}>
                 <ComponentLoading/>
              </View> : 
              (
                tot_data < 1 ? 
                 (
                  <View style={{marginLeft:120,marginTop:40,width:300, height:100}}>
                       <Text style={{color:'black',fontSize:20,color:"red", fontWeight:"bold"}}>Kosong tidak ada</Text>
                  </View>
                 
                 ) :
                 <View style={style.viewList}>
                    <FlatList
                      data={employee}
                      renderItem={itemRednerList}
                      keyExtractor={item => `${item.id}`}
                      onEndReached={handleLoadMore}
                      onEndReachedThreshold={0.5}
                      ListFooterComponent={renderFooter}
                    />
                    
                 </View>

              )}
              
      </View>
        
      <ModalForm
       initialValues={selectedItem || { name: '', email: '' }}
       visible={modalVisible}
       onClose={handleCloseModal}
       onSubmit={handleSubmitForm}
      />
    </View>
  )
}

/** nama barang |satuan |harga */
const style =  StyleSheet.create({
    wrapList :{
        flex:1,
        marginTop:(2 / 100) * height_device,
        marginBottom:(4 / 100) *  height_device,
        height:(40 / 100) * height_device,
        width:'80%',
      
    },
    viewList:{
      height:(75 / 100) *  height_device,
      backgroundColor:'#fbf2c6',
      alignContent:'center',
      borderRadius:6,
      left:(5 / 100) * width_device,
      width:(87/ 100) *  width_device,
     
    }
})