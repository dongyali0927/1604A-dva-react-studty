import React , {Component} from 'react'
import {NavBar , Icon , Flex , Modal, InputItem , List , Button} from 'antd-mobile'
import './index.css'
import {connect} from 'dva'
function AddUser(props){
    let {conctrolMask,userid,username,moneybase,changeUserInfo,sure} = props;
    return  <List>
        <InputItem value={userid} onChange={(val)=>changeUserInfo(val,'userid')}>用户id</InputItem>
        <InputItem value={username} onChange={(val)=>changeUserInfo(val,'username')}>用户姓名</InputItem>
        <InputItem value={moneybase} onChange={(val)=>changeUserInfo(val,'moneybase')}>金钱基数</InputItem>
        <List.Item>
            <div style={{textAlign:'center'}}>
                <Button onClick={()=>sure()} style={{marginRight:'10px'}} type="primary" size="small" inline>确定</Button>
                <Button onClick={()=>conctrolMask(false)} type="warning" size="small" inline>取消</Button>
            </div>
            
        </List.Item>
    </List>
}
function EditUser(props){
    return <div>编辑</div>
}
const oTypes = {
    AddUser,EditUser
}

function ModalInner(props){
    let {type} = props;
    let Trans = oTypes[type];
    return <Trans {...props} />
}
class UserManger extends Component{
    state = {
        visible:false,
        type:'AddUser',
        userInfo:{
            userid:'',
            username:'',
            moneybase:''
        }
    }
    //添加用户的确定按钮
    sure = ()=>{
        this.props.addUser({...this.state.userInfo});
        this.conctrolMask(false);
    }
    // 表单的受控组件
    changeUserInfo = (value,type)=>{
        let {userInfo} = this.state;
        userInfo[type] = value;
        this.setState({userInfo});
    }
    // 控制蒙层是否显示
    conctrolMask = (visible)=>{
        this.setState({visible});
    }
    // 控制类型的变化
    controlTM = (type,visible)=>{
        this.setState({type,visible});
    }
    // 点击删除按钮
    delUser = ()=>{
        Modal.alert('警告','确定删除这一条吗？',[{
            text:'确定'
        },{
            text:'取消'
        }]);
    }
    render(){
        let {visible,type,userInfo} = this.state;
        let {userList} = this.props;
        // 构建一个传递对象
        let transfer = {
            ...userInfo,
            changeUserInfo:this.changeUserInfo,
            type,
            conctrolMask:this.conctrolMask,
            sure:this.sure
        }
        return <div>
            {/* 导航栏 */}
            <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.push('/main/home')}
            rightContent={[
                <Icon onClick={()=>this.controlTM('AddUser',true)} key="0" type="cross-circle" style={{ marginRight: '0px',transform:'rotate(45deg)' }} />,
            ]}
            >用户管理</NavBar>
            {/* 列表 */}
            {
                userList.map((item,key)=>{
                    return <Flex key={key} style={{textAlign:'center' , margin:'20px 0'}}>
                        <Flex.Item onClick={()=>this.controlTM('EditUser',true)}>编辑</Flex.Item>
                        <Flex.Item>{item.username}</Flex.Item>
                        <Flex.Item>{item.userid}</Flex.Item>
                        <Flex.Item onClick={()=>this.delUser()}>删除</Flex.Item>
                    </Flex>
                })
            }
            {/* 模态框 */}
            <Modal 
                visible={visible}
                transparent={true}
                onClose={()=>this.conctrolMask(false)}
            >
                <ModalInner {...transfer} />
            </Modal>
        </div>
    }
    componentDidMount(){
        window.aa = this;
        let {isInitLoad} = this.props;
        if(!isInitLoad){
            this.props.initUserList();
            this.props.changeInitLoad(true);
        }
    }
}
let mapState = (state)=>{
    let {userList,isInitLoad} = state.usermanger;
    return {userList,isInitLoad}
}
let mapDispatch = (dispatch)=>{
    return {
        initUserList(){
            dispatch({type:'usermanger/initUserListAsync'});
        },
        addUser(userInfo){
            dispatch({type:'usermanger/addUserAsync',...userInfo});
        },
        changeInitLoad(isInitLoad){
            dispatch({type:'usermanger/changeInitLoad',isInitLoad});
        }
    }
}
UserManger = connect(mapState,mapDispatch)(UserManger);
export default UserManger;