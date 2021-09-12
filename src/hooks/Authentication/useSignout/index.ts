import { useNavigate } from "react-router";

import { signout as FireSignout } from "../../../utils/Firebase/signout";

export const useSignout = () => {
  const navigate = useNavigate();

  const signout = async() => {
    await FireSignout();
    navigate('/');
  };

  return {
    signout
  };
}