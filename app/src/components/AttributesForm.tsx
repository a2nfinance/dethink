import { Button, Form, Input, Select, Space, Col, Card } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useState, useEffect } from 'react'

export const AttributesForm = () => {
    
    const [isGeneratingAttribute, setIsGenratingAttribute] = useState(false);
    const [responseAtt, setResponseAtt] = useState([]);
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
    
    const onFinish = (values: any) => {
        var message = new String(`Let's create an output of JSON (no any explanations) that name-value pairs as follows: \n`);
        // console.log(values.attributes);
        // values.attributes.forEach(element => message = message.concat(getPromptElement({element}.element.attribute_type, {element}.element.name, {element}.element.minValue, {element}.element.maxValue)));
        // getAttribute(message);
        console.log(message);
    };
        
    /*    
    const formatedPrompt = () => {
        // console.log(getAttributes (message));
    };
        // Call API with the formated prompt
        // Core function here
    */
    return (
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
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
            
            <Card title="Generated Attributes">
                {
                responseAtt.map(i => (<p>{i}</p>))
                }
            </Card>
            
        </Form>
        
    )
}