import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { readDirectory , createOrReplaceFile, readFileContent,deleteFileOrFolder} from '../utils/fs-utils';

import {retrieveSecret, storeSecret} from '../utils/fs-secrets';

import {
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from 'antd';

const {
  Header,
  Content,
} = Layout;
const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {

  useEffect(() => {

    console.log("Page Loaded");

    // Load the directory structure
    const directoryPath = '/Users/rahulvramesh/Bud/Bud-Studiod/test';
    const directoryStructure = readDirectory(directoryPath);
    console.log(JSON.stringify(directoryStructure, null, 2));

    // Create a file
    const filePath = '/Users/rahulvramesh/Bud/Bud-Studio/test-3/file.json';
    const content = {ping: "pong"};
    createOrReplaceFile(filePath, JSON.stringify(content));

    // Read the file
    const contentRead = readFileContent(filePath);
    console.log(contentRead);

    // delete file
    const deletrResponse = deleteFileOrFolder(filePath);

    // store secret
    storeSecret('google-credentials', { username: 'my-username', password: 'my-password' });
    console.log("Secret stored",retrieveSecret('google-credentials'));


  },[]);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

      <Header>
        <Link href="/next">
          <a>Go to next page</a>
        </Link>
      </Header>

      <Content style={{ padding: 48 }}>
        <Form layout='horizontal'>
          <FormItem
            label='Input Number'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber size='large' min={1} max={10} style={{ width: 100 }} defaultValue={3} name='inputNumber' />
            <a href='#'>Link</a>
          </FormItem>

          <FormItem
            label='Switch'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Switch defaultChecked />
          </FormItem>

          <FormItem
            label='Slider'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Slider defaultValue={70} />
          </FormItem>

          <FormItem
            label='Select'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Select size='large' defaultValue='lucy' style={{ width: 192 }}>
              <Option value='jack'>jack</Option>
              <Option value='lucy'>lucy</Option>
              <Option value='disabled' disabled>disabled</Option>
              <Option value='yiminghe'>yiminghe</Option>
            </Select>
          </FormItem>

          <FormItem
            label='DatePicker'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <DatePicker name='startDate' />
          </FormItem>
          <FormItem
            style={{ marginTop: 48 }}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Button size='large' type='primary' htmlType='submit'>
              OK
            </Button>
            <Button size='large' style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </FormItem>
        </Form>
      </Content>
    </React.Fragment>
  );
};

export default Home;

