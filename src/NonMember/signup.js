import React,{Component} from'react';
import MyPageMenu from '../MyPage/mypagemenu';
import {Link} from 'react-router-dom';


class SignUp extends Component{
    render(){
        return(
            <div>
                <br></br>
                <MyPageMenu/>
                <h2>수강신청 현황입니다</h2>

                <Link to="/">
                    <button>홈으로</button>
                </Link>
                
            </div>
        )
    }
}
export default SignUp;