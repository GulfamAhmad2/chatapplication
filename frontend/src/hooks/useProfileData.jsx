import { useEffect, useState } from "react";

export function useProfileData() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("users"));
    if (res) setUsers(res);
  }, []);

  return [users, setUsers];
}
