import { AttributesForm } from '@/components/AttributesForm';
import { Card, Form, Input, Row, Col, Button, Divider, Image, Select, Space, Table } from 'antd';
import { useState, useEffect, useCallback } from 'react'
import generateAttributesABI from "@/abis/attributesFunctionsConsumer.json";
import generateImagesABI from "@/abis/imagesFunctionsConsumer.json";
import {
  useAccount,
  useConnect,
  useContractEvent,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi'
import { watchContractEvent, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { fromHex } from 'viem';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getPromptElement } from '@/core/generate-item-attributes';
import { attributeContract, getGenerateAttConfig } from '@/core/call-contract';
const { Option } = Select;

const attContractAddress = process.env.NEXT_PUBLIC_ATTRIBUTES_CONTRACT;
const imageContractAddress = process.env.NEXT_PUBLIC_IMAGE_CONTRACT;

export default function Home() {

  const [client, setClient] = useState(false);
  const { chain } = useNetwork();
  const { address, connector, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const [response, setResponse] = useState([]);
  const [responseAtt, setResponseAtt] = useState([]);
  const [isGeneratingImage, setIsGenratingImage] = useState(false);
  const [isGeneratingAttribute, setIsGenratingAttribute] = useState(false);

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

  const onFinishImage = (values: any) => {
    // const { prompt, size } = values;
    // getImage(prompt, size);

  }

  const onFinishAttributeForm = useCallback(async (values: any) => {
    try {
      var message = `Let's create an output of JSON (no any explanations) that name-value pairs as follows: \n`;
      values.attributes.forEach(element => message = message.concat(getPromptElement({ element }.element.attribute_type, { element }.element.name, { element }.element.minValue, { element }.element.maxValue)));

      console.log(message);
      setIsGenratingAttribute(true);

      const config = getGenerateAttConfig(message, chain?.id);
      const { request } = await prepareWriteContract(config)
      const { hash } = await writeContract(request)

      await waitForTransaction({
        hash: hash,
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    setClient(true);
    attributeContract.on("Attributes", async (requestId, latestResponse, latestError) => {
      const responseJson = JSON.parse(fromHex(latestResponse, "string"));
      const response = JSON.parse(responseJson.response);
      const convertedArr = Object.keys(response).map(k => (
        {
          title: k,
          value: response[k]
        }
      ))
      setResponseAtt(convertedArr);
      setIsGenratingAttribute(false);
    })
  }, [chain?.id])

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
            </Card>
            <Divider />
            <Card title={"Attribute settings"}>
              <Form
                name="dynamic_form_nest_item"
                onFinish={(values) => onFinishAttributeForm(values)}
                style={{ maxWidth: 600 }}
                autoComplete="off"
              >
                <Form.List name="attributes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            initialValue={"integer"}
                            name={[name, 'attribute_type']}
                            rules={[{ required: true, message: 'Missing attribute type' }]}
                          >
                            <Select options={[
                              { label: "Range", value: "range" },
                              { label: "Integer", value: "integer" },
                              { label: "Decimal", value: "float" },
                              { label: "Percent", value: "percent" }
                            ]} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'minValue']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                          >
                            <Input placeholder="Min" />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'maxValue']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                          >
                            <Input placeholder="Max" />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add attribute
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button loading={isGeneratingAttribute} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>

              </Form>
            </Card>
          </Col>

          <Col span={10}>
            <Card title="Generated item">

              {
                response.map(r => <Image src={r} />)
              }
              <Divider />
              <Table
                pagination={false}
                dataSource={responseAtt} columns={[
                  {
                    title: "Name",
                    key: "title",
                    dataIndex: "title",
                  },
                  {
                    title: "Value",
                    key: "value",
                    dataIndex: "value",
                  }
                ]} />

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
