import { getDeptList, postDept } from "@/service";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
  Button,
  Modal,
  Select,
} from "antd";
import { SearchOutlined, SyncOutlined, PlusOutlined } from "@ant-design/icons";
// const originData = [];
// getDeptList().then((res) => {
//   const data = res.data.data.result;
//   for (let i = 0; i < data.length; i++) {
//     originData.push({
//       key: i.toString(),
//       id: data[i].id,
//       deptCode: data[i].deptCode,
//       deptName: data[i].deptName,
//       position: data[i].position,
//       orderNum: data[i].orderNum,
//       deptType: data[i].deptType,
//       introduction: data[i].introduction,
//     });
//   }
// });
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const App = () => {
  useEffect(() => {
    getDeptList()
      .then((res) => {
        // console.log(res);
        setData(res.data.data.result);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  });
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      deptCode: "",
      deptName: "",
      position: "",
      orderNum: "",
      deptType: "",
      introduction: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
      editable: true,
    },
    {
      title: "科室代码",
      dataIndex: "deptCode",
      width: "15%",
      editable: true,
    },
    {
      title: "科室名称",
      dataIndex: "deptName",
      width: "15%",
      editable: true,
    },
    {
      title: "科室位置",
      dataIndex: "position",
      width: "15%",
      editable: true,
    },
    {
      title: "排序ID",
      dataIndex: "orderNum",
      width: "15%",
      editable: true,
    },
    {
      title: "科室类型",
      dataIndex: "deptType",
      width: "10%",
      editable: true,
    },
    {
      title: "科室介绍",
      dataIndex: "introduction",
      width: "10%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              取消
            </Typography.Link>
            <span onClick={() => console.log(record)}>确定</span>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            编辑
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.imgUrl = "";
    postDept(fieldsValue);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 下拉列表
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div className="flex">
        <Form.Item label="科室代码">
          <Input />
        </Form.Item>
        <Form.Item label="科室名称">
          <Input />
        </Form.Item>
        <div className="ml-[20px]">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="bg-[#4189d1]"
          >
            搜索
          </Button>
          <Button icon={<SyncOutlined />} className="ml-[20px]">
            重置
          </Button>
        </div>
      </div>
      <Button
        type="primary"
        ghost
        icon={<PlusOutlined />}
        onClick={showModal}
        className="mb-[15px]"
      >
        新增
      </Button>
      <Modal
        destroyOnClose={true}
        title="添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
          >
            确定
          </Button>,
        ]}
      >
        <Form form={form} preserve={false}>
          <Form.Item
            label="科室代码"
            name="deptCode"
            rules={[
              {
                required: true,
                message: "请输入科室代码",
              },
            ]}
          >
            <Input placeholder="请输入科室代码" />
          </Form.Item>
          <Form.Item label="科室名称" name="deptName">
            <Input placeholder="请输入科室名称" />
          </Form.Item>
          <Form.Item label="科室位置" name="position">
            <Input placeholder="请输入科室位置" />
          </Form.Item>
          <Form.Item label="排序ID" name="orderNum" initialValue={0}>
            <InputNumber
              addonBefore="+"
              addonAfter="-"
              controls={false}
              keyboard={true}
            />
          </Form.Item>
          <Form.Item label="科室类型" name="deptType" initialValue={"请选择"}>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "0",
                  label: "0",
                },
                {
                  value: "1",
                  label: "1",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="科室介绍" name="introduction">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};
export default App;
