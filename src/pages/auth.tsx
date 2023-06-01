import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';

export interface SubmitProps {
  name: string,
  number: number
}

export default function Auth() {

  const [ loading, setLoading ] = useState(false)

  const submit = (values: SubmitProps) => {
    setLoading(true)
    localStorage.setItem('token', JSON.stringify(values))
    setTimeout(() => {
      setLoading(false)
      window.location.reload();
    }, 100);
  }
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100/40'>
      <div className='w-3/12 min-h-[300px] rounded-md shadow-lg bg-white flex flex-col items-center border border-gray-200'>
        <div className='w-full h-5 bg-primary'></div>
        <div className='w-full p-5'>
          <div className='flex flex-col items-center justify-center gap-5 my-8'>
            <h1 className='font-semibold text-2xl text-primary'>Welcome to BookMyDoc</h1>
            <p className='text-gray-400 italic text-sm'>Kindly fill below information to continue</p>
          </div>
          <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}

            autoComplete="off"
            layout='vertical'
            onFinish={submit}
          >
            <Form.Item
              className='text-primary'

              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="number"
              rules={[{ required: true, message: 'Please input your mobile number!' }]}
            >
              <Input type='number' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className='bg-primary text-white' htmlType="submit">
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='w-full h-2 bg-primary'></div>
      </div>
    </div>
  )
}
