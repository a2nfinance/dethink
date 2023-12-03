import { Button, Form, Input, Select, Space } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
export const AttributesForm = () => {
    const onFinish = (values: any) => {

        console.log(values.attributes);
        // Forach | Map | For
        const formatedPrompt = () => {};
        // Call API with the formated prompt
        // Core function here

    }
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
                                        { label: "Decimal", value: "float" }
                                    ]} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                >
                                    <Input placeholder="value" />
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}