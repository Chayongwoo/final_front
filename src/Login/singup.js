import React, { Component } from "react";
import "./singup.css";

//마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class singup extends Component {
  state = {
    email: "",
  };

  //인증번호 받기 누르면 인증번호 input 에 포커스
  MessageFocus = () => {
    document.getElementById("findidinp").focus();
  };
  // 이메일 키 입력 함수
  EmailKeypress = (e) => {
    // console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  };

  //이메일 input 에서 입력값 저장
  EmaileinpChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //select 에서 변경한 값 이메일에 저장
  EmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
    if (e.target.value === "") {
      document.getElementById("emaininp").focus();
      this.setState({
        email: "",
      });
    }
  };

  render() {
    const LoginBtn = styled(Button)({
      color: "#2a9d8f",
      borderColor: "#2a9d8f",
    });
    return (
      <div id="singup">
        <div id="singupback">
          <div id="singupsidbox"></div>
          <div id="singuptextbox">
            <form id="singupback2">
              {/* 타이틀 */}
              <div id="singuptit">회원가입</div>

              {/* 이름 */}
              <div className="loginbox">
                <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                <input
                  type="text"
                  className="logininput"
                  placeholder="이름"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 아이디 */}
              <div className="loginbox">
                <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                <input
                  type="text"
                  className="logininput"
                  placeholder="아이디"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 비밀번호  */}
              <div className="loginbox">
                <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                <input
                  type="password"
                  className="logininput"
                  placeholder="비밀번호"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 비밀번호 확인 */}
              <div className="loginbox">
                <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                <input
                  type="password"
                  className="logininput"
                  placeholder="비밀번호 확인"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 이메일 */}
              <div className="signupback">
                <div className="signupboxmail">
                  <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                  <input
                    type="text"
                    className="logininput"
                    placeholder="이메일"
                  ></input>
                  <div className="logini"></div>
                </div>
                <div>@</div>
                <div className="signupboxmail">
                  <select
                    className="signupemail"
                    name="emailselect"
                    onChange={this.EmailChange.bind(this)}
                    defaultValue={""}
                  >
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="nate.com">nate.com</option>
                    <option value="">직접입력</option>
                  </select>
                  <input
                    type="text"
                    className="logininput"
                    id="emaininp"
                    name="email"
                    value={this.state.email}
                    onKeyPress={this.EmailKeypress.bind(this)}
                    onChange={this.EmaileinpChange.bind(this)}
                  ></input>
                  <div className="logini"></div>
                </div>
              </div>

              {/* 주소 */}
              <div className="signupback">
                <div id="findidtelbox">
                  <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                  <input
                    type="text"
                    className="logininput"
                    placeholder="주소"
                  ></input>
                  <div className="logini"></div>
                </div>

                <div>
                  <LoginBtn variant="outlined" className="findidbtns">
                    주소 검색
                  </LoginBtn>
                </div>
              </div>

              {/* 상세주소 */}
              <div className="loginbox">
                <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                <input
                  type="text"
                  className="logininput"
                  placeholder="상세주소"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 휴대폰 번호 박스 */}
              <div className="signupback">
                <div id="findidtelbox">
                  <div className="loginlabel">여기에 필요한 검증 문구 삽입</div>
                  <input
                    type="text"
                    className="logininput"
                    placeholder="휴대폰 번호"
                  ></input>
                  <div className="logini"></div>
                </div>

                <div>
                  <LoginBtn
                    variant="outlined"
                    className="findidbtns"
                    onClick={this.MessageFocus.bind(this)}
                  >
                    인증번호 받기
                  </LoginBtn>
                </div>
              </div>

              {/* 경고 문구 출력 창  */}
              <div className="loginlabel" id="signupwarning">
                여기다가 필요한 검증 문구 삽임
              </div>

              {/* 인증번호 입력 박스  */}
              <div id="findidbox">
                <input
                  type="text"
                  placeholder="인증번호"
                  id="findidinp"
                ></input>
              </div>

              {/* 버튼박스 */}
              <div id="signupbtnbox">
                <LoginBtn
                  onClick={this.props.SingUpClose}
                  variant="outlined"
                  className="findidbtnm"
                  id="signupbtn"
                >
                  확인
                </LoginBtn>
                <LoginBtn
                  onClick={this.props.SingUpClose}
                  variant="outlined"
                  className="findidbtnm"
                >
                  닫기
                </LoginBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default singup;