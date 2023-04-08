import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Table,
  Tag,
  Space,
} from "antd";
import { Radio, Cascader, DatePicker, TreeSelect, Switch, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { SpinnerCircular } from "spinners-react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
  get,
  child,
} from "firebase/database";

let index = 0;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Column, ColumnGroup } = Table;

const { TextArea } = Input;

// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }
const columns = [
  {
    title: "Block Number",
    dataIndex: "blockNumber",
    sorter: {
      compare: (a, b) => a.blockNumber - b.blockNumber,
      multiple: 3,
    },
  },
  {
    title: "Value",
    dataIndex: "value",
    sorter: {
      compare: (a, b) => a.value - b.value,
      multiple: 2,
    },
  },
  {
    title: "Event",
    dataIndex: "event",
  },
  {
    title: "To",
    dataIndex: "to",
  },
  {
    title: "Gas",
    dataIndex: "gas",
    sorter: {
      compare: (a, b) => a.gas - b.gas,
      multiple: 1,
    },
  },
  {
    title: "Sender",
    dataIndex: "sender",
  },
  {
    title: "Time",
    dataIndex: "time",
    sorter: {
      compare: (a, b) => a.time - b.time,
      multiple: 4,
    },
  },
];

export default function ShowFunds({ actv, setactv }) {
  const [loadingState, setLoadingState] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);

  const [error, setError] = useState("");
  const { logIn, w3state } = useUserAuth();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [tm, settm] = useState("");
  const [year, setyear] = useState(new Date().getFullYear());
  // const [lname, setlName] = useState("");
  // const inputRef = useRef(null);
  // const addItem = (e) => {
  //   e.preventDefault();
  //   setItems([...items, lname || `Organisation ${index++}`]);
  //   setlName("");
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };
  const handleChange = (value) => {
    setyear(value.slice(6, 10));
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  async function getTransactions(BlockNumber) {
    var Block = await window.web3.eth.getBlock(BlockNumber);
    var txlsts = Block.transactions.map(async (transaction) => {
      let t = await window.web3.eth.getTransaction(transaction);
      return t;
    });
    var txns = await Promise.all(txlsts);
    return txns;
  }
  useEffect(() => {
    // [25, 24, 23, 22, 21].forEach((e) => {
    //   getTransactions(e);
    // });
    onValue(ref(db, "parsec" + year + "funds"), (snapshot) => {
      const dt = snapshot.val();
      if (dt) {
        var klist = Object.keys(dt);
        console.log(data, klist, w3state.accounts);
        var k = klist.length;
        if (k > 0 && w3state.accounts && data.length < k) {
          var vlist = Object.values(dt);
          var mapper = {};
          console.log(vlist);
          var tlst = vlist
            .filter((e) => w3state.accounts === e.wallet)
            .map((e) => {
              mapper[e.blockNumber] = e.event;
              return [e.blockNumber, e.event];
            });
          console.log("->", mapper);
          var txns = tlst.map((e) => getTransactions(e[0]));
          Promise.all(txns).then((e) => {
            console.log(e);
            var d = e.map((e) => {
              return {
                key: e[0].blockNumber,
                blockNumber: e[0].blockNumber,
                event: mapper[e[0].blockNumber],
                value: e[0].value,
                to: e[0].to,
                gas: e[0].gas,
                sender: e[0].from,
              };
            });
            console.log("**", d);
            setdata(d);
          });
        }
      } else {
      }
    });
  }, []);

  return (
    <>
      {loadingState && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <SpinnerCircular
            size={38}
            thickness={180}
            speed={97}
            color="rgba(57, 80, 172, 0.52)"
            secondaryColor="rgba(57, 164, 172, 1)"
          />
        </div>
      )}
      {!loadingState && (
        <>
          <Select
            defaultValue="parsec2023"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "parsec2023", label: "Parsec 2023" },
              { value: "parsec2022", label: "Parsec 2022" },
              { value: "parsec2021", label: "Parsec 2021" },
              { value: "parsec2020", label: "Parsec 2020" },
            ]}
          />
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
      )}
    </>
  );
}
