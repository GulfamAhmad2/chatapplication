import React from "react";
import img from "../../assets/profile.jpg";
import Button from "../../components/Button";
import { ChatList } from "./Friends";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listSentReq } from "../../api-service/friend";

const Pending = () => {

  // const sentReqMutation = useMutation({
  //   mutationFn:listSentReq,
  //   onSuccess:(res)=>{
  //     console.log(res)
  //   },
  //   onError:(err)=>{
  //     console.log(err)
  //   }
  // })
  
  let req = true;
  return (
    <ChatList
      buttons={
        <div className="flex gap-2">
          
          <Button
            className={`px-3 py-1 text-white 
            bg-[#34D399] hover:bg-[#34D399]/80  text-[13px] `}
          >
          Confirm
          </Button>
          <Button
            className={`px-3 py-1 text-white 
            bg-[#F87171] hover:bg-[#F87171]/80  text-[13px] `}
          >
          Delete
          </Button>
        </div>
      }
    />
  );
};

export default Pending;
