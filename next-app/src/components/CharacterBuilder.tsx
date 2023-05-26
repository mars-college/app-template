import React, { useState, useEffect } from "react";

import { Form, Input, Button, Select, Upload, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const characters = [
  {'name': 'A', 'bio': 'A bio', 'description': 'A is a character', 'picture': ''},
  {'name': 'B', 'bio': 'B bio', 'description': 'B is a character', 'picture': ''},
  {'name': 'C', 'bio': 'C bio', 'description': 'C is a character', 'picture': ''},
  {'name': 'D', 'bio': 'D bio', 'description': 'D is a character', 'picture': 'https://minio.aws.abraham.fun/creations-stg/817dae1789a34ae4eda321eb2285daff4daf4d0d644706c6b7d8ff62e2fc705e.jpg'},
]


// get characters from /api/characters
// edit each character
// insert image

const CharacterBuilder = () => {
  const [form] = Form.useForm();
  const [character, setCharacter] = useState(characters[0]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (character) {
      form.setFieldsValue(character);

      // Update fileList when character changes
      setFileList(character.picture ? [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: character.picture,
      }] : []);
    }
  }, [character, form]);

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  const handleChange = (value: string) => {
    const character = characters.find(character => character.name === value);
    if (character) {
      setCharacter(character);
    }
  };

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      
      form.setFieldsValue({ picture: info.file.response.fileUrl });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  // const handleUpload = (info: any) => {
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
      
  //     // Update the fileList here as well
  //     setFileList([{
  //       uid: '-1',
  //       name: 'image.png',
  //       status: 'done',
  //       url: info.file.response.fileUrl,
  //     }]);
      
  //     form.setFieldsValue({ picture: info.file.response.fileUrl });
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  
  return (
    <div>
      <Select defaultValue={character.name} onChange={handleChange}>
        {characters.map((character, index) => (
          <Select.Option key={index} value={character.name}>
            {character.name}
          </Select.Option>
        ))}
      </Select>
      
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="bio">
          <Input placeholder="Bio" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="picture">
          <Upload
            key={fileList[0]?.url}
            name='file'
            action='/api/media'
            listType='picture-card'
            onChange={handleUpload}
            fileList={fileList}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CharacterBuilder;
