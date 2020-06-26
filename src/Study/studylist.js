import React, { useEffect } from "react";
import "./studylist.scss";
import {
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  FormControl,
  TextField,
  Button,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Select,
  Slider,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  ExpansionPanelActions,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    marginLeft: "25%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    maxWidth: "100%",
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

const avatarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: theme.spacing(8),
  },
}));

const marks = [
  {
    value: 0,
    label: "하",
  },
  {
    value: 50,
    label: "중",
  },
  {
    value: 100,
    label: "상",
  },
];

function getFormatDate(date) {
  var year = date.getFullYear(); // yyyy
  var month = 1 + date.getMonth(); // M
  month = month >= 10 ? month : "0" + month; // month 두자리로 저장
  var day = date.getDate(); // d
  day = day >= 10 ? day : "0" + day; // day 두자리로 저장
  return year + "-" + month + "-" + day; // '-' 추가하여 yyyy-mm-dd 형태 생성
}

function valuetext() {
  return marks.label;
}

export default function StudyList(props) {
  const classes = useStyles();
  const avatarclasses = avatarStyles();

  const [field, setField] = React.useState([]);

  const [listdata, setListData] = React.useState([]);
  const [profilelist, setProfileList] = React.useState([]);
  const [countlist, setCountList] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [searchSubject, setSearchSubject] = React.useState("");
  const [searchLevel, setSearchLevel] = React.useState("");
  const [searchType, setSearchType] = React.useState("");
  const [searchStartdate, setSearchStartdate] = React.useState("");
  const [searchEnddate, setSearchEnddate] = React.useState("");
  const [searchGatherday, setSearchGetherday] = React.useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [searchGatherdayName, setSearchGetherdayName] = React.useState([]);
  const [searchAddress, setSearchAddress] = React.useState("");
  const [searchDetailAddr, setSearchDetailAddr] = React.useState("");
  // const [expanded, setExpanded] = React.useState("panel");

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
    console.log(`searchfilter:${searchFilter}`);
  };
  const handleSearchSubjectChange = (event) => {
    setSearchSubject(event.target.value);
    setField("study_subject");
    console.log(`searchsubject:${searchSubject}`);
    console.log("검색어:" + field);
  };
  const handleSearchLevelChange = (event, newValue) => {
    setSearchLevel(newValue);
    setField("study_level");
    console.log(`searchlevel:${searchLevel}`);
    console.log("검색어:" + field);
  };
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setField("study_type");
    console.log(`searchtype:${searchType}`);
    console.log("검색어:" + field);
  };
  const handleSearchStartdateChange = (date) => {
    if (new Date() > date) {
      alert("현재 날짜보다 이전 날짜는 선택 불가능합니다");
      return false;
    }
    if (searchEnddate < date) {
      alert("시작 날짜는 끝 날짜 이후를 선택 불가능합니다");
      return false;
    }
    setSearchStartdate(getFormatDate(date));
    setField("study_startdate");
    console.log("시작날짜=" + searchStartdate);
    console.log("검색어:" + field);
  };
  const handleSearchEnddateChange = (date) => {
    if (new Date() > date) {
      alert("현재 날짜보다 이전 날짜는 선택 불가능합니다");
      return false;
    }
    if (searchStartdate > date) {
      alert("시작 날짜보다 이전 날짜는 선택 불가능합니다");
      return false;
    }
    setSearchEnddate(getFormatDate(date));
    setField("study_enddate");
    console.log("끝날짜=" + searchEnddate);
    console.log("검색어:" + field);
  };
  const handleSearchGatherdayChange = (event) => {
    setSearchGetherday({
      ...searchGatherday,
      [event.target.name]: event.target.checked,
    });
    setField("study_gatherday");

    console.log("검색어:" + field);

    if (event.target.checked) {
      setSearchGetherdayName(searchGatherdayName.concat(event.target.value));
    } else {
      setSearchGetherdayName(
        searchGatherdayName.filter((gather) => gather !== event.target.value)
      );
    }

    console.log(searchGatherdayName);
  };
  const handleSearchAddressChange = (event) => {
    setSearchAddress(event.target.value);
    setField("study_address");
    console.log(`searchaddr:${searchAddress}`);
    console.log("검색어:" + field);
  };
  const handleSearchDetailAddrChange = (event) => {
    setSearchDetailAddr(event.target.value);
    setField("study_detailaddress");
    console.log(`searchdetailaddr:${searchDetailAddr}`);
    console.log("검색어:" + field);
  };
  // const handlePanelChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };
  const handleSearchClick = (event) => {
    console.log(listdata);
    console.log(field);
    list();
  };
  const list = () => {
    const data = new FormData();
    // for (let i = 0; i < 10; i++) {
    //   data.append(`textfield[${i}]`);
    // }
    console.log(searchStartdate);
    data.append("textfield", searchFilter);
    data.append("searchSubject", searchSubject);
    data.append("searchLevel", searchLevel);
    data.append("searchType", searchType);
    data.append("searchStartdate", searchStartdate);
    data.append("searchEnddate", searchEnddate);
    data.append("searchGatherday", searchGatherday);
    data.append("searchAddress", searchAddress);
    data.append("searchDetailAddr", searchDetailAddr);

    const url = "http://localhost:8000/project/study/list";
    Axios.post(url, data)
      .then((res) => {
        setListData(res.data.listdata);
        setProfileList(res.data.profilelist);
        setCountList(res.data.countlist);
        console.log(res.data.listdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    list();
  }, []);

  const click = () => {
    setSearchStartdate(getFormatDate(new Date()));
    setSearchEnddate(getFormatDate(new Date()));
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ float: "right", marginRight: "10%" }}>
        <Button variant="contained" color="primary" href="./addstudy">
          스터디 만들기
        </Button>
        &nbsp;
        <Button variant="outlined" color="primary" href="/mystudymain">
          마이 스터디
        </Button>
      </div>

      <br />
      <br />
      <div className={classes.root}>
        <ExpansionPanel
        // expanded={expanded === "panel"}
        // onChange={handlePanelChange("panel")}
        >
          <ExpansionPanelSummary
            onClick={() => click()}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              className={classes.heading}
              style={{ fontSize: "20pt", fontWeight: "bold" }}
            >
              검색 카테고리
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                native
                value={searchFilter}
                onChange={handleSearchFilterChange}
                name="textfield"
                inputProps={{
                  name: "searchFilter",
                  id: "outlined-age-native-simple",
                }}
              >
                <option value={""}>전체</option>
                <option value={"study_subject"}>제목</option>
                <option value={"study_content"}>내용</option>
                <option value={"study_writer"}>작성자</option>
              </Select>
            </FormControl>
            &nbsp;&nbsp;
            <TextField
              id="outlined-read-only-input"
              label="제목"
              variant="outlined"
              name="searchSubject"
              onChange={handleSearchSubjectChange}
              required
              style={{ margin: "8px", width: "500px" }}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <div style={{ width: "200px", margin: "8px" }}>
              <Typography id="discrete-slider-restrict" gutterBottom>
                난이도
              </Typography>
              <Slider
                name="searchLevel"
                onChange={handleSearchLevelChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="off"
                step={null}
                marks={marks}
              />
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <FormControl
              className={(classes.root, classes.formControl)}
              required
            >
              <InputLabel id="type-select-required-label">
                스터디 분야
              </InputLabel>
              <Select
                labelId="type-select-required-label"
                id="select-required"
                value={searchType}
                onChange={handleSearchTypeChange}
                className={classes.selectEmpty}
                style={{
                  width: "200px",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Java"}>Java</MenuItem>
                <MenuItem value={"Spring"}>Spring</MenuItem>
                <MenuItem value={"React"}>React</MenuItem>
                <MenuItem value={"기타"}>기타</MenuItem>
              </Select>
            </FormControl>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="시작날짜"
                value={searchStartdate}
                onChange={handleSearchStartdateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="끝날짜"
                value={searchEnddate}
                onChange={handleSearchEnddateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Monday}
                    onChange={handleSearchGatherdayChange}
                    name="Monday"
                    color="primary"
                  />
                }
                label="월요일"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Tuesday}
                    onChange={handleSearchGatherdayChange}
                    name="Tuesday"
                    color="primary"
                  />
                }
                label="화요일"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Wednesday}
                    onChange={handleSearchGatherdayChange}
                    name="Wednesday"
                    color="primary"
                  />
                }
                label="수요일"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Thursday}
                    onChange={handleSearchGatherdayChange}
                    name="Thursday"
                    color="primary"
                  />
                }
                label="목요일"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Friday}
                    onChange={handleSearchGatherdayChange}
                    name="Friday"
                    color="primary"
                  />
                }
                label="금요일"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Saturday}
                    onChange={handleSearchGatherdayChange}
                    name="Saturday"
                    color="primary"
                  />
                }
                label="토요일"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchGatherday.Sunday}
                    onChange={handleSearchGatherdayChange}
                    name="Sunday"
                    color="primary"
                  />
                }
                label="일요일"
              />
            </FormGroup>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={searchAddress}
                onChange={handleSearchAddressChange}
                inputProps={{
                  name: "searchAddress",
                  id: "outlined-age-native-simple",
                }}
              >
                <option value={"강원도"}>강원도</option>
                <option value={"경기도"}>경기도</option>
                <option value={"경상남도"}>경상남도</option>
                <option value={"경상북도"}>경상북도</option>
                <option value={"광주광역시"}>광주광역시</option>
                <option value={"대구광역시"}>대구광역시</option>
                <option value={"대전광역시"}>대전광역시</option>
                <option value={"부산광역시"}>부산광역시</option>
                <option value={"서울특별시"}>서울특별시</option>
                <option value={"세종특별자치시"}>세종특별자치시</option>
                <option value={"울산광역시"}>울산광역시</option>
                <option value={"인천광역시"}>인천광역시</option>
                <option value={"전라남도"}>전라남도</option>
                <option value={"전라북도"}>전라북도</option>
                <option value={"제주특별자치도"}>제주특별자치도</option>
                <option value={"충청남도"}>충청남도</option>
                <option value={"충청북도"}>충청북도</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={searchDetailAddr}
                onChange={handleSearchDetailAddrChange}
                inputProps={{
                  name: "searchAddress",
                  id: "outlined-age-native-simple",
                }}
              >
                <option value={"강원도"}>강원도</option>
                <option value={"경기도"}>경기도</option>
                <option value={"경상남도"}>경상남도</option>
                <option value={"경상북도"}>경상북도</option>
                <option value={"광주광역시"}>광주광역시</option>
                <option value={"대구광역시"}>대구광역시</option>
                <option value={"대전광역시"}>대전광역시</option>
                <option value={"부산광역시"}>부산광역시</option>
                <option value={"서울특별시"}>서울특별시</option>
                <option value={"세종특별자치시"}>세종특별자치시</option>
                <option value={"울산광역시"}>울산광역시</option>
                <option value={"인천광역시"}>인천광역시</option>
                <option value={"전라남도"}>전라남도</option>
                <option value={"전라북도"}>전라북도</option>
                <option value={"제주특별자치도"}>제주특별자치도</option>
                <option value={"충청남도"}>충청남도</option>
                <option value={"충청북도"}>충청북도</option>
              </Select>
            </FormControl>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button
              onClick={handleSearchClick}
              style={{ marginLeft: "90%" }}
              color="primary"
            >
              검색
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
      <br />
      <br />
      <br></br>
      <br></br>
      {/* 240 * 400 사이즈로 제작 */}
      <div id="studylistcardbox">
        <div id="studylistcardback" style={{ marginLeft: "10%" }}>
          {listdata.map((ele, idx) => (
            <Card className={classes.card} id="studylistcard">
              <CardHeader
                id="studylistcardhd"
                // avatar={
                //   loading ? (
                //     <Skeleton
                //       animation="wave"
                //       variant="circle"
                //       width={40}
                //       height={40}
                //     />
                //   ) : (
                //     <Avatar
                //       alt=""
                //       src={
                //         "http://localhost:8000/project/uploadfile/" +
                //         profilelist[idx]
                //       }
                //       className={avatarclasses.large}
                //     />
                //   )
                // }
                title={
                  <Typography align="center" id="studylistcardtit">
                    {countlist[idx] !== ele.study_peoples
                      ? `모집중(${countlist[idx]}/${ele.study_peoples})`
                      : "모집완료"}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    id="studylistcardsub"
                  >
                    {(
                      ele.study_address[7] +
                      ele.study_address[8] +
                      ele.study_address[9] +
                      ele.study_address[10] +
                      ele.study_address[11]
                    ).split(" ")[0] +
                      " | " +
                      ele.study_type}
                  </Typography>
                }
              />
              {/* 카드 몸통 */}
              <div id="studylistcardmain">
                <div id="studylistcardtextbox">
                  <Typography variant="body2" id="studylistcardtext">
                    {ele.study_subject}
                  </Typography>
                </div>

                <Link
                  id="studylistcardAvatarbox"
                  to={
                    "/studydetail?study_num=" +
                    ele.study_num +
                    "&count_peoples=" +
                    countlist[idx] +
                    "&study_peoples=" +
                    ele.study_peoples
                  }
                >
                  <div id="studylistcardeye">
                    <VisibilityOutlinedIcon />
                    <div style={{ marginLeft: "3px", marginBottom: "2px" }}>
                      {ele.study_readcount}
                    </div>
                  </div>

                  <Avatar
                    id="studylistcardAvatar"
                    alt=""
                    src={
                      "http://localhost:8000/project/uploadfile/" +
                      profilelist[idx]
                    }
                    className={avatarclasses.large}
                  />
                </Link>

                <div id="studylistimgback"></div>

                <CardMedia
                  id="studylistimg"
                  className={classes.media}
                  image={
                    "http://localhost:8000/project/uploadfile/" +
                    ele.study_mainimage
                  }
                />
              </div>

              {/* 카드 footer */}
              <CardContent id="studylistfooter">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  align="center"
                >
                  {ele.study_startdate.split("-")[1] +
                    "월 " +
                    ele.study_startdate.split("-")[2] +
                    "일" +
                    " ~ " +
                    ele.study_enddate.split("-")[1] +
                    "월 " +
                    ele.study_enddate.split("-")[2] +
                    "일"}
                  <br />
                  {"  매주 " + ele.study_gatherday}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
