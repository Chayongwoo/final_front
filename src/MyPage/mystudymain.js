import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Axios from "axios";
import MyPageMenu from "./mypagemenu";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1200px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  table: {
    minWidth: 650,
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 40 + rand();
  const left = 40 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1200,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MyStudyMain(props) {
  const classes = useStyles();

  const [joinedlist, setJoinedList] = React.useState([]);
  const [myapplylist, setMyApplyList] = React.useState([]);
  const [founderlist, setFounderList] = React.useState([]);
  const [applylist, setApplyList] = React.useState([]);
  const modalClasses = modalStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const modal = (
    <div style={modalStyle} className={modalClasses.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                번호
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                이름
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                핸드폰
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                수준
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                코멘트
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applylist.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell align="left" scope="row">
                  &nbsp;{idx + 1}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.member_name}
                </TableCell>
                <TableCell align="center">{row.member_phone}</TableCell>
                <TableCell align="center">{row.studyapply_mylevel}</TableCell>
                <TableCell align="center">{row.studyapply_comment}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() =>
                      applyAccept(
                        row.studyapply_member_num,
                        row.studyapply_study_num
                      )
                    }
                  >
                    승인
                  </Button>
                  /
                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    onClick={() =>
                      applyReject(
                        row.studyapply_member_num,
                        row.studyapply_study_num
                      )
                    }
                  >
                    거절
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getJoinedList = (event) => {
    const url = `http://localhost:8000/project/studygroup/joinedlist?studygroup_member_num=${localStorage.num}`;

    Axios.get(url)
      .then((res) => {
        setJoinedList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMyApplyList = (event) => {
    const url = `http://localhost:8000/project/studyapply/myapply?studyapply_member_num=${localStorage.num}`;

    Axios.get(url)
      .then((res) => {
        setMyApplyList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudyFounder = (event) => {
    const url = `http://localhost:8000/project/study/founder?study_member_num=${localStorage.num}`;

    Axios.get(url)
      .then((res) => {
        setFounderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getApplyMember = (num) => {
    const url = `http://localhost:8000/project/studyapply/member?studyapply_study_num=${num}`;

    Axios.get(url)
      .then((res) => {
        setApplyList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const applyAccept = (member_num, study_num) => {
    const url = "http://localhost:8000/project/studygroup/add";

    Axios.post(url, {
      studygroup_member_num: member_num,
      studygroup_study_num: study_num,
    })
      .then((res) => {
        getApplyMember(study_num);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const applyReject = (member_num, study_num) => {
    const url = "http://localhost:8000/project/studyapply/delete";

    Axios.post(url, {
      studyapply_member_num: member_num,
      studyapply_study_num: study_num,
    })
      .then((res) => {
        getApplyMember(study_num);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const secession = (study_num, studygroup_member_num) => {
    const url = `http://localhost:8000/project/studygroup/delete?study_num=${study_num}&studygroup_member_num=${studygroup_member_num}`;

    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      text: "탈퇴 하시려면 secession 버튼을 눌러주세요",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "secession",
    }).then((result) => {
      if (result.value) {
        Axios.delete(url)
          .then((res) => {
            getJoinedList();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("탈퇴 성공!", "정상적으로 탈퇴되었습니다", "success");
      }
    });
  };
  const applycancle = (study_num, studyapply_member_num) => {
    const url = `http://localhost:8000/project/studyapply/myapplydelete?study_num=${study_num}&studyapply_member_num=${studyapply_member_num}`;

    Swal.fire({
      title: "정말 취소하시겠습니까?",
      text: "취소 하시려면 Cancel application 버튼을 눌러주세요",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel application",
    }).then((result) => {
      if (result.value) {
        Axios.delete(url)
          .then((res) => {
            getMyApplyList();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("취소 성공!", "정상적으로 신청이 취소되었습니다", "success");
      }
    });
  };

  useEffect(() => {
    getJoinedList();
    getMyApplyList();
    getStudyFounder();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <MyPageMenu />
      <br />
      <div style={{ marginLeft: "350px" }}>
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: "#E1E1E1" }}
          >
            <Typography className={classes.heading}>개설한 스터디</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      번호
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      스터디명
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "bold" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {founderlist.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left" scope="row">
                        &nbsp;{idx + 1}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.study_subject}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => {
                            handleOpen();
                            getApplyMember(row.study_num);
                          }}
                        >
                          모집 현황
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {modal}
        </Modal>
        <br />
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: "#E1E1E1" }}
          >
            <Typography className={classes.heading}>소속된 스터디</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      번호
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      스터디명
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      개설자
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {joinedlist.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left" scope="row">
                        &nbsp;{idx + 1}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.study_subject}
                      </TableCell>
                      <TableCell align="right">{row.study_writer}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            secession(row.study_num, localStorage.num);
                          }}
                        >
                          탈퇴
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: "#E1E1E1" }}
          >
            <Typography className={classes.heading}>신청한 스터디</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      번호
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      스터디명
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      개설자
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myapplylist.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left" scope="row">
                        &nbsp;{idx + 1}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.study_subject}
                      </TableCell>
                      <TableCell align="right">{row.study_writer}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            applycancle(row.study_num, localStorage.num);
                          }}
                        >
                          취소
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
      </div>
      <Link to="/">
        <button>홈으로</button>
      </Link>
    </div>
  );
}
