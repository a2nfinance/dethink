import { AttributesForm } from '@/components/AttributesForm';
import { Card, Form, Input, Row, Col, Button, Divider, Image, Select } from 'antd';
import { useState, useEffect } from 'react'
import React from 'react';
import generateAttributesABI from "@/abis/attributesFunctionsConsumer.json";
import generateImagesABI from "@/abis/imagesFunctionsConsumer.json";
import {
  useAccount,
  useConnect,
  useContractEvent,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

const { Option } = Select;


export default function Home() {
  const [client, setClient] = useState(false);
  const { address, connector, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const [response, setResponse] = useState([]);
  // const [responseAtt, setResponseAtt] = useState([]);
  const [isGeneratingImage, setIsGenratingImage] = useState(false);
  // const [isGeneratingAttribute, setIsGenratingAttribute] = useState(false);


  useContractEvent({
    //@ts-ignore
    address: process.env.NEXT_PUBLIC_ATTRIBUTES_CONTRACT,
    abi: generateAttributesABI,
    eventName: 'Attributes',
    listener(log) {
      // @ts-ignore
      console.log(log[0].args.response);
       // @ts-ignore
      const response = String.fromCharCode(log[0].args.response);
      console.log("STRING RESPONSE:", response);
    },
  })

  // Get images from API using the POST method
  async function getImage(prompt: string, size: string) {
    try {
      setIsGenratingImage(true);
      let getReq = await fetch("/api/get-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          size: size,
        })
      })
      let res = await getReq.json();
      setResponse(res.data);
      setIsGenratingImage(false);
    } catch (e) {
      console.log("Error occured:", e);
    }

  }

  /*
  async function getAttribute(message: String) {
    try {
      setIsGenratingAttribute(true);
      let getReq = await fetch("/api/get-attributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        })
      })
      let res = await getReq.json();
      setResponseAtt(res.data);
      setIsGenratingAttribute(false);
    } catch (e) {
      console.log("Error occured:", e);
    }

  }
  */
  const onFinishImage = (values: any) => {
    const { prompt, size } = values;
    getImage(prompt, size);
  }
  /*
  const onFinishAttribute = (values: any) => {
    const { message } = values;
    getAttribute(message);
  }
  */
  useEffect(() => {
    setClient(true);
    console.log("First Load")
  }, [])



  if (isConnected && client) {
    return (
      <div style={{ width: 1024, marginLeft: "auto", marginRight: "auto" }}>
        <Row gutter={8}>
          <Col span={14}>
            <Card title={"Image settings"}>
              <Form onFinish={onFinishImage} layout='vertical'>
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item name={"prompt"} label="Prompt" rules={[{ required: true, message: 'Missing first input' }]}>
                      <Input size='large'
                        type='text'
                      />
                    </Form.Item>

                  </Col>
                  <Col span={12}>
                    <Form.Item name={"size"} label="Resolution" >
                      <Select size='large'
                      >
                        <Option size="1024x1024">1024x1024</Option>
                        <Option size="1792x1024">1792x1024</Option>
                        <Option size="1024x1792">1024x1792</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                </Row>
                <Button
                  loading={isGeneratingImage}
                  size='large'
                  type='primary'
                  htmlType='submit'
                >Send Prompt</Button>
              </Form>
              <br />
              {/* <Form onFinish={onFinishAttribute} layout='vertical'>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name={"dps"} label="Attribute 1" rules={[{ required: true, message: 'Missing first input' }]}>
                    <Input size='large'
                      type='text'
                    />
                  </Form.Item>

                </Col>
                <Col span={12}>
                  <Form.Item name={"dph"} label="Attribute 2" rules={[{ required: true, message: 'Missing first input' }]}>
                    <Input size='large' type='text'
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name={"aps"} label="Attribute 3" rules={[{ required: true, message: 'Missing first input' }]}>
                    <Input size='large' type='text'
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name={"dhe"} label="Attribute 4" rules={[{ required: true, message: 'Missing first input' }]}>
                    <Input size='large' type='text'
                    />
                  </Form.Item>
                </Col>

              </Row>
              <Button
                loading={isGeneratingAttribute}
                size='large'
                type='primary'
                htmlType='submit'
              >Generate Attributes</Button>
            </Form> */}


            </Card>
            <Divider />
            <Card title={"Attribute settings"}>
              <AttributesForm />
            </Card>
          </Col>

          <Col span={10}>
            <Card title="Generated item">

              {
                response.map(r => <Image src={r} />)
              }
              <Divider />
              {
                // responseAtt.map(i => (<p>{i}</p>))
              }

              <Row gutter={8}>
                <Col span={8}>
                  <Button type='primary' style={{ width: "100%" }}>Save</Button>
                </Col>
                <Col span={8}>
                  <Button style={{ width: "100%" }}>Mint NFT</Button>
                </Col>
                <Col span={8}>
                  <Button style={{ width: "100%" }}>Clear</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>


        <div>{address}</div>
      </div>
    )
  }

  return (
    client && <div>
      {connectors.map((connector) => (
        <Button
          size="large"
          type="primary"
          disabled={!connector.ready}
          key={connector.id}
          loading={isLoading &&
            connector.id === pendingConnector?.id}
          onClick={() => connect({ connector })}
        >
          {!connector?.ready ? `${connector?.name} (unsupported)` : connector?.name}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
