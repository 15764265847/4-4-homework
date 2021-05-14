// import Layout from '../components/layout/layout';
import { Box, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Button, useDisclosure,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { BsPlus, BsThreeDotsVertical } from 'react-icons/bs'
import { css } from '@emotion/react';
import { useState } from 'react';

const data = [{
  name: '百度',
  url: 'https://www.baidu.com',
  imgIsShow: true
}, {
  name: '百度',
  url: 'https://www.baidu.com',
  imgIsShow: true
}, {
  name: '百度',
  url: 'https://www.baidu.com',
  imgIsShow: true
}, {
  name: '百度',
  url: 'https://www.baidu.com',
  imgIsShow: true
}, {
  name: '百度',
  url: 'https://www.baidu.com',
  imgIsShow: true
}]

const TagBox = styled.div`
  position: relative;
  display: inline-block;
  width: 112px;
  height: 112px;
  color: #fff;
  background: #393939;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0, .4)
  }
`

const Taglink = styled.a`
  position: relative;
  display: inline-block;
  width: 112px;
  height: 112px;
  padding-top: 16px;
  color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
`

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  margin: auto;
  background: #ccc;
  border-radius: 50%;
`

const PBox = styled.p`
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
`

const IcpnBox = styled(MenuButton)`
  position: absolute;
  width: 16px;
  height: 16px;
  min-width: unset;
  background: transparent;
  top: 10px;
  right: 0;
  padding-inline-start: unset;
  padding-inline-end: unset;
  z-index: 100;
`

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newData, setNewData] = useState({name: '', url: ''})
  const [list, setList] = useState(data)
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isRequired>
              <FormLabel>名称</FormLabel>
              <Input placeholder="名称" value={newData.name} onChange={e => {
                setNewData({
                  ...newData,
                  name: e.target.value
                })
              }} />
            </FormControl>
            <FormControl id="url" isRequired>
              <FormLabel>网址</FormLabel>
              <Input placeholder="网址" value={newData.url} onChange={e => {
                setNewData({
                  ...newData,
                  url: e.target.value
                })
              }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>取消</Button>
            <Button colorScheme="blue" onClick={() => {
              setList([
                ...list,
                {
                  ...newData
                }
              ])
            }}>确认</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        {
          list.map((item, index) => {
            return (
              <TagBox key={index}>
                <Menu closeOnSelect={true}>
                  <IcpnBox as={Button}><BsThreeDotsVertical /></IcpnBox>
                  <MenuList style={{
                    background: '#202020'
                  }}>
                    <MenuItem command="⌘T" onClick={() => {
                      setNewData(item)
                      onOpen()
                    }}>
                      修改快捷方式
                    </MenuItem>
                    <MenuItem command="⌘N" onClick={() => {
                      const listCopy = [...list]
                      listCopy.splice(index, 1)
                      setList(listCopy)
                    }}>
                      移除
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Taglink href={item.url}>
                  <ImgBox>
                    <Image width={'24px'} height={'24px'} src={`${item.url.endsWith('/') ? item.url.slice(0, item.url.length - 1) : item.url}/favicon.ico`} />
                  </ImgBox>
                  <PBox>{item.name}</PBox>
                </Taglink>
              </TagBox>
            )
          })
        }
        <TagBox onClick={onOpen} style={{
          paddingTop: '16px'
        }}>
          <ImgBox>
            <BsPlus color={"#000"} fontSize={'24px'} />
          </ImgBox>
          <PBox>添加快捷方式</PBox>
        </TagBox>
      </Box>
    </>
    // <Layout></Layout>
  )
}
