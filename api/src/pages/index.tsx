import { Card, Form, Input, Row, Col, Button, Divider, Image } from 'antd';
// import { Inter } from 'next/font/google'
import { useCallback, useState } from 'react'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("");
  const [dps, setDps] = useState("");
  const [dph, setDph] = useState("");
  const [aps, setAps] = useState("");
  const [dhe, setDhe] = useState("");
  const [response, setResponse] = useState([]);
  const [isGeneratingImage, setIsGenratingImage] = useState(false);

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

  async function getAttribute(dps: string, dph: string, aps: string, dhe: string) {
    let getReq = await fetch("/api/get-attributes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dps: dps,
        dph: dph,
        aps: aps,
        dhe: dhe,
      })
    })
    let res = await getReq.json();
    setResponse(res.data);
  }

  const handleSubmitPrompt = useCallback(async () => {
    await getImage(prompt, size);
  }, [prompt, size])

  const handleSubmitAttribute = useCallback(async () => {
    await getAttribute(dps, dph, aps, dhe);
  }, [dps, dph, aps, dhe])

  const onFinish = (values: any) => {
    const { prompt, size } = values;
    getImage(prompt, size);
  }

  return (
    <div style={{ width: 1024, marginLeft: "auto", marginRight: "auto" }}>
      <Row gutter={8}>
        <Col span={14}>
          <Card title={"Item settings"}>
            <Form onFinish={onFinish} layout='vertical'>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name={"prompt"} label="Prompt" rules={[{ required: true, message: 'Missing first input' }]}>
                    <Input size='large'
                      type='text'
                    // value={prompt}
                    // onChange={(e) => setPrompt(e.target.value)}
                    />
                  </Form.Item>

                </Col>
                <Col span={12}>
                  <Form.Item name={"size"} label="Second input">
                    <Input size='large' type='text'
                    // value={size}
                    //  onChange={(e) => setSize(e.target.value)} 
                    />
                  </Form.Item>
                </Col>

              </Row>
              <Button
                loading={isGeneratingImage}
                size='large'
                type='primary'
                htmlType='submit'
              // onClick={() => handleSubmitPrompt()}
              >Send Prompt</Button>
            </Form>





            <Input type='text' value={dps} onChange={(e) => setDps(e.target.value)} />

            <Input type='text' value={dph} onChange={(e) => setDph(e.target.value)} />

            <Input type='text' value={aps} onChange={(e) => setAps(e.target.value)} />

            <Input type='text' value={dhe} onChange={(e) => setDhe(e.target.value)} />

            <Button type='primary' size='large' onClick={() => handleSubmitAttribute()}>Generate Attribute</Button>
           
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Generated item">

            {
              response.map(r => <Image src={r} />)
            }
            <Divider />
            {
              response.map(i => (<p>{i}</p>))
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



    </div>
  )
}
