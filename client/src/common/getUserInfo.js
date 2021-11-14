import axios from "axios";

const authCheck = async (setUser, setAuthMsg) => {
  let result = await axios("/api/user/authcheck");
  if (result.data.status === 200) {
    setUser(result.data.data);
  } else {
    setAuthMsg(true);
  }
};

export default authCheck;
